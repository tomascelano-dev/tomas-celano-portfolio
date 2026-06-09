import './App.css'

const stack = [
  '.NET 8 Web API',
  'PostgreSQL',
  'Entity Framework Core',
  'Docker Compose',
  'JWT Authentication',
  'React + TypeScript',
  'Clean Architecture',
  'Backend tests',
]

const screenshots = [
  {
    src: '/screenshots/dashboard.png',
    alt: 'RepairShop dashboard with operational metrics',
    label: 'Dashboard',
  },
  {
    src: '/screenshots/orders.png',
    alt: 'Repair orders list and management view',
    label: 'Repair Orders',
  },
  {
    src: '/screenshots/inventory.png',
    alt: 'Inventory management table',
    label: 'Inventory',
  },
  {
    src: '/screenshots/login.png',
    alt: 'RepairShop login screen',
    label: 'Authentication',
  },
]

function App() {
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Tomas Celano</p>
          <h1>Automation / Backend / Fullstack Jr Developer</h1>
          <p className="hero__copy">
            I build internal tools, APIs and automation systems that help
            businesses organize workflows, reduce manual work and manage
            operational data.
          </p>
          <div className="hero__actions" aria-label="Primary links">
            <a
              className="button button--primary"
              href="https://github.com/tomasgabrielcelano-debug"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub Profile
            </a>
            <a className="button button--secondary" href="#contact">
              Contact
            </a>
          </div>
        </div>
        <div className="hero__preview" aria-label="Featured project preview">
          <img
            src="/screenshots/dashboard.png"
            alt="RepairShop Management System dashboard preview"
          />
        </div>
      </section>

      <section className="section project" aria-labelledby="project-title">
        <div className="section__header">
          <p className="eyebrow">Featured Project</p>
          <h2 id="project-title">RepairShop Management System</h2>
        </div>
        <div className="project__grid">
          <div className="project__summary">
            <p>
              Full-stack internal management system for repair shops to manage
              customers, devices, repair orders, inventory, payments, status
              history and message templates.
            </p>
            <div className="link-row">
              <a
                className="text-link"
                href="https://github.com/tomasgabrielcelano-debug/repair-shop-management-system"
                target="_blank"
                rel="noreferrer"
              >
                View Repository
              </a>
              <a
                className="text-link"
                href="https://app.techxto.ar"
                target="_blank"
                rel="noreferrer"
              >
                View Live App
              </a>
            </div>
          </div>

          <div className="problem">
            <h3>What problem it solves</h3>
            <p>
              Repair shops need a reliable way to track customers, device
              intake, order status, stock, payments and operational history in
              one place. RepairShop centralizes that workflow so teams can
              reduce manual tracking, keep data consistent and follow each
              repair from entry to delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="stack-title">
        <div className="section__header">
          <p className="eyebrow">Stack</p>
          <h2 id="stack-title">Built with production-oriented tools</h2>
        </div>
        <ul className="stack-list">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section screenshots" aria-labelledby="screens-title">
        <div className="section__header">
          <p className="eyebrow">Screenshots</p>
          <h2 id="screens-title">Core product views</h2>
        </div>
        <div className="screenshots__grid">
          {screenshots.map((screenshot) => (
            <figure key={screenshot.src}>
              <img src={screenshot.src} alt={screenshot.alt} />
              <figcaption>{screenshot.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Available for junior backend, automation and fullstack roles.</h2>
        </div>
        <div className="contact__links">
          <a
            className="button button--primary"
            href="https://github.com/tomasgabrielcelano-debug"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Profile
          </a>
          <a
            className="button button--secondary"
            href="https://www.linkedin.com/in/tomas-celano-coronel-891668195/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="button button--secondary"
            href="mailto:tomasgabrielcelano@gmail.com"
          >
            Email
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
