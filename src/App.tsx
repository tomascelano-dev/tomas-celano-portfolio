import { useEffect, useState } from 'react'
import './App.css'

type Lang = 'en' | 'es'

type ProjectLink = {
  label: string
  href: string
}

type Screenshot = {
  src: string
  alt: string
  label: string
}

type ProjectVisual =
  | { kind: 'screenshots'; items: Screenshot[] }
  | { kind: 'diagram'; src: string; alt: string; caption: string; screenshots?: Screenshot[] }

type Project = {
  id: string
  eyebrow: string
  badge?: string
  title: string
  summary: string
  problemHeading: string
  problem: string
  links: ProjectLink[]
  note?: string
  stack: string[]
  visual?: ProjectVisual
}

type Content = {
  htmlLang: string
  langName: string
  switchTo: string
  switchAriaLabel: string
  hero: {
    eyebrow: string
    title: string
    copy: string
    githubBtn: string
    contactBtn: string
    previewAlt: string
    previewLabel: string
  }
  projects: Project[]
  contact: {
    eyebrow: string
    heading: string
    github: string
    linkedin: string
    email: string
  }
}

const repairShopScreenshots = (
  alts: { dashboard: string; orders: string; inventory: string; login: string },
  labels: { dashboard: string; orders: string; inventory: string; login: string },
): Screenshot[] => [
  { src: '/screenshots/dashboard.png', alt: alts.dashboard, label: labels.dashboard },
  { src: '/screenshots/orders.png', alt: alts.orders, label: labels.orders },
  { src: '/screenshots/inventory.png', alt: alts.inventory, label: labels.inventory },
  { src: '/screenshots/login.png', alt: alts.login, label: labels.login },
]

