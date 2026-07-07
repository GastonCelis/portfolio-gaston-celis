# Portfolio — Gastón Celis

Portfolio profesional construido con Next.js 16 (App Router) + TypeScript, Tailwind CSS v4, Three.js/React Three Fiber, GSAP y Lenis.

**Producción:** https://portfolio-gaston-celis.vercel.app
**Repo:** https://github.com/GastonCelis/portfolio-gaston-celis

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4
- three + @react-three/fiber + @react-three/drei (hero 3D)
- GSAP + @gsap/react + ScrollTrigger (animaciones de scroll)
- Lenis (smooth scroll, sincronizado con ScrollTrigger)
- framer-motion (micro-interacciones)

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de producción
npm run lint    # ESLint
```

## Cómo editar el contenido

**Todo el texto del sitio vive en [`lib/data.ts`](lib/data.ts)** — identidad, resumen, stats, experiencia, proyectos, stack tecnológico y los copys de cada sección. Los componentes no tienen texto hardcodeado, así que para actualizar cualquier dato (nueva experiencia, proyecto, stat, etc.) alcanza con editar ese archivo.

## Deploy continuo

El repo está conectado a Vercel: **cualquier push a `master` dispara un deploy de producción automático.** Para desplegar manualmente igual funciona:

```bash
vercel --prod
```

## Tareas pendientes para Gastón

### 1. Reemplazar el CV

Copiar el PDF real a:

```
public/cv/Gaston-Celis-Full-Stack.pdf
```

El botón "Descargar CV" ya apunta a esa ruta (`identity.cvPath` en `lib/data.ts`) — no hace falta tocar código.

### 2. (Opcional) Activar el avatar 3D en el Hero

Actualmente el Hero usa una forma abstracta (icosaedro distorsionado violeta) como placeholder — la "opción B" del spec. Para pasar a un avatar 3D real (opción A):

1. Generar un avatar low-poly/estilizado en [readyplayer.me](https://readyplayer.me).
2. Copiar el `.glb` resultante a `public/models/avatar.glb`.
3. En `components/three/HeroScene.tsx`, reemplazar `<DistortedShape />` por `<Avatar reducedMotion={reducedMotion} />` (importando `Avatar` desde `@/components/three/Avatar`).
4. Ajustar cámara/escala en `HeroScene.tsx` según las proporciones reales del modelo exportado.

`components/three/Avatar.tsx` ya está preparado con el mouse-tracking y el fallback de reduced-motion — solo falta el archivo `.glb` y el swap del import.

### 3. (Opcional) Dominio propio

El sitio corre en el dominio gratuito de Vercel (`portfolio-gaston-celis.vercel.app`). Si en algún momento se quiere mover a un dominio propio:

1. `vercel domains add tu-dominio.com` (o conectarlo desde el dashboard de Vercel → Project Settings → Domains).
2. Configurar los registros DNS que indique Vercel en el proveedor del dominio.
3. Actualizar `identity.website` en `lib/data.ts` con el nuevo dominio (de esto dependen `metadataBase`, el `sitemap.ts`, el `robots.ts` y las URLs de OpenGraph/Twitter).
4. Hacer push — el deploy continuo se encarga del resto — y volver a verificar el OG con un validador (p. ej. [opengraph.xyz](https://www.opengraph.xyz) o el debugger de Meta/LinkedIn).
