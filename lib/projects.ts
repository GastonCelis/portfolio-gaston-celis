// Lee /projects/{gec,personales}/<carpeta-de-proyecto>/ en tiempo de build y arma
// los grupos de proyectos automáticamente: agregar o quitar una carpeta ahí
// agrega o quita el proyecto del sitio, sin tocar código. Las imágenes se
// sincronizan a /public/projects vía scripts/sync-project-assets.mjs (hook
// predev/prebuild en package.json).
import fs from "node:fs";
import path from "node:path";
import { snoopProjects, type Project, type ProjectGroup } from "@/lib/data";

const PROJECTS_ROOT = path.join(process.cwd(), "projects");
const IMAGE_EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif"]);
const DIACRITICS_REGEX = /\p{Diacritic}/gu;

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripAccents(input: string): string {
  return input.normalize("NFD").replace(DIACRITICS_REGEX, "");
}

function titleCase(input: string): string {
  return input.replace(/\b\w/g, (c) => c.toUpperCase());
}

type ParsedField = "url" | "repoUrl" | "name" | "role" | "description" | "stack" | "skip";

const KEY_MAP: Record<string, ParsedField> = {
  url: "url",
  "url web": "url",
  cliente: "name",
  nombre: "name",
  "repositorio github": "repoUrl",
  informacion: "description",
  descripcion: "description",
  "tecnologias usadas": "stack",
  tecnologias: "stack",
  rol: "role",
  flujo: "skip",
};

type ParsedProjectFile = {
  url?: string;
  repoUrl?: string;
  name?: string;
  role?: string;
  description: string[];
  bullets: string[];
  stack: string[];
};

function parseProjectFile(content: string): ParsedProjectFile {
  const fields: ParsedProjectFile = { description: [], bullets: [], stack: [] };
  let current: ParsedField | null = null;

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    const match = line.match(/^([^:]+):\s*(.*)$/);
    const key = match ? stripAccents(match[1]).toLowerCase().trim() : null;

    if (key && key in KEY_MAP) {
      current = KEY_MAP[key];
      const value = match![2].trim();
      if (current === "skip") continue;
      if (current === "url" || current === "repoUrl" || current === "name" || current === "role") {
        fields[current] = value;
      } else if (current === "stack" && value) {
        fields.stack.push(...value.split(",").map((s) => s.trim()).filter(Boolean));
      } else if (current === "description" && value) {
        fields.description.push(value);
      }
      continue;
    }

    if (line.startsWith("-")) {
      fields.bullets.push(line.replace(/^-\s*/, ""));
      continue;
    }

    if (current === "description") {
      fields.description.push(line);
    } else if (current === "stack") {
      // La lista de tecnologías puede venir en la línea siguiente a la clave
      // (ej. "tecnologías usadas:" seguido de "Next.js, Supabase, ..." aparte).
      fields.stack.push(...line.split(",").map((s) => s.trim()).filter(Boolean));
    }
    // Otras secciones sin mapear (ej. diagramas de "flujo") se ignoran a propósito.
  }

  return fields;
}

function loadGroup(category: "gec" | "personales", title: string, note?: string): ProjectGroup {
  const categoryDir = path.join(PROJECTS_ROOT, category);
  if (!fs.existsSync(categoryDir)) return { id: category, title, note, projects: [] };

  const allEntries = fs.readdirSync(categoryDir, { withFileTypes: true });

  // Un .txt suelto directamente en la carpeta de categoría (no dentro de una
  // subcarpeta de proyecto) describe al grupo en sí, no a un proyecto puntual
  // — ej. projects/gec/Datos gec soluciones digitales.txt con la url de GEC.
  const groupInfoFile = allEntries.find(
    (entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".txt")
  );
  const groupUrl = groupInfoFile
    ? parseProjectFile(fs.readFileSync(path.join(categoryDir, groupInfoFile.name), "utf-8")).url
    : undefined;

  const entries = allEntries
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, "es"));

  const projects: Project[] = entries.map((entry, index) => {
    const folder = path.join(categoryDir, entry.name);
    const files = fs.readdirSync(folder);
    const txtFile = files.find((f) => f.toLowerCase().endsWith(".txt"));
    const parsed = txtFile
      ? parseProjectFile(fs.readFileSync(path.join(folder, txtFile), "utf-8"))
      : { description: [], bullets: [], stack: [] };

    const slug = slugify(entry.name);
    const images = files
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/projects/${category}/${slug}/${f}`);

    return {
      number: String(index + 1).padStart(2, "0"),
      name: parsed.name ?? entry.name,
      role: parsed.role ? titleCase(parsed.role) : "Full Stack Developer",
      bullets: [...parsed.description, ...parsed.bullets],
      stack: parsed.stack,
      url: parsed.url,
      repoUrl: parsed.repoUrl,
      images,
    };
  });

  return { id: category, title, note, url: groupUrl, projects };
}

export const projectGroups: ProjectGroup[] = [
  {
    id: "snoop",
    title: "Snoop Consulting",
    note: "Proyectos actuales, desarrollados para clientes de Snoop Consulting. Código y datos confidenciales — no disponibles públicamente.",
    projects: snoopProjects,
  },
  loadGroup("gec", "GEC Soluciones Digitales", "Proyectos propios en producción para clientes de GEC Soluciones Digitales."),
  loadGroup("personales", "Proyectos personales"),
];
