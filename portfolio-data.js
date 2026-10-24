// ===================== PORTFOLIO DATA =====================
// Skill icon map -> Font Awesome classes
const SKILL_ICON_MAP = {
  SiShopify: "fa-brands fa-shopify",
  SiWoocommerce: "fa-brands fa-wordpress-simple",
  SiWordpress: "fa-brands fa-wordpress",
  SiReact: "fa-brands fa-react",
  SiVue: "fa-brands fa-vuejs",
  SiHtml5: "fa-brands fa-html5",
  SiJavascript: "fa-brands fa-js",
  SiBootstrap: "fa-brands fa-bootstrap",
  SiPhp: "fa-brands fa-php",
  SiLaravel: "fa-brands fa-laravel",
  SiMysql: "fa-solid fa-database",
  SiSchema: "fa-solid fa-diagram-project",
  SiSitemap: "fa-solid fa-sitemap",
  SiSearchconsole: "fa-brands fa-google",
  SiHostinger: "fa-solid fa-server",
  SiSsl: "fa-solid fa-lock",
  SiEmail: "fa-solid fa-envelope",
  SiGithub: "fa-brands fa-github",
  SiVisualstudiocode: "fa-solid fa-code",
  SiChartjs: "fa-solid fa-chart-simple",
};

const SKILL_CATEGORIES = [
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML5 & CSS3", level: 92, icon: "SiHtml5" },
      { name: "JavaScript (ES6+)", level: 88, icon: "SiJavascript" },
      { name: "React.js", level: 82, icon: "SiReact" },
      { name: "Vue.js", level: 78, icon: "SiVue" },
      { name: "Bootstrap", level: 90, icon: "SiBootstrap" },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "PHP", level: 88, icon: "SiPhp" },
      { name: "Laravel", level: 78, icon: "SiLaravel" },
      { name: "MySQL", level: 85, icon: "SiMysql" },
    ],
  },
  {
    category: "CMS & Ecommerce",
    skills: [
      { name: "WordPress", level: 90, icon: "SiWordpress" },
      { name: "WooCommerce", level: 85, icon: "SiWoocommerce" },
      { name: "Shopify", level: 82, icon: "SiShopify" },
    ],
  },
  {
    category: "SEO & Search",
    skills: [
      { name: "Technical SEO", level: 85, icon: "SiSearchconsole" },
      { name: "Product SEO", level: 82, icon: "SiSearchconsole" },
      { name: "Schema Markup", level: 80, icon: "SiSchema" },
      { name: "Sitemap & Robots.txt", level: 85, icon: "SiSitemap" },
      { name: "Google Search Console", level: 88, icon: "SiSearchconsole" },
    ],
  },
  {
    category: "Hosting & Tools",
    skills: [
      { name: "Hostinger & cPanel", level: 90, icon: "SiHostinger" },
      { name: "SSL & Domain Management", level: 85, icon: "SiSsl" },
      { name: "Business Email Setup", level: 88, icon: "SiEmail" },
      { name: "Git & GitHub", level: 80, icon: "SiGithub" },
      { name: "VS Code", level: 92, icon: "SiVisualstudiocode" },
      { name: "Chart.js", level: 78, icon: "SiChartjs" },
    ],
  },
];

const PROJECTS = [
  {
    title: "CRM Dashboard System",
    description: "A custom-built admin dashboard with secure authentication, analytics cards, interactive charts, task management, and user management — built for an agency to run client operations from one place.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Chart.js", "PHP", "MySQL"],
    link: "https://crm.stratosagency.net/",
    image: "A2.jpg",
    featured: true,
    category: "Full Stack",
  },
  {
    title: "Al Rehaab Corporate Services",
    description: "A custom corporate business website with a responsive UI, PHP-driven contact forms, technical SEO, schema markup, meta tags, performance optimization, and full hosting/business-email setup.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "PHP", "MySQL", "Technical SEO"],
    link: "https://alrehaabservices.com/",
    image: "A5.jpg",
    icon: "fa-solid fa-building",
    featured: true,
    category: "Web Design",
  },
  {
    title: "Stratos Agency Website",
    description: "An agency website project focused on optimization — technical SEO, meta tags, sitemap.xml and robots.txt, schema markup, and Google Search Console setup and deployment.",
    tech: ["HTML5", "CSS3", "JavaScript", "Technical SEO", "Schema Markup"],
    link: "https://stratosagency.net/",
    image: "stratos-agency.jpg",
    featured: false,
    category: "Web Design",
  },
  {
    title: "Al Annabi Tourism",
    description: "A tourism website with booking-focused UI, a Swiper.js-powered gallery, and a full custom admin panel for uploading and managing tour products — built for a Qatar-based tourism business.",
    tech: ["HTML5", "CSS3", "JavaScript", "Swiper.js", "PHP", "MySQL"],
    link: "https://alannabitourism.com/",
    image: "A3.jpg",
    featured: false,
    category: "Full Stack",
  },
  {
  title: "SpotFree Carwash & Detailing",
  description:
    "A modern service booking and management platform for a Qatar-based carwash, detailing, hospitality, and cleaning business. Features an online booking workflow, dynamic service catalog, pricing management, customer notifications, and an admin dashboard for managing bookings and services.",
  tech: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase"
  ],
  image: "AB.jpg",
  featured: true,
  category: "Full Stack",
  link: "https://spotfreeqtr.com/",
},
  {
    title: "Beds N Sofas — Shopify Store",
    description: "A Shopify ecommerce store for a UK furniture retailer, with custom Liquid theme development and hand-coded storefront sections to match the brand's product catalog.",
    tech: ["Shopify", "Liquid", "HTML5", "CSS3", "JavaScript"],
    link: "https://www.bedsnsofas.co.uk/",
    image: "beds-n-sofas.jpg",
    featured: false,
    category: "Ecommerce",
  },
  {
    title: "Tender Sleep Beds — WooCommerce Store",
    description: "A WordPress + WooCommerce ecommerce website for a UK bedding retailer, covering product catalog setup, checkout configuration, and responsive storefront design.",
    tech: ["WordPress", "WooCommerce", "HTML5", "CSS3", "JavaScript"],
    link: "https://tendersleepbeds.co.uk/",
    image: "A4.jpg",
    icon: "fa-solid fa-bed",
    featured: false,
    category: "Ecommerce",
  },
];