const content: Record<Lang, Content> = {
  en: {
    htmlLang: 'en',
    langName: 'English',
    switchTo: 'ES',
    switchAriaLabel: 'Cambiar a español',
    hero: {
      eyebrow: 'Tomas Celano',
      title: 'Backend Developer · Automation & AI',
      copy: 'I build APIs, internal tools and AI integrations with .NET and Python, mostly for small businesses that run on WhatsApp and spreadsheets. My usual pattern: a model reads the messy input, tested code makes the decisions.',
      githubBtn: 'View GitHub Profile',
      contactBtn: 'Contact',
      previewAlt: 'RepairShop Management System dashboard preview',
      previewLabel: 'Featured project preview',
    },
    projects: [
      {
        id: 'repairshop',
        eyebrow: 'Featured Project',
        badge: 'In production',
        title: 'RepairShop Management System',
        summary:
          'Multi-tenant SaaS for phone and electronics repair shops, live with public signup and monthly subscriptions. It covers the whole repair: intake with checklist and signature, estimates the customer approves from a link, parts reservation, point of sale, cash register and warranty.',
        problemHeading: 'What problem it solves',
        problem:
          'A repair shop loses money in the gaps: a repair started without an approved estimate, a part promised twice, a device handed over with a balance due, a customer calling to ask how it is going. RepairShop turns those into rules the order workflow enforces, and gives each customer a tracking link with a QR code where they follow the repair, approve the estimate and pay with Mercado Pago. Shops subscribe through Mercado Pago with signed webhooks, can issue ARCA electronic invoices with their own certificate, and their data is backed up encrypted off-site every night. 171 automated tests, including integration tests against PostgreSQL.',
        links: [
          {
            label: 'View Repository',
            href: 'https://github.com/tomascelano-dev/repair-shop-management-system',
          },
          { label: 'View Live App', href: 'https://app.techxto.ar' },
        ],
        stack: [
          '.NET 8 Web API',
          'PostgreSQL · EF Core',
          'React + TypeScript',
          'Multi-tenant',
          'Mercado Pago (subscriptions, webhooks)',
          'ARCA e-invoicing',
          'Docker Compose · Caddy · Cloudflare',
          '171 tests',
        ],
        visual: {
          kind: 'screenshots',
          items: repairShopScreenshots(
            {
              dashboard: 'RepairShop dashboard with operational metrics',
              orders: 'Repair orders list and management view',
              inventory: 'Inventory management table',
              login: 'RepairShop login screen',
            },
            {
              dashboard: 'Dashboard',
              orders: 'Repair Orders',
              inventory: 'Inventory',
              login: 'Authentication',
            },
          ),
        },
      },
      {
        id: 'agendocita',
        eyebrow: 'Project · SaaS',
        badge: 'In production',
        title: 'AgendoCita',
        summary:
          'Appointment and front-desk SaaS for health centres in Argentina, live with self-service signup, Mercado Pago subscriptions and automatic electronic invoicing. Built around how a physiotherapy centre really works: several patients per slot, session packages, insurers and a daily cash register.',
        problemHeading: 'What problem it solves',
        problem:
          'Generic booking tools assume one patient per slot and a patient who books alone. In a physiotherapy centre the front desk books everything, a professional treats four or five patients in the same half hour, sessions come in packages or insurer orders that run out, and the day ends with a cash count. AgendoCita models that directly: capacity per slot enforced by the server, session counters that decrement on their own, insurer batches with payments and chargebacks, and a cash register per branch with an audit trail. On the commercial side a centre signs up, confirms by email, pays with Mercado Pago and gets its ARCA invoice issued automatically. Operations are part of the product: separate staging and production stacks, a least-privilege database role checked on every deploy, append-only audit and fiscal ledgers guarded by triggers, encrypted off-site backups with restore drills, and a monitor that alerts by email. Every stage ships through the same gate — a written contract, 1,600+ automated tests, mutation testing on the new controls and an independent review of the exact commit — a process I run with AI coding agents.',
        links: [{ label: 'View Live Site', href: 'https://agendocita.com.ar' }],
        note: 'The source is private: it handles clinical records and billing.',
        stack: [
          '.NET 8',
          'PostgreSQL 16',
          'React + TypeScript',
          'Mercado Pago subscriptions',
          'ARCA (WSAA / WSFEv1)',
          'Docker Compose · nginx · Caddy',
          'Encrypted backups · Cloudflare R2',
          '1,600+ tests · mutation testing',
        ],
      },
      {
        id: 'precios-mcp',
        eyebrow: 'Project · AI / MCP',
        badge: 'Open source',
        title: 'precios-mcp',
        summary:
          "Multi-tenant service that turns messy wholesale supplier lists into WhatsApp price lists with each store's markup applied. One core behind two doors: a REST API for n8n and an MCP server, so Claude can use it as a set of tools.",
        problemHeading: 'What problem it solves',
        problem:
          'A phone retailer gets several supplier lists a day as WhatsApp text, PDFs or photos, full of typos, abbreviated colours and one price for several variants, and every line has to be repriced before it reaches customers. An LLM reads that mess well but cannot be trusted with prices. So Claude only structures the list through an MCP tool, and everything that touches money — best cost across suppliers, markup, battery surcharge, warranty rules, checks like a bulk price higher than the unit price — is deterministic code with 23 tests, including integration tests against PostgreSQL.',
        links: [{ label: 'View Repository', href: 'https://github.com/tomascelano-dev/precios-mcp' }],
        stack: [
          'Python 3.11',
          'FastAPI',
          'MCP Python SDK 2.x',
          'PostgreSQL',
          'pytest · 23 tests',
          'GitHub Actions CI',
          'Docker',
          'n8n',
        ],
        visual: {
          kind: 'diagram',
          src: '/precios-mcp-architecture.svg',
          alt: 'precios-mcp architecture: Claude structures supplier lists and loads them through an MCP tool, n8n uses the same service over REST, and a FastAPI service with a tested pricing core stores lists in PostgreSQL and produces WhatsApp price lists and alerts.',
          caption: 'Two doors, one core — Claude structures the list, tested code sets the prices.',
        },
      },
      {
        id: 'leadpipeline',
        eyebrow: 'Project',
        badge: 'Ran in production',
        title: 'LeadPipeline',
        summary:
          'Lead capture and CRM engine for businesses that sell and support over WhatsApp and Instagram. It ingests every inbound message, auto-classifies intent and lead status, schedules follow-ups, and reports purchase conversions back to Meta Ads.',
        problemHeading: 'What problem it solves',
        problem:
          'A business that sells over WhatsApp and Instagram loses money two ways: messages pile up with no order so hot leads go cold, and ad spend is optimized blindly because Meta only sees clicks, not who actually bought. LeadPipeline ingests and classifies every message, schedules automatic follow-ups, and sends server-side conversions back to Meta — with ad attribution — so the algorithm learns to find real buyers.',
        links: [],
        note: 'Ran in production for a real business. The source is private (Meta tokens, secrets and customer data), so the repository is not public.',
        stack: [
          '.NET 8',
          'Clean Architecture',
          'PostgreSQL',
          'EF Core + Dapper',
          'Hangfire (background jobs)',
          'Meta Webhooks (HMAC-256)',
          'Meta Conversions API',
          'Docker · VPS',
        ],
        visual: {
          kind: 'diagram',
          src: '/leadpipeline-architecture.svg',
          alt: 'LeadPipeline architecture: Meta channels arrive via webhooks to a .NET 8 API that classifies messages, persists to PostgreSQL, schedules follow-ups with Hangfire and sends conversions to the Meta Conversions API.',
          caption: 'System architecture — ingestion, classification, jobs and Meta Conversions API.',
          screenshots: [
            {
              src: '/screenshots/leadpipeline-pipeline.png',
              alt: 'LeadPipeline dashboard listing inbound leads with auto-classified status (New, Curious, Quoted), follow-up state and timestamps. Names and phone numbers redacted.',
              label: 'Lead pipeline — every WhatsApp/Instagram message ingested and auto-classified by intent.',
            },
            {
              src: '/screenshots/leadpipeline-capi-events.png',
              alt: 'Meta Events Manager showing the LeadSubmitted event Active via the Conversions API with events received from the server.',
              label: 'Meta Events Manager — server-side LeadSubmitted conversions received through the Conversions API while it was in production.',
            },
          ],
        },
      },
      {
        id: 'tienda',
        eyebrow: 'Client work',
        badge: 'Real client',
        title: 'E-commerce toolchain for a phone retailer',
        summary:
          'Online store for a phone and accessories retailer with more than one branch, and the Python toolchain around it: the catalogue, product photos and blog posts are generated from data instead of edited by hand.',
        problemHeading: 'What problem it solves',
        problem:
          "The owner's stock export has no prices or categories, and prices arrive in batches over chat. Idempotent scripts rebuild the WooCommerce catalogue from scratch on every batch — cleaning names, generating SKUs, grouping products into price families, deciding what gets published — and audit it against Google Merchant Center requirements. Product photos get their background removed and are converted to WebP.",
        links: [],
        note: 'Client project: the store and the code are not linked for confidentiality.',
        stack: [
          'Python',
          'WooCommerce · WordPress',
          'Pillow',
          'rembg',
          'Google Merchant Center',
          'Matomo',
        ],
      },
      {
        id: 'pautas',
        eyebrow: 'Internal tool',
        badge: 'In use',
        title: 'Subtitle plan generator for a video agency',
        summary:
          'Python CLI that turns a raw talking-head video into a timed subtitle plan for editors: it transcribes the audio, decides where each caption goes and which words get highlighted, and outputs a spreadsheet plus overlay guides to use in Premiere.',
        problemHeading: 'What problem it solves',
        problem:
          "Every client of the agency has its own caption system — typefaces, sizes, line positions, how blocks stack — and laying it out by hand for each video is slow and inconsistent. The tool keeps each client's format as data, a JSON file of measured values, so a new client means a new JSON, not new code. It transcribes with faster-whisper, measures text with the real fonts to respect safe-area widths, detects the speaker's face with OpenCV so captions stay off it, and writes the plan to Excel. Editorial decisions live in a per-video overrides file, which makes every result reproducible. I still use it on client work.",
        links: [],
        note: 'Internal tool: the code is not public because it contains client formats.',
        stack: ['Python', 'faster-whisper', 'OpenCV', 'Pillow + NumPy', 'openpyxl', 'ffmpeg'],
        visual: {
          kind: 'diagram',
          src: '/pautas-pipeline.svg',
          alt: "Pipeline: a raw video is transcribed and measured, a layout engine combines that with the client's format and per-video overrides, and outputs a timed Excel plan, overlay guides and preview frames.",
          caption: "From raw video to a timed plan — the client's format is data, not code.",
        },
      },
    ],
    contact: {
      eyebrow: 'Contact',
      heading: 'Available for backend, automation and AI roles, and for freelance projects.',
      github: 'GitHub Profile',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
  },
  es: {
    htmlLang: 'es',
    langName: 'Español',
    switchTo: 'EN',
    switchAriaLabel: 'Switch to English',
    hero: {
      eyebrow: 'Tomas Celano',
      title: 'Desarrollador Backend · Automatización e IA',
      copy: 'Construyo APIs, herramientas internas e integraciones con IA en .NET y Python, casi siempre para negocios chicos que funcionan con WhatsApp y planillas. Mi patrón de siempre: un modelo lee lo desordenado y el código con tests toma las decisiones.',
      githubBtn: 'Ver perfil de GitHub',
      contactBtn: 'Contacto',
      previewAlt: 'Vista previa del dashboard de RepairShop Management System',
      previewLabel: 'Vista previa del proyecto destacado',
    },
    projects: [
      {
        id: 'repairshop',
        eyebrow: 'Proyecto destacado',
        badge: 'En producción',
        title: 'RepairShop Management System',
        summary:
          'SaaS multi-tenant para talleres de reparación de celulares y electrónica, en producción con registro público y suscripción mensual. Cubre la reparación completa: ingreso con checklist y firma, presupuestos que el cliente aprueba desde un link, reserva de repuestos, punto de venta, caja y garantías.',
        problemHeading: 'Qué problema resuelve',
        problem:
          'Un taller pierde plata en los huecos: una reparación que arranca sin presupuesto aprobado, un repuesto prometido dos veces, un equipo que se entrega con saldo pendiente, un cliente que llama para preguntar cómo va. RepairShop convierte eso en reglas que el flujo de la orden hace cumplir, y le da a cada cliente un link de seguimiento con código QR donde ve su reparación, aprueba el presupuesto y paga con Mercado Pago. Los talleres se suscriben por Mercado Pago con webhooks firmados, pueden emitir factura electrónica de ARCA con su propio certificado, y sus datos se respaldan cifrados fuera del servidor todas las noches. 171 tests automáticos, incluidos tests de integración contra PostgreSQL.',
        links: [
          {
            label: 'Ver repositorio',
            href: 'https://github.com/tomascelano-dev/repair-shop-management-system',
          },
          { label: 'Ver app en vivo', href: 'https://app.techxto.ar' },
        ],
        stack: [
          '.NET 8 Web API',
          'PostgreSQL · EF Core',
          'React + TypeScript',
          'Multi-tenant',
          'Mercado Pago (suscripciones, webhooks)',
          'Factura electrónica ARCA',
          'Docker Compose · Caddy · Cloudflare',
          '171 tests',
        ],
        visual: {
          kind: 'screenshots',
          items: repairShopScreenshots(
            {
              dashboard: 'Dashboard de RepairShop con métricas operativas',
              orders: 'Listado y gestión de órdenes de reparación',
              inventory: 'Tabla de gestión de inventario',
              login: 'Pantalla de login de RepairShop',
            },
            {
              dashboard: 'Dashboard',
              orders: 'Órdenes de reparación',
              inventory: 'Inventario',
              login: 'Autenticación',
            },
          ),
        },
      },
      {
        id: 'agendocita',
        eyebrow: 'Proyecto · SaaS',
        badge: 'En producción',
        title: 'AgendoCita',
        summary:
          'SaaS de turnos y recepción para centros de salud de Argentina, en producción con alta self-service, suscripción por Mercado Pago y factura electrónica automática. Está pensado para cómo trabaja de verdad un centro de kinesiología: varios pacientes por franja, paquetes de sesiones, obras sociales y caja diaria.',
        problemHeading: 'Qué problema resuelve',
        problem:
          'Las agendas genéricas suponen un paciente por turno y un paciente que reserva solo. En un centro de kinesiología todo lo carga la secretaria, un profesional atiende cuatro o cinco pacientes en la misma media hora, las sesiones vienen en paquetes u órdenes de obra social que se agotan, y el día termina con un arqueo. AgendoCita modela eso directamente: cupo por franja que hace cumplir el servidor, contadores de sesiones que se descuentan solos, lotes de obras sociales con pagos y débitos, y caja por sede con auditoría. En lo comercial, un centro se registra, confirma por mail, paga con Mercado Pago y recibe su factura de ARCA emitida automáticamente. La operación es parte del producto: stacks de staging y producción separados, un rol de base con privilegios mínimos que se controla en cada deploy, auditoría y libro fiscal de solo agregado protegidos por triggers, backups cifrados fuera del servidor con ensayos de restauración, y un monitor que avisa por mail. Cada etapa pasa por el mismo control —contrato escrito, más de 1.600 tests automáticos, tests de mutación sobre los controles nuevos y una revisión independiente del commit exacto—, un proceso que llevo adelante con agentes de IA.',
        links: [{ label: 'Ver sitio en vivo', href: 'https://agendocita.com.ar' }],
        note: 'El código es privado: maneja historias clínicas y facturación.',
        stack: [
          '.NET 8',
          'PostgreSQL 16',
          'React + TypeScript',
          'Suscripciones con Mercado Pago',
          'ARCA (WSAA / WSFEv1)',
          'Docker Compose · nginx · Caddy',
          'Backups cifrados · Cloudflare R2',
          'Más de 1.600 tests · tests de mutación',
        ],
      },
      {
        id: 'precios-mcp',
        eyebrow: 'Proyecto · IA / MCP',
        badge: 'Código abierto',
        title: 'precios-mcp',
        summary:
          'Servicio multi-tenant que convierte las listas mayoristas desordenadas de los proveedores en listas de precios para WhatsApp, con el markup de cada negocio. Un mismo núcleo con dos puertas: una API REST para n8n y un servidor MCP, para que Claude lo use como herramientas.',
        problemHeading: 'Qué problema resuelve',
        problem:
          'Una casa de celulares recibe varias listas de proveedores por día en texto de WhatsApp, PDF o foto, con typos, colores abreviados y un precio para varias variantes, y cada línea hay que recalcularla antes de que llegue al cliente. Un LLM lee bien ese desorden, pero no se le pueden confiar los precios. Por eso Claude solo estructura la lista a través de una tool MCP, y todo lo que toca plata —el mejor costo entre proveedores, el markup, el recargo por batería, las reglas de garantía, controles como un precio por cantidad más caro que el unitario— es código determinístico con 23 tests, incluidos tests de integración contra PostgreSQL.',
        links: [{ label: 'Ver repositorio', href: 'https://github.com/tomascelano-dev/precios-mcp' }],
        stack: [
          'Python 3.11',
          'FastAPI',
          'MCP Python SDK 2.x',
          'PostgreSQL',
          'pytest · 23 tests',
          'CI con GitHub Actions',
          'Docker',
          'n8n',
        ],
        visual: {
          kind: 'diagram',
          src: '/precios-mcp-architecture-es.svg',
          alt: 'Arquitectura de precios-mcp: Claude estructura las listas de los proveedores y las carga con una tool MCP, n8n usa el mismo servicio por REST, y un servicio FastAPI con un núcleo de precios testeado guarda las listas en PostgreSQL y arma las listas de WhatsApp y las alertas.',
          caption: 'Dos puertas, un núcleo: Claude estructura la lista, el código con tests pone los precios.',
        },
      },
      {
        id: 'leadpipeline',
        eyebrow: 'Proyecto',
        badge: 'Estuvo en producción',
        title: 'LeadPipeline',
        summary:
          'Motor de captura de leads y CRM para negocios que venden y atienden por WhatsApp e Instagram. Ingiere cada mensaje entrante, clasifica automáticamente la intención y el estado del lead, agenda follow-ups y reporta las conversiones de compra de vuelta a Meta Ads.',
        problemHeading: 'Qué problema resuelve',
        problem:
          'Un negocio que vende por WhatsApp e Instagram pierde plata de dos maneras: los mensajes se amontonan sin orden y los leads calientes se enfrían, y la inversión en ads se optimiza a ciegas porque Meta solo ve clicks, no quién terminó comprando. LeadPipeline ingiere y clasifica cada mensaje, agenda follow-ups automáticos y envía conversiones server-side a Meta —con atribución del anuncio— para que el algoritmo aprenda a buscar compradores reales.',
        links: [],
        note: 'Estuvo en producción para un negocio real. El código es privado (tokens de Meta, secrets y datos de clientes), por eso el repositorio no es público.',
        stack: [
          '.NET 8',
          'Clean Architecture',
          'PostgreSQL',
          'EF Core + Dapper',
          'Hangfire (jobs en background)',
          'Meta Webhooks (HMAC-256)',
          'Meta Conversions API',
          'Docker · VPS',
        ],
        visual: {
          kind: 'diagram',
          src: '/leadpipeline-architecture-es.svg',
          alt: 'Arquitectura de LeadPipeline: los canales de Meta llegan por webhooks a una API .NET 8 que clasifica mensajes, los persiste en PostgreSQL, agenda follow-ups con Hangfire y envía conversiones a la Meta Conversions API.',
          caption: 'Arquitectura del sistema — ingesta, clasificación, jobs y Meta Conversions API.',
          screenshots: [
            {
              src: '/screenshots/leadpipeline-pipeline.png',
              alt: 'Dashboard de LeadPipeline con los leads entrantes y su estado auto-clasificado (Nuevo, Curioso, Cotizado), seguimiento y fechas. Nombres y teléfonos tapados.',
              label: 'Pipeline de leads — cada mensaje de WhatsApp/Instagram ingerido y auto-clasificado por intención.',
            },
            {
              src: '/screenshots/leadpipeline-capi-events.png',
              alt: 'Administrador de eventos de Meta mostrando el evento LeadSubmitted Activo vía la Conversions API, con eventos recibidos desde el servidor.',
              label: 'Administrador de eventos de Meta — conversiones LeadSubmitted server-side recibidas por la Conversions API mientras estuvo en producción.',
            },
          ],
        },
      },
      {
        id: 'tienda',
        eyebrow: 'Trabajo para cliente',
        badge: 'Cliente real',
        title: 'Herramientas para la tienda online de una casa de celulares',
        summary:
          'Tienda online de una casa de celulares y accesorios con más de un local, y las herramientas en Python que la rodean: el catálogo, las fotos de producto y las notas del blog se generan desde los datos en vez de editarse a mano.',
        problemHeading: 'Qué problema resuelve',
        problem:
          'El export de stock del dueño no trae precios ni categorías, y los precios llegan de a tandas por chat. Scripts idempotentes reconstruyen el catálogo de WooCommerce desde cero con cada tanda —limpian nombres, generan SKUs, agrupan productos en familias de precio y deciden qué se publica— y lo auditan contra los requisitos de Google Merchant Center. Las fotos de producto pasan por un recorte de fondo y se convierten a WebP.',
        links: [],
        note: 'Proyecto de un cliente: la tienda y el código no se linkean por confidencialidad.',
        stack: [
          'Python',
          'WooCommerce · WordPress',
          'Pillow',
          'rembg',
          'Google Merchant Center',
          'Matomo',
        ],
      },
      {
        id: 'pautas',
        eyebrow: 'Herramienta interna',
        badge: 'En uso',
        title: 'Generador de pautas de subtítulos para una agencia de video',
        summary:
          'CLI en Python que convierte un video crudo a cámara en una pauta de subtítulos timecodeada para los editores: transcribe el audio, decide dónde va cada tarjeta y qué palabras se resaltan, y entrega una planilla más guías superpuestas para usar en Premiere.',
        problemHeading: 'Qué problema resuelve',
        problem:
          'Cada cliente de la agencia tiene su propio sistema de subtítulos —tipografías, tamaños, posición de los renglones, cómo se apilan los bloques— y diagramarlo a mano en cada video es lento y desparejo. La herramienta guarda el formato de cada cliente como datos, un JSON con valores medidos, así que un cliente nuevo es un JSON nuevo, no código nuevo. Transcribe con faster-whisper, mide el texto con las fuentes reales para respetar el ancho de la zona segura, detecta la cara con OpenCV para que el texto no la tape y escribe la pauta en Excel. Las decisiones editoriales van en un archivo de retoques por video, lo que hace que cada resultado sea reproducible. La sigo usando en el trabajo con clientes.',
        links: [],
        note: 'Herramienta interna: el código no es público porque incluye los formatos de los clientes.',
        stack: ['Python', 'faster-whisper', 'OpenCV', 'Pillow + NumPy', 'openpyxl', 'ffmpeg'],
        visual: {
          kind: 'diagram',
          src: '/pautas-pipeline-es.svg',
          alt: 'Pipeline: el video crudo se transcribe y se mide, un motor de diagramación lo combina con el formato del cliente y los retoques del video, y entrega una pauta timecodeada en Excel, guías superpuestas y cuadros de previa.',
          caption: 'Del video crudo a la pauta timecodeada: el formato del cliente es un dato, no código.',
        },
      },
    ],
    contact: {
      eyebrow: 'Contacto',
      heading: 'Disponible para roles de backend, automatización e IA, y para proyectos freelance.',
      github: 'Perfil de GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
  },
}

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem('lang')
  if (stored === 'en' || stored === 'es') return stored
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

function ProjectVisualBlock({ visual }: { visual: ProjectVisual }) {
  if (visual.kind === 'diagram') {
    return (
      <>
        <figure className="diagram">
          <img src={visual.src} alt={visual.alt} />
          <figcaption>{visual.caption}</figcaption>
        </figure>
        {visual.screenshots ? (
          <div className="screenshots__grid">
            {visual.screenshots.map((screenshot) => (
              <figure key={screenshot.src}>
                <img src={screenshot.src} alt={screenshot.alt} />
                <figcaption>{screenshot.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </>
    )
  }

  return (
    <div className="screenshots__grid">
      {visual.items.map((screenshot) => (
        <figure key={screenshot.src}>
          <img src={screenshot.src} alt={screenshot.alt} />
          <figcaption>{screenshot.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function ProjectSection({ project }: { project: Project }) {
  return (
    <section className="section project" aria-labelledby={`${project.id}-title`}>
      <div className="section__header">
        <p className="eyebrow">{project.eyebrow}</p>
        <div className="section__title-row">
          <h2 id={`${project.id}-title`}>{project.title}</h2>
          {project.badge ? <span className="badge">{project.badge}</span> : null}
        </div>
      </div>

      <div className="project__grid">
        <div className="project__summary">
          <p>{project.summary}</p>
          {project.links.length > 0 ? (
            <div className="link-row">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  className="text-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
          {project.note ? <p className="project__note">{project.note}</p> : null}
        </div>

        <div className="problem">
          <h3>{project.problemHeading}</h3>
          <p>{project.problem}</p>
        </div>
      </div>

      <ul className="stack-list">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {project.visual ? <ProjectVisualBlock visual={project.visual} /> : null}
    </section>
  )
}

function App() {
  const [lang, setLang] = useState<Lang>(getInitialLang)
  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = t.htmlLang
    window.localStorage.setItem('lang', lang)
  }, [lang, t.htmlLang])

  const toggleLang = () => setLang((current) => (current === 'en' ? 'es' : 'en'))

  return (
    <main>
      <button
        type="button"
        className="lang-switch"
        onClick={toggleLang}
        aria-label={t.switchAriaLabel}
        title={t.switchAriaLabel}
      >
        <span className={lang === 'en' ? 'lang-switch__active' : ''}>EN</span>
        <span aria-hidden="true" className="lang-switch__divider">/</span>
        <span className={lang === 'es' ? 'lang-switch__active' : ''}>ES</span>
      </button>

      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="hero__copy">{t.hero.copy}</p>
          <div className="hero__actions" aria-label="Primary links">
            <a
              className="button button--primary"
              href="https://github.com/tomascelano-dev"
              target="_blank"
              rel="noreferrer"
            >
              {t.hero.githubBtn}
            </a>
            <a className="button button--secondary" href="#contact">
              {t.hero.contactBtn}
            </a>
          </div>
        </div>
        <div className="hero__preview" aria-label={t.hero.previewLabel}>
          <img src="/screenshots/dashboard.png" alt={t.hero.previewAlt} />
        </div>
      </section>

      {t.projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}

      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 id="contact-title">{t.contact.heading}</h2>
        </div>
        <div className="contact__links">
          <a
            className="button button--primary"
            href="https://github.com/tomascelano-dev"
            target="_blank"
            rel="noreferrer"
          >
            {t.contact.github}
          </a>
          <a
            className="button button--secondary"
            href="https://www.linkedin.com/in/tomas-celano-coronel-891668195/"
            target="_blank"
            rel="noreferrer"
          >
            {t.contact.linkedin}
          </a>
          <a className="button button--secondary" href="mailto:tomasgabrielcelano@gmail.com">
            {t.contact.email}
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
