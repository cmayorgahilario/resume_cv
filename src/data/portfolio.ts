export type Kpi = [string, string];

export interface Experience {
  current?: boolean;
  from: string;
  to: string;
  co: string;
  loc: string;
  role: string;
  desc: string;
  highlights: string[];
  kpis: Kpi[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    current: false,
    from: "Jul 2022",
    to: "Dic 2025",
    co: "Real Plaza",
    loc: "Lima, Perú",
    role: "Tech Lead · Tech Chapter Lead",
    desc: "Liderazgo técnico de equipo de 6 desarrolladores full-stack en plataforma e-commerce de alta transaccionalidad procesando 1M+ requests/día con 99.9% disponibilidad.",
    highlights: [
      "Diseño de arquitecturas de microservicios .NET Core, Java Spring y Node.js",
      "Code reviews obligatorios y mentoría 1:1 mensual",
      "Roadmap técnico trimestral alineado a producto",
      "Adopción de IA con GitHub Copilot y SonarQube ML",
    ],
    kpis: [
      ["+40%", "Velocity"],
      ["−80%", "Bugs"],
      ["92%", "Coverage"],
      ["99.9%", "Uptime"],
    ],
    stack: [
      ".NET Core",
      "Java Spring Boot",
      "Angular 15+",
      "Kafka",
      "Azure",
      "Kubernetes",
    ],
  },
  {
    from: "May 2019",
    to: "Ago 2022",
    co: "Real Plaza",
    loc: "Lima, Perú",
    role: "Technical Product Owner",
    desc: "Implementación desde cero de plataforma e-commerce VTEX y soluciones omnicanal, coordinando equipos multidisciplinarios y stakeholders ejecutivos.",
    highlights: [
      "E-commerce VTEX con integración ERP/CRM",
      "Marketplace unificando múltiples sellers",
      "Click & Collect (online → retiro en mall)",
      "Instore/PDV para equipos en tiendas",
    ],
    kpis: [
      ["3", "Canales"],
      ["0", "Downtime"],
      ["−50%", "T. integración"],
      ["15", "Personas"],
    ],
    stack: ["VTEX", "Scrum", "Product Management"],
  },
  {
    from: "Ene 2018",
    to: "Jul 2018",
    co: "Corporación Aceros Arequipa",
    loc: "Lima, Perú",
    role: "Analista Developer",
    desc: "Migración de sistema Balanced Scorecard legacy (+10 años) a Java Spring Boot + Angular 4 aplicando patrón Strangler Fig.",
    highlights: [
      "APIs REST con Java Spring Boot",
      "Integración Oracle con MyBatis",
      "Migración incremental sin downtime",
      "Optimización de PL/SQL → Java",
    ],
    kpis: [
      ["+500", "Usuarios"],
      ["+70%", "Performance"],
      ["0", "Bugs críticos"],
    ],
    stack: ["Java", "Spring Boot", "Angular 4", "Oracle", "MyBatis"],
  },
  {
    from: "Ago 2017",
    to: "Ene 2018",
    co: "Divemotor",
    loc: "Lima, Perú",
    role: "Software Developer",
    desc: "Desarrollo de sistema de inventarios aplicando Clean Architecture con separación estricta de capas.",
    highlights: [
      "Clean Architecture con capas estrictas",
      "Java Spring (Factory, Strategy, Repository)",
      "Frontend React y AngularJS",
      "Oracle con MyBatis",
    ],
    kpis: [
      ["99.9%", "Uptime"],
      ["−40%", "Complejidad"],
      ["0", "Incidentes"],
    ],
    stack: ["Java Spring", "React", "AngularJS", "Oracle"],
  },
];

export interface Project {
  title: string;
  period: string;
  desc: string;
  results: Kpi[];
  stack: string[];
}

