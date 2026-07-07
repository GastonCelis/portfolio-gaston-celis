# INSTRUCTIVO COMPLETO PARA CLAUDE CODE
## Portfolio profesional de Gastón Celis — Next.js + Three.js

> **Cómo usar este documento:** guardalo como `SPEC.md` en la raíz del proyecto y pedile a Claude Code: *"Lee SPEC.md y construí el portfolio siguiendo las fases en orden. No avances de fase sin cumplir los criterios de aceptación."* También podés copiar cada fase como prompt individual.

---

# 1. OBJETIVO

Portfolio personal de **Gastón Celis, Full Stack Developer**, cuyo único fin es **conseguir empleo** (no vender servicios: prohibido incluir tarifas, precios, "contratá mi servicio", WhatsApp flotante o formularios de presupuesto).

El sitio debe demostrar seniority con tres argumentos: contenido real de experiencia (abajo), ejecución técnica impecable (performance, SEO, accesibilidad) y una capa visual 3D/animada memorable pero sobria. Concepto de diseño: **"editorial oscuro con alma 3D"** — la sobriedad tipográfica de majd-portfolio.framer.website + el hero 3D interactivo de red1-for-hek.vercel.app.

**Idioma del sitio:** español, con toggle ES/EN si es viable (el contenido EN queda en `dictionaries/en.json`; si complica, dejar preparada la estructura i18n y publicar solo ES).

---

# 2. STACK OBLIGATORIO

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14+ (App Router, TypeScript estricto) |
| Estilos | Tailwind CSS |
| 3D | three + @react-three/fiber + @react-three/drei |
| Animación | GSAP + ScrollTrigger (plugin `useGSAP` de @gsap/react) |
| Scroll suave | lenis (integrado con ScrollTrigger vía `lenis.on('scroll', ScrollTrigger.update)`) |
| Micro-interacciones | framer-motion (solo hovers/menú; lo pesado va por GSAP) |
| Fuentes | `next/font` — display: **Space Grotesk** o **Archivo** (700/800); texto: **Inter** |
| Deploy | Vercel |

Reglas técnicas globales:
- Canvas 3D importado con `next/dynamic` y `ssr: false`; envuelto en `<Suspense>`.
- `prefers-reduced-motion`: desactivar animaciones no esenciales y el mouse-tracking 3D.
- Mobile: `dpr={[1, 1.5]}`, desactivar sombras, versión estática o simplificada del hero 3D si FPS < 30.
- Lighthouse objetivo: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95.
- Metadata completa (title template, description, OpenGraph con imagen, favicon), `sitemap.ts`, `robots.ts`.
- Commits atómicos por fase.

---

# 3. DESIGN SYSTEM

```
Fondo base:      #0A0A0F  (casi negro, tinte azulado)
Superficie:      #12121A  (tarjetas)
Texto primario:  #F4F4F5
Texto secundario:#9CA3AF
Acento:          #8B5CF6  (violeta) — hovers, texto fantasma, rim light 3D
Acento suave:    #8B5CF6 al 35% de opacidad
Borde:           #27272A
```

- **Grano de fondo global**: overlay fixed con SVG `feTurbulence` (o PNG de noise) a `opacity: 0.04`, `pointer-events: none` (visto en Majd).
- Tipografía display en mayúsculas, tracking apretado (-0.02em), tamaños enormes (hero: `clamp(3rem, 10vw, 9rem)`).
- Navbar: **píldora flotante** centrada, fixed top, `backdrop-blur`, fondo `#12121A/80`, borde sutil; se compacta al scrollear (visto en Majd y Samu).
- Layout: contenedor máx 1200px, secciones con `py-32`, mucho aire.
- Cursor personalizado opcional: punto que escala sobre elementos interactivos.

---

# 4. CONTENIDO REAL (usar EXACTAMENTE estos datos)