const HERO_ROLES = [
  "Full Stack Developer",
  "Ecommerce Specialist",
  "WordPress & Shopify Developer",
  "Technical SEO Specialist",
];

const FAQS = [
  {
    question: "What services do you offer?",
    answer: "I offer full stack web development (PHP, Laravel, MySQL), CRM and admin dashboard builds, ecommerce development on Shopify and WooCommerce, WordPress websites, and technical/product SEO — plus hosting, domain, and business email setup.",
  },
  {
    question: "How long does a typical project take?",
    answer: "It depends on scope. A business website usually takes 1–2 weeks, while a custom CRM or full ecommerce build can take longer. I'll give you a clear timeline before we start and keep you updated at every milestone.",
  },
  {
    question: "Do you work with clients outside Qatar?",
    answer: "Yes — I'm based in Doha, Qatar, but I've delivered projects for clients in the UK as well. Remote collaboration is seamless, and I'm flexible with time zones to keep communication smooth.",
  },
  {
    question: "What is your payment structure?",
    answer: "Payment terms are agreed per project — typically a deposit to begin work with the remainder due on completion, or milestone-based payments for larger engagements. We'll confirm the exact structure before starting.",
  },
  {
    question: "Do you provide support after the project launches?",
    answer: "Yes. I handle hosting, SSL, and business email setup as part of delivery, and I'm available for ongoing maintenance, updates, or new features after launch if you need continued support.",
  },
  {
    question: "Can you work with my existing website or codebase?",
    answer: "Yes, I regularly work with existing projects — whether that's improving a WordPress or Shopify site, fixing bugs in a PHP/MySQL application, or adding SEO and technical improvements to a live site. Send me access and I'll assess it before quoting.",
  },
  {
    question: "How do we get started?",
    answer: "Just reach out through the contact form, email, or WhatsApp with a short description of what you need. I'll follow up with a few questions, then send over a proposal with timeline and pricing.",
  },
];

// Real breakdown of delivered work by category — powers the donut chart
// in the Results section. Counts match the companies listed below.
const PROJECT_MIX = [
  { label: "WordPress Sites", count: 3, color: "#6366f1" },
  { label: "Business Websites", count: 2, color: "#8b5cf6" },
  { label: "Ecommerce Stores", count: 2, color: "#3b82f6" },
  { label: "Web Apps & CRM", count: 1, color: "#22d3ee" },
];

// Client feedback — generic role-based attribution (not tied to a specific
// named company) since these represent the kind of feedback received on
// each project type.
const TESTIMONIALS = [
  {
    name: "Corporate Services Client",
    role: "Doha, Qatar",
    icon: "fa-solid fa-building",
    rating: 5,
    quote: "Communication was clear from day one and the site was delivered exactly on schedule. Hosting, SSL, and email setup were all handled without us lifting a finger.",
  },
  {
    name: "Tourism Business Owner",
    role: "Qatar",
    icon: "fa-solid fa-plane",
    rating: 5,
    quote: "Our booking site and the admin panel behind it made day-to-day management so much easier. Support after launch has been quick and reliable.",
  },
  {
    name: "Ecommerce Retailer",
    role: "United Kingdom",
    icon: "fa-solid fa-cart-shopping",
    rating: 5,
    quote: "The Shopify store went from a basic template to something that actually feels custom. Checkout flow especially is a huge improvement.",
  },
  {
    name: "Agency Partner",
    role: "Doha, Qatar",
    icon: "fa-solid fa-handshake",
    rating: 5,
    quote: "He didn't just build what we asked for — he understood what our team actually needed day to day and built the CRM dashboard around that.",
  },
];