export const projects: Project[] = [
  {
    title: "Integración E-commerce VTEX ↔ Legacy",
    period: "2023-2024",
    desc: "Sincronización tiempo real de +10,000 productos entre VTEX cloud y sistemas CORE on-premise sin downtime.",
    results: [
      ["0", "Downtime"],
      ["99.9%", "Uptime"],
      ["200+", "Prod/seg"],
    ],
    stack: [".NET Core", "Kafka", "Redis", "K8s"],
  },
  {
    title: "Transformación con Inteligencia Artificial",
    period: "2022-2023",
    desc: "GitHub Copilot, SonarQube ML y quality gates automáticos para reducir bugs y acelerar code reviews.",
    results: [
      ["−80%", "Bugs"],
      ["−90%", "T. review"],
      ["92%", "Coverage"],
    ],
    stack: ["Copilot", "SonarQube", "Azure DevOps"],
  },
  {
    title: "Migración Angular 8 → 15+",
    period: "2023",
    desc: "Modernización incremental de 5 apps Angular con standalone components, signals, lazy loading y NgRx.",
    results: [
      ["5", "Apps"],
      ["−40%", "Bundle"],
      ["0", "Downtime"],
    ],
    stack: ["Angular 15", "NgRx", "Jest"],
  },
  {
    title: "Optimización Performance APIs",
    period: "2023",
    desc: "Redis caching, índices compuestos y query optimization para reducir response time de 3s a 300ms.",
    results: [
      ["3s→300ms", "Latencia"],
      ["70%", "Cache hit"],
      ["+25%", "Conversión"],
    ],
    stack: ["PostgreSQL", "Redis", "Kafka"],
  },
];

export type SkillItem = [name: string, years: string, evidence: string, flagship: boolean];

export interface SkillCategory {
  cat: string;
  evidence: string;
  items: SkillItem[];
}

export const skills: SkillCategory[] = [
  {
    cat: "Lenguajes",
    evidence:
      "C#, Java y TypeScript como stack principal en 10+ años de enterprise. PHP/Laravel y Node.js para proyectos personales activos.",
    items: [
      ["C# / .NET", "10y", "12 microservicios en producción", true],
      ["Java", "8y", "Spring Boot en banca y retail", true],
      ["TypeScript", "7y", "", false],
      ["SQL", "10y", "", false],
      ["PHP", "5y", "", false],
      ["Node.js", "5y", "", false],
    ],
  },
  {
    cat: "Backend & APIs",
    evidence:
      "Arquitecturas distribuidas con foco en observabilidad, resiliencia y rendimiento en cargas de 1M+ req/día.",
    items: [
      [".NET Core", "8y", "APIs REST, Minimal APIs, gRPC", true],
      ["Spring Boot", "7y", "Migración monolitos→micros", true],
      ["NestJS", "3y", "", false],
      ["Laravel 7–13", "5y", "", false],
    ],
  },
  {
    cat: "Frontend",
    evidence:
      "Evolución de AngularJS a Angular 15+ standalone. React y Next.js para proyectos personales y dashboards internos.",
    items: [
      ["Angular", "8y", "AngularJS → 15+ standalone + signals", true],
      ["RxJS / NgRx", "5y", "", false],
      ["React", "4y", "", false],
      ["Next.js", "2y", "", false],
    ],
  },
  {
    cat: "Bases de datos",
    evidence:
      "Query tuning, índices compuestos y caching como herramienta de performance. De Oracle legacy a PostgreSQL cloud.",
    items: [
      ["PostgreSQL", "7y", "Optimización 3s→300ms", true],
      ["Redis", "5y", "Cache distribuido, 70% hit rate", true],
      ["SQL Server / MySQL", "10y", "", false],
      ["Oracle / PL/SQL", "6y", "", false],
      ["MongoDB", "3y", "", false],
    ],
  },
  {
    cat: "Cloud & Orquestación",
    evidence:
      "Multi-cloud con Azure como principal. K8s productivo con Helm y GitOps; Docker obligatorio en todo pipeline.",
    items: [
      ["Azure", "6y", "AKS, Service Bus, App Config", true],
      ["Kubernetes", "5y", "AKS productivo con Helm", true],
      ["Docker", "8y", "", false],
      ["AWS", "4y", "", false],
      ["Terraform", "2y", "", false],
    ],
  },
  {
    cat: "Arquitecturas",
    evidence:
      "DDD + Clean Architecture como base para separación de capas. Event-Driven cuando la consistencia final es aceptable.",
    items: [
      ["Microservicios", "7y", "12+ servicios en producción", true],
      ["Event-Driven / CQRS", "5y", "Kafka + event sourcing", true],
      ["Clean Architecture", "7y", "", false],
      ["DDD", "6y", "", false],
    ],
  },
  {
    cat: "Mensajería & Eventos",
    evidence:
      "Kafka como backbone de integración ERP↔e-commerce. Saga pattern para transacciones distribuidas.",
    items: [
      ["Apache Kafka", "4y", "1M+ mensajes/día", true],
      ["Event Sourcing", "4y", "", false],
      ["RabbitMQ", "3y", "", false],
    ],
  },
  {
    cat: "DevOps & Calidad",
    evidence:
      "CI/CD como requisito no negociable. Quality gates automáticos: coverage ≥80%, zero critical SonarQube.",
    items: [
      ["Azure DevOps", "7y", "Pipelines YAML + Boards", true],
      ["SonarQube", "6y", "Quality gates + ML", true],
      ["CI/CD", "8y", "", false],
      ["GitHub Actions", "3y", "", false],
    ],
  },
  {
    cat: "Liderazgo & Agile",
    evidence:
      "Tech Lead de 6 personas. Mentoría 1:1 mensual, roadmap técnico trimestral, facilitación de ceremonias Scrum.",
    items: [
      ["Scrum (CSM)", "7y", "Certified desde 2019", true],
      ["Mentoría", "6y", "Programa 1:1 mensual", true],
      ["Agile Leadership (CAL I)", "4y", "", false],
      ["Gestión de stakeholders", "6y", "", false],
    ],
  },
];

