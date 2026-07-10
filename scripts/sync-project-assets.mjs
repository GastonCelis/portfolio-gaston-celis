// Copia las imágenes de /projects/{gec,personales}/<carpeta>/ hacia
// /public/projects/... para que Next.js pueda servirlas. Se ejecuta antes de
// "dev" y "build" (ver hooks predev/prebuild en package.json), así que
// agregar o quitar una carpeta de proyecto se refleja automáticamente sin
// tocar código. /public/projects es un artefacto generado (ignorado en git).
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_ROOT = path.join(ROOT, "projects");
const OUTPUT_ROOT = path.join(ROOT, "public", "projects");
const CATEGORIES = ["gec", "personales"];
const IMAGE_EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif"]);
const DIACRITICS_REGEX = /\p{Diacritic}/gu;

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

fs.rmSync(OUTPUT_ROOT, { recursive: true, force: true });

let copied = 0;

for (const category of CATEGORIES) {
  const categoryDir = path.join(SOURCE_ROOT, category);
  if (!fs.existsSync(categoryDir)) continue;

  const projectFolders = fs
    .readdirSync(categoryDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  for (const projectFolder of projectFolders) {
    const sourceDir = path.join(categoryDir, projectFolder.name);
    const slug = slugify(projectFolder.name);
    const destDir = path.join(OUTPUT_ROOT, category, slug);

    const imageFiles = fs
      .readdirSync(sourceDir)
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()));

    if (imageFiles.length === 0) continue;

    fs.mkdirSync(destDir, { recursive: true });
    for (const file of imageFiles) {
      fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
      copied += 1;
    }
  }
}

console.log(`[sync-project-assets] ${copied} imagen(es) sincronizada(s) en public/projects`);
