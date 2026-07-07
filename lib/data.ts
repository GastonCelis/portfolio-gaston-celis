// Todo el contenido textual del portfolio vive aquí — los componentes no hardcodean texto.

export const identity = {
  name: "Gastón Celis",
  role: "Full Stack Developer",
  roleStack: "React | Next.js | TypeScript | Node.js | .NET",
  location: "Córdoba, Argentina (remoto)",
  email: "gastoncelis09@gmail.com",
  linkedin: "https://linkedin.com/in/gaston-celis",
  website: "portfolio-gaston-celis.vercel.app",
  github: "https://github.com/GastonCelis",
  cvPath: "/cv/Gaston-Celis-Full-Stack.pdf",
};

export const about = {
  summary:
    "Full Stack Developer con +4 años de experiencia construyendo aplicaciones web escalables de punta a punta: React, Next.js y TypeScript en frontend; .NET (C#) y Node.js en backend. Diseño APIs REST, modelo bases de datos SQL y NoSQL, e implemento autenticación, integraciones y pipelines CI/CD. Trabajé en células ágiles junto a Backend, QA, UX/UI y DevOps, con liderazgo técnico: mentoring, code reviews, estimaciones y análisis funcional directo con clientes y Product Owners.",
};

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "+4", label: "años de experiencia" },
  { value: "+10", label: "proyectos en producción" },
  { value: "2", label: "desarrolladores mentoreados" },
  { value: "7→1", label: "sistemas consolidados en una sola plataforma" },
];

export type ExperienceEntry = {
  period: string;
  company: string;
  role: string;
  description: string;
};

export const experience: ExperienceEntry[] = [
  {
    period: "2026 — HOY",
    company: "GEC Soluciones Digitales",
    role: "Founder & Full Stack Developer",
    description:
      "Soluciones web en producción para clientes comerciales, institucionales y gubernamentales: ecommerce, sitios institucionales y paneles administrativos con autogestión de contenido. Stack: Next.js, TypeScript, Supabase (PostgreSQL, Auth, Storage), Tailwind, Vercel. Ciclo completo: análisis funcional, diseño UX/UI, desarrollo, SEO, deploy y soporte.",
  },
  {
    period: "2022 — 2026",
    company: "Snoop Consulting",
    role: "Software Engineer (Frontend / Full Stack)",
    description:
      "Plataformas complejas para clientes externos y productos internos en tecnología, educación, regulación, logística y eventos masivos. APIs REST en .NET + SQL Server, frontends React/Redux Toolkit, CI/CD con GitHub Actions y Azure DevOps. Liderazgo técnico de módulos internos, code reviews y mentoring a 2 devs junior.",
  },
  {
    period: "2020 — 2022",
    company: "Formación intensiva",
    role: "Coderhouse · UTN",
    description:
      "Desarrollo Web Full Stack en Coderhouse; inicio de Ingeniería en Sistemas (UTN). Primeros proyectos reales en React y Node.",
  },
];

export type Project = {
  number: string;
  name: string;
  role: string;
  bullets: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    number: "01",
    name: "Plataforma de gestión de eventos masivos",
    role: "Frontend Lead",
    bullets: [
      "Sistema integral para una de las mayores productoras de eventos de Argentina: gestión de eventos, personal, proveedores, accesos, sectores, historial operativo, reportes, etiquetas y tickets.",
      "3 paneles según rol (admin / proveedores / operarios) + PWA offline con escaneo de QR para operar sin conectividad.",
      "Hecho desde cero: diseño UX/UI completo en Figma, arquitectura frontend, integración de API, deploy en Azure vía GitHub Actions, documentación y handoff con mentoría.",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "Material UI", "PWA", "Azure", "GitHub Actions"],
  },
  {
    number: "02",
    name: "Consolidación logística: 7 sistemas en 1",
    role: "Frontend Developer",
    bullets: [
      "Plataforma que unificó las operaciones que los empleados de una industria de tecnología y hogar hacían en 7 sistemas distintos: entregas, pesos, stock, movimientos y logística, con manejo de roles.",
    ],
    stack: ["React", "TypeScript", "Redux", "Material UI"],
  },
  {
    number: "03",
    name: "Cotizador para ente regulador nacional",
    role: "Full Stack Developer",
    bullets: [
      "Diseño y construcción de endpoints REST en .NET + Entity Framework + SQL Server, consumidos desde el propio frontend; autenticación con Azure AD y validaciones vía Azure API Gateway; integración con backends externos del cliente.",
      "Mejora significativa en administración de cotizaciones: envío, firmas y creación.",
    ],
    stack: [".NET (C#)", "Entity Framework", "SQL Server", "Azure", "React"],
  },
  {
    number: "04",
    name: "Plataforma de empleo y cursos IT",
    role: "Frontend Developer",
    bullets: [
      "Búsqueda laboral por stack tecnológico + cursos integrados, con perfiles personales e institucionales y manejo de roles.",
    ],
    stack: ["React", "TypeScript", "Redux", "Material UI"],
  },
  {
    number: "05",
    name: "Refactor de plataforma legacy (.NET MVC + AngularJS)",
    role: "Full Stack Developer",
    bullets: [
      "Reestructuración de estado global con Redux Toolkit (slices, selectors, async actions), lazy loading, memoización, paginación, caching con Redux Persist y debounce: mejora de performance y usabilidad superior al 70%.",
    ],
    stack: ["Redux Toolkit", "React", ".NET MVC", "Performance"],
  },
];

export type TechCategory = {
  category: string;
  items: string[];
};

export const techStack: TechCategory[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "React Native", "HTML5", "CSS3", "SASS", "Tailwind CSS"],
  },
  {
    category: "Estado & UI",
    items: ["Redux Toolkit", "Context API", "Material UI", "shadcn/ui"],
  },
  {
    category: "Backend",
    items: [".NET (C#)", "Entity Framework", "Node.js", "Express", "NestJS", "REST APIs", "WebSockets"],
  },
  {
    category: "Datos & BaaS",
    items: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Azure", "AWS", "Vercel", "GitHub Actions", "Azure DevOps", "CI/CD", "Git Flow"],
  },
  {
    category: "Diseño & método",
    items: ["Figma", "UX/UI", "Agile/Scrum"],
  },
  {
    category: "IA",
    items: ["Claude Code", "MCPs", "Skills", "Prompting avanzado"],
  },
];

export const copy = {
  hero: {
    greeting: "¡Hola! Soy",
    name: "GASTÓN CELIS",
    roleGhost: "FULL STACK DEVELOPER",
    ghostText: "REACT · NEXT.JS · .NET",
    subtitle:
      "De la idea al deploy: construyo productos web completos, del pixel a la base de datos.",
    ctaPrimary: "Ver proyectos",
    ctaSecondary: "Descargar CV",
  },
  statement:
    "Llevo productos de la idea al deploy: interfaces rápidas y cuidadas por delante, APIs y datos sólidos por detrás, y la arquitectura para que escalen.",
  contact: {
    title: "Hablemos.",
    subtitle: "¿Tenés un desafío para mí? Estoy abierto a nuevas oportunidades.",
  },
  footer: {
    name: "GASTÓN CELIS",
    signature: "Diseñado y desarrollado por Gastón Celis · 2026",
  },
  marquee: "FULL STACK DEVELOPER • REACT • NEXT.JS • TYPESCRIPT • .NET • NODE.JS •",
};

export const navLinks = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#stack", label: "Stack" },
  { href: "#contacto", label: "Contacto" },
];
