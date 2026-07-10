# Gastón Celis — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://portfolio-gaston-celis.vercel.app)

Portfolio profesional de **Gastón Celis**, Full Stack Developer. Sitio en producción, construido con Next.js 16, una escena 3D interactiva en el Hero, animaciones scroll-driven con GSAP y un sistema de contenido de proyectos que se auto-genera desde el filesystem.

**🔗 Demo en vivo:** **[portfolio-gaston-celis.vercel.app](https://portfolio-gaston-celis.vercel.app/)**

---

## Sobre el proyecto

Portfolio de una sola página (single-page, con navegación por anclas) pensado para presentar experiencia, proyectos y stack técnico de forma visualmente distintiva — sin caer en plantillas genéricas. Incluye:

- **Hero 3D interactivo**: escena Three.js con una forma abstracta que reacciona al mouse, renderizada vía React Three Fiber, con fallback automático si el usuario prefiere movimiento reducido.
- **Preloader con barra de progreso real**, sincronizado con la carga de assets (no un timer fijo), y transición de salida animada.
- **Animaciones de scroll** (GSAP + ScrollTrigger) con smooth scroll (Lenis): reveal de texto letra/palabra por palabra, fade-ins escalonados, clip-path reveals en los títulos de sección.
- **Carrusel infinito de tecnologías** (con íconos de marca reales vía `react-icons`) en el Hero, corregido para no mostrar huecos en pantallas ultra-wide.
- **Sección de Proyectos en 3 grupos** (Snoop Consulting, GEC Soluciones Digitales, proyectos personales), **generada automáticamente desde una carpeta `/projects`** — ver [Sistema de proyectos](#sistema-de-proyectos-auto-generado) más abajo.
- **Copiar email con un click**: en vez de abrir el cliente de correo (`mailto:`), copia el email al portapapeles y confirma la acción (accesible, con `aria-live`).
- **Menú mobile real**, cursor custom, grain overlay, y un footer con tipografía a gran escala sin overflow en ningún viewport.
- **Accesibilidad**: skip-link al contenido principal, `focus-visible` consistente en todos los elementos interactivos, respeto a `prefers-reduced-motion` en todas las animaciones, roles/`aria-live` donde corresponde.
- **SEO técnico**: metadata completa (OpenGraph + Twitter Cards), `sitemap.xml` y `robots.txt` generados por Next.js, favicon/apple-icon/OG-image dinámicos (`app/icon.tsx`, `app/opengraph-image.tsx`).
- **Responsive real** de 360px a 1920px+, auditado con capturas automatizadas en todo el rango, no solo en un par de breakpoints.

## Stack tecnológico

| Categoría | Tecnologías |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Turbopack), [React 19](https://react.dev) |
| **Lenguaje** | TypeScript |
| **Estilos** | [Tailwind CSS v4](https://tailwindcss.com) (config CSS-first, sin `tailwind.config.js`) |
| **3D** | [Three.js](https://threejs.org), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Animación** | [GSAP](https://gsap.com) + `@gsap/react` + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering) (smooth scroll), Framer Motion |
| **Contenido** | Sistema propio de carga de datos desde filesystem (`lib/projects.ts`) — sin CMS |
| **Deploy** | [Vercel](https://vercel.com), deploy continuo desde `master` |
| **Calidad** | ESLint, TypeScript estricto, auditorías con Lighthouse y Playwright (regresión visual multi-viewport) |

## Estructura del proyecto

```
app/                  # App Router: layout, page, metadata, sitemap/robots, iconos
components/
  layout/              # Navbar, Footer, Cursor, SmoothScroll, GrainOverlay
  sections/            # Hero, About, Experience, Projects, TechStack, Contact...
  three/               # Escena 3D del Hero (React Three Fiber)
  anim/                 # Primitivas de animación (FadeIn, SplitTextReveal, Counter...)
  ui/                   # Componentes reutilizables (Chip, Marquee, Preloader, íconos...)
lib/
  data.ts               # Todo el texto del sitio (identidad, experiencia, stack, copys)
  projects.ts           # Loader que arma la sección de Proyectos desde /projects
  hooks/                 # useMediaQuery, usePrefersReducedMotion, useIsMobile
projects/               # Contenido fuente de cada proyecto (ver más abajo)
scripts/
  sync-project-assets.mjs  # Sincroniza imágenes de /projects a /public/projects
```

**Todo el texto del sitio vive en [`lib/data.ts`](lib/data.ts).** Los componentes no tienen texto hardcodeado: para actualizar experiencia, stats o el stack tecnológico alcanza con editar ese archivo.

## Sistema de proyectos auto-generado

La sección de Proyectos no tiene los datos hardcodeados: **se arma en tiempo de build leyendo la carpeta `/projects`**.

```
projects/
  gec/
    <nombre-del-proyecto>/
      <nombre>.txt        # url, cliente, descripción, tecnologías, rol
      *.webp               # capturas del proyecto
  personales/
    <nombre-del-proyecto>/
      <nombre>.txt
      *.webp
```

- Agregar una carpeta nueva con su `.txt` + imágenes hace que el proyecto aparezca solo en el sitio. Borrar la carpeta lo quita. **No hace falta tocar código.**
- `lib/projects.ts` parsea cada `.txt` (formato clave-valor en español: `url:`, `cliente:`/`nombre:`, `descripción:`, bullets con `-`, `tecnologías:`, `rol:`, `repositorio GitHub:`) y arma el objeto de cada proyecto.
- `scripts/sync-project-assets.mjs` copia las imágenes a `public/projects/...` antes de cada `dev`/`build` (hooks `predev`/`prebuild` de npm), para que Next.js pueda servirlas y optimizarlas con `next/image`.
- Los proyectos de **Snoop Consulting** son la excepción: están hardcodeados en `lib/data.ts` porque son confidenciales (código y datos del cliente no públicos) y se documentan solo como texto, sin capturas ni repos.

## Uso de IA en el desarrollo

Este proyecto fue construido en colaboración con **[Claude Code](https://claude.com/claude-code)** (agente de desarrollo de Anthropic) como herramienta principal de pair-programming durante todo el ciclo: arquitectura inicial, implementación de componentes y animaciones, integración de la escena 3D, automatización del pipeline de contenido de proyectos, diagnóstico y corrección de bugs reales (overlaps responsive, colisiones de utilidades de Tailwind, memory leaks de animación), auditorías de diseño y accesibilidad, y deploy.

Todas las decisiones de producto, diseño y contenido son mías; la IA se usó como acelerador de implementación bajo dirección explícita, no de forma autónoma. Cada cambio se verificó antes de integrarse: chequeo de tipos (`tsc`), lint, build de producción, pruebas visuales automatizadas con Playwright en todo el rango responsive (360px–1920px) y auditorías de Lighthouse (Performance, Accesibilidad, Best Practices, SEO).

Lo documento acá porque es información relevante sobre cómo trabajo hoy como desarrollador — el uso de IA como herramienta de productividad, combinado con criterio técnico y verificación humana en cada paso, es parte de mi forma de construir software.

## Autor

**Gastón Celis** — Full Stack Developer
[GitHub](https://github.com/GastonCelis) · [LinkedIn](https://linkedin.com/in/gaston-celis)
