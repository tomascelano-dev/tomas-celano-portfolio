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
  | { kind: 'diagram'; src: string; alt: string; caption: string }

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
  visual: ProjectVisual
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
      title: 'Automation / Backend / Fullstack Jr Developer',
      copy: 'I build internal tools, APIs and automation systems that help businesses organize workflows, reduce manual work and manage operational data. Two of them run in production today.',
      githubBtn: 'View GitHub Profile',
      contactBtn: 'Contact',
      previewAlt: 'RepairShop Management System dashboard preview',
      previewLabel: 'Featured project preview',
    },
    projects: [
      {
        id: 'repairshop',
        eyebrow: 'Featured Project',
        title: 'RepairShop Management System',
        summary:
          'Full-stack internal management system for repair shops to manage customers, devices, repair orders, inventory, payments, status history and message templates.',
        problemHeading: 'What problem it solves',
        problem:
          'Repair shops need a reliable way to track customers, device intake, order status, stock, payments and operational history in one place. RepairShop centralizes that workflow so teams can reduce manual tracking, keep data consistent and follow each repair from entry to delivery.',
        links: [
          {
            label: 'View Repository',
            href: 'https://github.com/tomascelano-dev/repair-shop-management-system',
          },
          { label: 'View Live App', href: 'https://app.techxto.ar' },
        ],
        stack: [
          '.NET 8 Web API',
          'PostgreSQL',
          'Entity Framework Core',
          'Docker Compose',
          'JWT Authentication',
          'React + TypeScript',
          'Clean Architecture',
          'Backend tests',
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
        id: 'leadpipeline',
        eyebrow: 'Project',
        badge: 'In production',
        title: 'LeadPipeline',
        summary:
          'Lead capture and CRM engine for businesses that sell and support over WhatsApp and Instagram. It ingests every inbound message, auto-classifies intent and lead status, schedules follow-ups, and reports purchase conversions back to Meta Ads.',
        problemHeading: 'What problem it solves',
        problem:
          'A business that sells over WhatsApp and Instagram loses money two ways: messages pile up with no order so hot leads go cold, and ad spend is optimized blindly because Meta only sees clicks, not who actually bought. LeadPipeline ingests and classifies every message, schedules automatic follow-ups, and sends server-side conversions back to Meta — with ad attribution — so the algorithm learns to find real buyers.',
        links: [],
        note: 'Running in production for a real business. Source is private (Meta tokens, secrets and customer data), so the repository is not public.',
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
        },
      },
    ],
    contact: {
      eyebrow: 'Contact',
      heading: 'Available for junior backend, automation and fullstack roles.',
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
      title: 'Desarrollador Jr de Automatización / Backend / Fullstack',
      copy: 'Construyo herramientas internas, APIs y sistemas de automatización que ayudan a los negocios a ordenar sus flujos de trabajo, reducir el trabajo manual y gestionar datos operativos. Dos de ellos hoy están en producción.',
      githubBtn: 'Ver perfil de GitHub',
      contactBtn: 'Contacto',
      previewAlt: 'Vista previa del dashboard de RepairShop Management System',
      previewLabel: 'Vista previa del proyecto destacado',
    },
    projects: [
      {
        id: 'repairshop',
        eyebrow: 'Proyecto destacado',
        title: 'RepairShop Management System',
        summary:
          'Sistema de gestión interno full-stack para casas de reparación: gestiona clientes, equipos, órdenes de reparación, inventario, pagos, historial de estados y plantillas de mensajes.',
        problemHeading: 'Qué problema resuelve',
        problem:
          'Las casas de reparación necesitan una forma confiable de seguir clientes, ingreso de equipos, estado de órdenes, stock, pagos e historial operativo en un solo lugar. RepairShop centraliza ese flujo para que el equipo reduzca el seguimiento manual, mantenga los datos consistentes y siga cada reparación desde el ingreso hasta la entrega.',
        links: [
          {
            label: 'Ver repositorio',
            href: 'https://github.com/tomascelano-dev/repair-shop-management-system',
          },
          { label: 'Ver app en vivo', href: 'https://app.techxto.ar' },
        ],
        stack: [
          '.NET 8 Web API',
          'PostgreSQL',
          'Entity Framework Core',
          'Docker Compose',
          'Autenticación JWT',
          'React + TypeScript',
          'Clean Architecture',
          'Tests de backend',
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
        id: 'leadpipeline',
        eyebrow: 'Proyecto',
        badge: 'En producción',
        title: 'LeadPipeline',
        summary:
          'Motor de captura de leads y CRM para negocios que venden y atienden por WhatsApp e Instagram. Ingiere cada mensaje entrante, clasifica automáticamente la intención y el estado del lead, agenda follow-ups y reporta las conversiones de compra de vuelta a Meta Ads.',
        problemHeading: 'Qué problema resuelve',
        problem:
          'Un negocio que vende por WhatsApp e Instagram pierde plata de dos maneras: los mensajes se amontonan sin orden y los leads calientes se enfrían, y la inversión en ads se optimiza a ciegas porque Meta solo ve clicks, no quién terminó comprando. LeadPipeline ingiere y clasifica cada mensaje, agenda follow-ups automáticos y envía conversiones server-side a Meta —con atribución del anuncio— para que el algoritmo aprenda a buscar compradores reales.',
        links: [],
        note: 'En producción para un negocio real. El código es privado (tokens de Meta, secrets y datos de clientes), por eso el repositorio no es público.',
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
        },
      },
    ],
    contact: {
      eyebrow: 'Contacto',
      heading: 'Disponible para roles junior de backend, automatización y fullstack.',
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
      <figure className="diagram">
        <img src={visual.src} alt={visual.alt} />
        <figcaption>{visual.caption}</figcaption>
      </figure>
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

      <ProjectVisualBlock visual={project.visual} />
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