export const certs: [string, string][] = [
  ["Certified Scrum Master (CSM)", "Scrum Alliance · 2019"],
  ["Certified Agile Leadership I (CAL I)", "Scrum Alliance · 2020"],
  ["UX & UI Designer", "Toulouse Lautrec · 2019-2020"],
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  period: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Carlos es de los ingenieros más completos con los que he trabajado. Toma decisiones arquitectónicas con visión de negocio y eleva al equipo técnico sin ego.",
    name: "María Fernanda Solís",
    role: "Head of Engineering",
    company: "Real Plaza",
    period: "2022 — presente",
  },
  {
    quote:
      "Lideró la migración de nuestro monolito a microservicios cumpliendo plazo y con cero downtime. Su capacidad técnica y de mentoría son excepcionales.",
    name: "Jorge Ramírez",
    role: "CTO",
    company: "Interbank Digital",
    period: "2020 — 2022",
  },
  {
    quote:
      "Combina rigor técnico con comunicación clara. Traduce complejidad de sistemas a decisiones de producto que todos los stakeholders entienden.",
    name: "Ana Lucía Chávez",
    role: "VP of Product",
    company: "Rappi Perú",
    period: "2018 — 2020",
  },
];

export const values: { title: string; desc: string }[] = [
  {
    title: "Excelencia técnica",
    desc: "Código limpio, arquitecturas sólidas y estándares elevados. No hay atajos cuando se trata de calidad.",
  },
  {
    title: "Liderazgo ejemplar",
    desc: "Lidero con el ejemplo, mentoreo y desarrollo capacidades. Un buen líder técnico eleva a todo el equipo.",
  },
  {
    title: "Innovación pragmática",
    desc: "Adopto nuevas tecnologías cuando aportan valor real y medible. Innovación con propósito, no por hype.",
  },
  {
    title: "Data-driven",
    desc: "Decisiones basadas en métricas observables. Implemento observabilidad y mido todo.",
  },
];