## 4.1 Identidad
- **Nombre:** Gastón Celis
- **Rol:** Full Stack Developer — React | Next.js | TypeScript | Node.js | .NET
- **Ubicación:** Córdoba, Argentina (remoto)
- **Email:** gastoncelis09@gmail.com
- **LinkedIn:** linkedin.com/in/gaston-celis
- **Web/dominio:** gecdigital.dev (el portfolio puede vivir ahí o en subdominio)
- **GitHub:** pedir la URL a Gastón antes de publicar (placeholder `#` mientras tanto).
- **CV descargable:** `public/cv/Gaston-Celis-Full-Stack.pdf` (Gastón lo copia; botón "Descargar CV").
- No publicar el teléfono en el sitio.

## 4.2 Resumen profesional (para "Sobre mí")
> Full Stack Developer con +4 años de experiencia construyendo aplicaciones web escalables de punta a punta: React, Next.js y TypeScript en frontend; .NET (C#) y Node.js en backend. Diseño APIs REST, modelo bases de datos SQL y NoSQL, e implemento autenticación, integraciones y pipelines CI/CD. Trabajé en células ágiles junto a Backend, QA, UX/UI y DevOps, con liderazgo técnico: mentoring, code reviews, estimaciones y análisis funcional directo con clientes y Product Owners.

## 4.3 Stats (tarjetas con contador animado)
- **+4** años de experiencia
- **+10** proyectos en producción
- **2** desarrolladores mentoreados
- **7→1** sistemas consolidados en una sola plataforma (mejor stat, usarla)

## 4.4 Timeline de experiencia (sección "Trayectoria")
1. **2026 — HOY · GEC Soluciones Digitales — Founder & Full Stack Developer.** Soluciones web en producción para clientes comerciales, institucionales y gubernamentales: ecommerce, sitios institucionales y paneles administrativos con autogestión de contenido. Stack: Next.js, TypeScript, Supabase (PostgreSQL, Auth, Storage), Tailwind, Vercel. Ciclo completo: análisis funcional, diseño UX/UI, desarrollo, SEO, deploy y soporte.
2. **2022 — 2026 · Snoop Consulting — Software Engineer (Frontend / Full Stack).** Plataformas complejas para clientes externos y productos internos en tecnología, educación, regulación, logística y eventos masivos. APIs REST en .NET + SQL Server, frontends React/Redux Toolkit, CI/CD con GitHub Actions y Azure DevOps. Liderazgo técnico de módulos internos, code reviews y mentoring a 2 devs junior.
3. **2020 — 2022 · Formación intensiva.** Desarrollo Web Full Stack en Coderhouse; inicio de Ingeniería en Sistemas (UTN). Primeros proyectos reales en React y Node.
   *(Formato visual estilo red1: año grande a la derecha, rol + 2 líneas de descripción.)*

## 4.5 Proyectos destacados (sección "Proyectos", numerados 01-05)
**No usar nombres reales de clientes** (decir "ente regulador nacional", "productora de eventos masivos", etc.).

**01 · Plataforma de gestión de eventos masivos** — Frontend Lead
- Sistema integral para una de las mayores productoras de eventos de Argentina: gestión de eventos, personal, proveedores, accesos, sectores, historial operativo, reportes, etiquetas y tickets.
- 3 paneles según rol (admin / proveedores / operarios) + **PWA offline con escaneo de QR** para operar sin conectividad.
- Hecho desde cero: diseño UX/UI completo en Figma, arquitectura frontend, integración de API, deploy en Azure vía GitHub Actions, documentación y handoff con mentoría.
- Stack: React · TypeScript · Redux Toolkit · Material UI · PWA · Azure · GitHub Actions

**02 · Consolidación logística: 7 sistemas en 1** — Frontend Developer
- Plataforma que unificó las operaciones que los empleados de una industria de tecnología y hogar hacían en 7 sistemas distintos: entregas, pesos, stock, movimientos y logística, con manejo de roles.
- Stack: React · TypeScript · Redux · Material UI

**03 · Cotizador para ente regulador nacional** — Full Stack Developer
- Diseño y construcción de endpoints REST en .NET + Entity Framework + SQL Server, consumidos desde el propio frontend; autenticación con Azure AD y validaciones vía Azure API Gateway; integración con backends externos del cliente.
- Mejora significativa en administración de cotizaciones: envío, firmas y creación.
- Stack: .NET (C#) · Entity Framework · SQL Server · Azure · React

**04 · Plataforma de empleo y cursos IT** — Frontend Developer
- Búsqueda laboral por stack tecnológico + cursos integrados, con perfiles personales e institucionales y manejo de roles.
- Stack: React · TypeScript · Redux · Material UI

**05 · Refactor de plataforma legacy (.NET MVC + AngularJS)** — Full Stack Developer
- Reestructuración de estado global con Redux Toolkit (slices, selectors, async actions), lazy loading, memoización, paginación, caching con Redux Persist y debounce: **mejora de performance y usabilidad superior al 70%**.
- Stack: Redux Toolkit · React · .NET MVC · Performance

*(Estructura por proyecto: número 01, nombre, rol, 2-3 bullets problema→solución→resultado, chips de stack. Si hay demo/repo público, botones; si no, omitirlos — la mayoría son proyectos de cliente privados.)*

## 4.6 Tech stack (sección "Stack", grid por categoría)
- **Frontend:** React, Next.js, TypeScript, JavaScript, React Native, HTML5, CSS3, SASS, Tailwind CSS
- **Estado & UI:** Redux Toolkit, Context API, Material UI, shadcn/ui
- **Backend:** .NET (C#), Entity Framework, Node.js, Express, NestJS, REST APIs, WebSockets
- **Datos & BaaS:** SQL Server, PostgreSQL, MySQL, MongoDB, Supabase, Firebase
- **Cloud & DevOps:** Azure, AWS, Vercel, GitHub Actions, Azure DevOps, CI/CD, Git Flow
- **Diseño & método:** Figma, UX/UI, Agile/Scrum
- **IA:** Claude Code, MCPs, skills, prompting avanzado

## 4.7 Textos clave
- **Hero:** "¡Hola! Soy" / "GASTÓN CELIS" / "FULL STACK DEVELOPER" (con duplicado fantasma violeta detrás: "REACT · NEXT.JS · .NET"). Sub: "De la idea al deploy: construyo productos web completos, del pixel a la base de datos." CTAs: "Ver proyectos" + "Descargar CV".
- **Statement (reveal palabra por palabra):** "Llevo productos de la idea al deploy: interfaces rápidas y cuidadas por delante, APIs y datos sólidos por detrás, y la arquitectura para que escalen."
- **Contacto:** "Hablemos." + "¿Tenés un desafío para mí? Estoy abierto a nuevas oportunidades." + email como link gigante + iconos GitHub/LinkedIn + botón CV.
- **Footer:** nombre "GASTÓN CELIS" gigante semitransparente (estilo MAJD) + "Diseñado y desarrollado por Gastón Celis · 2026".
- **Marquee preloader/hero:** "FULL STACK DEVELOPER • REACT • NEXT.JS • TYPESCRIPT • .NET • NODE.JS •"

---

# 5. ESTRUCTURA DE ARCHIVOS

```
src/
  app/
    layout.tsx          # fonts, metadata, grain overlay, SmoothScroll
    page.tsx            # home: compone todas las secciones
    sitemap.ts / robots.ts / opengraph-image.tsx
  components/
    layout/  Navbar.tsx  Footer.tsx  SmoothScroll.tsx  GrainOverlay.tsx  Cursor.tsx
    three/   HeroScene.tsx  Avatar.tsx (o AbstractShape.tsx)  SceneLights.tsx
    sections/ Hero.tsx  Statement.tsx  About.tsx  Experience.tsx
              Projects.tsx  ProjectItem.tsx  TechStack.tsx  Contact.tsx
    ui/      Preloader.tsx  Marquee.tsx  MagneticButton.tsx  SectionTitle.tsx  StatCard.tsx  Chip.tsx
    anim/    SplitTextReveal.tsx  WordScrollReveal.tsx  FadeIn.tsx  Counter.tsx
  lib/     data.ts (TODO el contenido de la sección 4 tipado)  gsap.ts  hooks/
  public/  models/avatar.glb  hdr/studio.hdr  cv/  grain.png
```

Todo el contenido vive en `lib/data.ts` — los componentes no hardcodean texto.

---

# 6. ESPECIFICACIÓN DE SECCIONES Y ANIMACIONES

### 6.0 Preloader (inspirado en red1)
Píldora oscura centrada "CARGANDO {n}%" con % real de `useProgress` (drei); detrás, marquee gigante del texto de 4.7 en gris `#27272A`. Salida: la píldora se contrae y el overlay hace clip-path reveal hacia arriba (GSAP, 0.8s, `power4.inOut`). Mínimo 1.2s para evitar flash.

### 6.1 Hero (red1 + toque Majd)
- Canvas R3F full-viewport detrás del contenido.
- **Escena — opción A (preferida):** avatar GLB estilizado (Gastón lo genera en Ready Player Me y lo pone en `public/models/avatar.glb`; usar un placeholder low-poly mientras). Torso/cabeza centrado.
- **Opción B (fallback sin avatar):** icosaedro/esfera con `MeshDistortMaterial` violeta + wireframe, en `Float` de drei. Implementar B primero; migrar a A cuando exista el GLB.
- Iluminación: `Environment` HDR sutil + `pointLight` violeta trasero (rim light) + luz fría lateral. Fondo con 2 manchas de luz violeta radial en esquinas (CSS, como red1).
- **Mouse tracking:** la cabeza del avatar (o la rotación del objeto) sigue el puntero con lerp `0.05` en `useFrame`. Con reduced-motion: rotación autónoma lenta.
- **Parpadeo (solo opción A):** morph target de ojos cada 2–6s aleatorio.
- Texto HTML encima: "¡Hola! Soy" (violeta, pequeño) → "GASTÓN CELIS" display gigante → "FULL STACK DEVELOPER" con **duplicado fantasma** violeta 35% desplazado -8px arriba. Entrada al terminar el preloader: reveal por líneas con `filter: blur(8px)→0`, `y: 40→0`, stagger 0.12 (initialFX de red1).
- Al fondo del viewport: hint de scroll (línea vertical animada) y redes en columna izquierda (GitHub, LinkedIn) como red1.

### 6.2 Statement (efecto estrella de Majd)
Párrafo de 4.7 centrado, `clamp(1.5rem, 3.5vw, 2.75rem)`. Cada palabra en `<span>` color `#3F3F46`; ScrollTrigger con `scrub: true` (start `top 75%`, end `bottom 40%`) va pintando a `#F4F4F5` palabra por palabra con stagger secuencial.

### 6.3 Sobre mí + Stats
Grid 2 columnas (bio 4.2 | 4 StatCards de 4.3 con `Counter` animado al entrar + `borderColor` de acento al hover). Título de sección estándar: `SectionTitle` con reveal clip-path desde abajo + número índice ("02 —").

### 6.4 Trayectoria (timeline de red1)
Lista vertical: año display gigante alineado a la derecha (violeta al 30%), rol y descripción a la izquierda. Línea vertical central que se dibuja con scrub (`scaleY 0→1`, `transform-origin: top`). Cada entrada: fade + slide lateral alternado, `once: true`.

### 6.5 Proyectos
Lista numerada tipo editorial (red1 + Majd): fila con "01" gigante outline, nombre del proyecto en display, rol pequeño. **Hover:** el número se rellena de violeta, la fila se desplaza 12px, y aparece un panel lateral (o imagen flotante que sigue el cursor) con los bullets y chips del proyecto. En mobile: tarjetas expandibles (accordion). Datos de 4.5.

### 6.6 Tech stack
Chips agrupados por categoría (4.6). Entrada con stagger 0.03 (`scale 0.8→1, opacity`), hover con borde violeta + lift. Opcional: marquee doble (dos filas en direcciones opuestas) con los nombres.

### 6.7 Contacto + Footer
- "Hablemos." display gigante con reveal; email como link `hover:` subrayado animado; `MagneticButton` para "Descargar CV"; iconos GitHub/LinkedIn.
- Footer: "GASTÓN CELIS" a `12vw`, color `#F4F4F5` al 6%, cortado por el borde inferior (MAJD). Línea de copyright.
- **Sin formulario** en v1 (evita backend y spam); el mailto + LinkedIn bastan para reclutadores.

### 6.8 Navbar
Píldora flotante: logo "GC" | enlaces Sobre mí · Trayectoria · Proyectos · Stack · Contacto (scroll suave con Lenis) | CTA "CV". Aparece tras el preloader con `y: -20→0`. Se compacta (menos padding) al scrollear >80px. Menú mobile: overlay full-screen con stagger de links.

---

# 7. FASES DE IMPLEMENTACIÓN (ejecutar en orden)

### FASE 1 — Setup y esqueleto
`create-next-app` (TS, Tailwind, App Router) + instalar `three @react-three/fiber @react-three/drei gsap @gsap/react lenis framer-motion`. Design tokens en Tailwind config, fuentes, GrainOverlay, SmoothScroll con Lenis, `lib/data.ts` completo, todas las secciones renderizando contenido estático sin animar, navbar y footer.
✅ *Criterio: la página completa se lee de punta a punta con todo el contenido real, responsive, sin errores de consola ni de tipos.*

### FASE 2 — Animaciones 2D (GSAP)
SplitTextReveal, WordScrollReveal (statement), SectionTitle, FadeIn genérico, Counter, timeline con línea scrub, hovers de proyectos, marquees, navbar compacta, menú mobile.
✅ *Criterio: scroll fluido 60fps, sin layout shifts, `prefers-reduced-motion` respetado (todo visible sin animar).*

### FASE 3 — Escena 3D + Preloader
HeroScene con opción B (forma abstracta distorsionada + luces + mouse tracking), Preloader con useProgress, initialFX del texto del hero encadenado a la salida del preloader. Dejar `Avatar.tsx` preparado para swap a GLB (opción A) con instrucciones en comentario.
✅ *Criterio: carga sin bloquear LCP, mobile mantiene ≥30fps o degrada a versión estática, reduced-motion = rotación autónoma sin tracking.*

### FASE 4 — Pulido y calidad
Cursor custom, MagneticButton, focus states accesibles, aria-labels, skip-link, revisión responsive completa (360px→1920px), metadata + OG image + sitemap + robots, favicon "GC", `npm run build` limpio, Lighthouse ≥ objetivos de sección 2.
✅ *Criterio: build de producción sin warnings; Lighthouse cumplido; navegación completa por teclado.*

### FASE 5 — Deploy
Deploy a Vercel, dominio gecdigital.dev (o subdominio), verificar OG con validador, README con instrucciones para: reemplazar avatar GLB, actualizar CV pdf, editar `lib/data.ts`.

### FASE 6 (opcional, diferencial) — "Preguntame lo que quieras" (idea de Toukoum)
Chat IA flotante que responde sobre la experiencia de Gastón: route handler `app/api/chat/route.ts` con Vercel AI SDK + streaming, system prompt construido desde `lib/data.ts`, chips rápidos (Experiencia · Proyectos · Stack · Contacto), rate limiting básico y burbuja flotante abajo a la derecha. Esto convierte el portfolio en demo full stack en sí mismo.

---

# 8. QUÉ NO HACER
- ❌ Tarifas, precios, planes, "servicios", WhatsApp flotante, popups, banners de ofertas (anti-patrón Samu para este objetivo).
- ❌ Nombres reales de clientes de Snoop en proyectos (usar los genéricos de 4.5).
- ❌ Teléfono publicado.
- ❌ Librerías de UI pesadas (MUI/AntD) — todo custom con Tailwind.
- ❌ Autoplay de audio, scroll hijacking agresivo, animaciones > 1s que bloqueen la lectura.
- ❌ Inventar métricas o experiencia que no esté en la sección 4.

# 9. REFERENCIAS VISUALES (para inspiración, no copiar)
- red1-for-hek.vercel.app → preloader, hero 3D con mouse-tracking, timeline, reveals con blur.
- majd-portfolio.framer.website → reveal palabra por palabra, navbar píldora, grano, footer gigante, contraste editorial.
- aaabadcode.com → chat IA (fase 6) y chips de acceso rápido.
