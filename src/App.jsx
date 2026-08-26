import { NavLink, Route, Routes, Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const navItems = [
  { to: '/', label: { fr: 'Accueil', en: 'Home' } },
  { to: '/portfolio', label: { fr: 'Portfolio', en: 'Portfolio' } },
  { to: '/blog', label: { fr: 'Blog', en: 'Blog' } },
  { to: '/contact', label: { fr: 'Contact', en: 'Contact' } },
]

const portfolioProjects = [
  {
    title: { fr: 'Tarification assurance', en: 'Insurance pricing model' },
    category: { fr: 'Actuariat', en: 'Actuarial' },
    summary: {
      fr: 'Modélisation de portefeuille et analyse de solvabilité pour des scénarios de tarification plus robustes.',
      en: 'Portfolio modeling and solvency analysis to improve pricing resilience and risk decision support.',
    },
    tags: ['Python', 'Risk', 'Data'],
  },
  {
    title: { fr: 'Dashboard risk management', en: 'Risk management dashboard' },
    category: { fr: 'Risk', en: 'Risk' },
    summary: {
      fr: 'Visualisation des indicateurs de risque clés et des alertes de crise avec un focus décisionnel.',
      en: 'Visualization of key risk indicators and crisis triggers with a sharp decision-making focus.',
    },
    tags: ['Analytics', 'Finance', 'Tableau'],
  },
  {
    title: { fr: 'Prédiction de défaillance', en: 'Default prediction' },
    category: { fr: 'Data Science', en: 'Data Science' },
    summary: {
      fr: 'Étude prédictive pour identifier les signaux d instabilité et améliorer la qualité des décisions.',
      en: 'Predictive study to detect early instability signals and improve decision quality.',
    },
    tags: ['ML', 'SQL', 'NLP'],
  },
]

const blogPosts = [
  {
    id: 1,
    title: { fr: 'Le risque est-il une contrainte ou un levier stratégique ?', en: 'Is risk a constraint or a strategic lever?' },
    category: { fr: 'Actuariat', en: 'Actuarial' },
    date: '2026-07-15',
    excerpt: {
      fr: 'Les organisations qui appréhendent le risque de manière proactive gagnent en résilience et en lisibilité.',
      en: 'Organizations that anticipate risk more proactively become more resilient, measurable, and strategic.',
    },
  },
  {
    id: 2,
    title: { fr: 'Comment la data science transforme la finance', en: 'How data science is reshaping finance' },
    category: { fr: 'Data', en: 'Data' },
    date: '2026-06-10',
    excerpt: {
      fr: 'Les modèles prédictifs aident à informer les décisions de portefeuille et d allocation de ressources.',
      en: 'Predictive models are helping organizations improve portfolio decisions and smarter capital allocation.',
    },
  },
  {
    id: 3,
    title: { fr: 'Solvabilité II et prise de décision stratégique', en: 'Solvency II and strategic decision-making' },
    category: { fr: 'Finance', en: 'Finance' },
    date: '2026-05-22',
    excerpt: {
      fr: 'Une lecture équilibrée entre contraintes réglementaires et dynamique de croissance durable.',
      en: 'A balanced view between regulatory obligations and long-term sustainable growth ambition.',
    },
  },
  {
    id: 4,
    title: { fr: 'Machine learning et détection de fraude en assurance', en: 'Machine learning for insurance fraud detection' },
    category: { fr: 'Data', en: 'Data' },
    date: '2026-04-18',
    excerpt: {
      fr: 'Panorama des méthodes de détection automatisée et de leur applicabilité au secteur assurantiel.',
      en: 'Overview of automated detection methods and their applicability in the insurance sector.',
    },
  },
  {
    id: 5,
    title: { fr: 'Modélisation des queues de distribution en actuariat', en: 'Tail risk modeling in actuarial science' },
    category: { fr: 'Actuariat', en: 'Actuarial' },
    date: '2026-03-05',
    excerpt: {
      fr: 'Approche théorique et pratique des distributions à queues épaisses pour la tarification extrême.',
      en: 'Theoretical and practical approach to heavy-tail distributions for extreme risk pricing.',
    },
  },
  {
    id: 6,
    title: { fr: 'Taux d intérêt bas : impact sur la gestion actif-passif', en: 'Low interest rates: impact on ALM' },
    category: { fr: 'Finance', en: 'Finance' },
    date: '2026-02-14',
    excerpt: {
      fr: 'Comment les compagnies d assurance adaptent leur stratégie d investissement dans un contexte de taux bas.',
      en: 'How insurance companies adapt their investment strategy in a low interest rate environment.',
    },
  },
]

const allCategories = {
  fr: ['Tous', 'Actuariat', 'Data', 'Finance'],
  en: ['All', 'Actuarial', 'Data', 'Finance'],
}

/* ─────────────────────────────────────────
   TRANSLATIONS
───────────────────────────────────────── */
const translations = {
  fr: {
    langToggle: 'EN',
    ctaContact: 'Me contacter',
    badge: 'Disponible pour des missions',
    heroIntro: 'Actuaire — Risk Management — Data Science',
    heroTitle: 'Je transforme les données en décisions financières sécurisées.',
    heroText: 'Jeune professionnel spécialisé en actuariat et finance quantitative, j allier rigueur analytique et vision stratégique pour piloter des décisions plus robustes.',
    primaryCta: 'Voir mes projets',
    secondaryCta: 'Mon parcours',
    stat1Val: '<30', stat1Label: 'ans',
    stat2Val: 'Master', stat2Label: 'Actuariat & Finance',
    stat3Val: '3', stat3Label: 'Domaines de spécialité',
    aboutLabel: 'À propos',
    aboutTitle: 'Un profil analytique orienté impact.',
    aboutText: 'Titulaire d un master en actuariat et finance, je développe une expertise solide en modélisation quantitative, gestion des risques et analyse des données.',
    aboutText2: 'Je recherche des missions à forte valeur analytique où la rigueur, la performance et la sécurité des décisions sont centrales.',
    metric1: 'Modélisation', metric2: 'Analyse',
    portfolioLabel: 'Portfolio',
    portfolioTitle: 'Projets récents',
    readMore: 'Voir le projet',
    blogLabel: 'Blog',
    blogTitle: 'Articles & réflexions',
    blogSearch: 'Rechercher un article…',
    blogFilterLabel: 'Catégorie',
    blogSortLabel: 'Trier par date',
    blogSortNewest: 'Plus récent',
    blogSortOldest: 'Plus ancien',
    blogNoResults: 'Aucun article trouvé.',
    readArticle: 'Lire l article',
    contactLabel: 'Contact',
    contactTitle: 'Échangeons sur votre projet',
    contactText: 'Je suis disponible pour des missions en actuariat, gestion des risques, data science et analyse financière.',
    email: 'votrenom@email.com',
    phone: '+33 6 00 00 00 00',
    formName: 'Nom', formEmail: 'Email', formMessage: 'Message', formSubmit: 'Envoyer',
  },
  en: {
    langToggle: 'FR',
    ctaContact: 'Contact me',
    badge: 'Open to opportunities',
    heroIntro: 'Actuarial — Risk Management — Data Science',
    heroTitle: 'I turn data into safer, sharper financial decisions.',
    heroText: 'Young professional specialized in actuarial science and quantitative finance, combining analytical rigor and strategic thinking to support stronger decisions.',
    primaryCta: 'See my work',
    secondaryCta: 'My journey',
    stat1Val: '<30', stat1Label: 'years old',
    stat2Val: 'Master', stat2Label: 'Actuarial & Finance',
    stat3Val: '3', stat3Label: 'Areas of expertise',
    aboutLabel: 'About',
    aboutTitle: 'An analytical profile focused on impact.',
    aboutText: 'With a master\'s degree in actuarial science and finance, I have built strong expertise in quantitative modeling, risk management and data analysis.',
    aboutText2: 'I am looking for high-value analytical missions where rigor, performance and decision security are key priorities.',
    metric1: 'Modeling', metric2: 'Analysis',
    portfolioLabel: 'Portfolio',
    portfolioTitle: 'Recent projects',
    readMore: 'View project',
    blogLabel: 'Blog',
    blogTitle: 'Articles & insights',
    blogSearch: 'Search articles…',
    blogFilterLabel: 'Category',
    blogSortLabel: 'Sort by date',
    blogSortNewest: 'Newest first',
    blogSortOldest: 'Oldest first',
    blogNoResults: 'No articles found.',
    readArticle: 'Read article',
    contactLabel: 'Contact',
    contactTitle: 'Let\'s discuss your project',
    contactText: 'I am available for actuarial, risk management, data science and financial analysis opportunities.',
    email: 'yourname@email.com',
    phone: '+33 6 00 00 00 00',
    formName: 'Name', formEmail: 'Email', formMessage: 'Message', formSubmit: 'Send',
  },
}

/* ─────────────────────────────────────────
   APP SHELL
───────────────────────────────────────── */
function App() {
  const [language, setLanguage] = useState('fr')
  const t = useMemo(() => translations[language], [language])

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-800 antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white">
              VN
            </span>
            <span className="text-sm font-semibold tracking-tight text-zinc-900">Votre Nom</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-zinc-500 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `transition-colors hover:text-zinc-900 ${isActive ? 'font-medium text-zinc-900' : ''}`
                }
              >
                {item.label[language]}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage((p) => (p === 'fr' ? 'en' : 'fr'))}
              className="rounded border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-800"
            >
              {t.langToggle}
            </button>
            <Link
              to="/contact"
              className="hidden rounded bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700 sm:inline-flex"
            >
              {t.ctaContact}
            </Link>
          </div>
        </div>
      </header>

      {/* PAGES */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage language={language} t={t} />} />
          <Route path="/portfolio" element={<PortfolioPage language={language} t={t} />} />
          <Route path="/blog" element={<BlogPage language={language} t={t} />} />
          <Route path="/contact" element={<ContactPage language={language} t={t} />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-zinc-400 sm:flex-row sm:px-8">
          <p>© 2026 — Votre Nom · Portfolio professionnel</p>
          <div className="flex gap-5">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="transition hover:text-zinc-700">LinkedIn</a>
            <a href="https://www.github.com" target="_blank" rel="noreferrer" className="transition hover:text-zinc-700">GitHub</a>
            <a href="https://www.kaggle.com" target="_blank" rel="noreferrer" className="transition hover:text-zinc-700">Kaggle</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
function HomePage({ language, t }) {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8">
      {/* Hero */}
      <section className="grid items-center gap-14 lg:grid-cols-[1fr_380px]">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-widest text-zinc-400">{t.heroIntro}</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.25rem]">
            {t.heroTitle}
          </h1>
          <p className="mt-5 text-base leading-7 text-zinc-500">{t.heroText}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/portfolio"
              className="rounded bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              {t.primaryCta}
            </Link>
            <Link
              to="/contact"
              className="rounded border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
            >
              {t.secondaryCta}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 border-t border-zinc-100 pt-8">
            {[
              [t.stat1Val, t.stat1Label],
              [t.stat2Val, t.stat2Label],
              [t.stat3Val, t.stat3Label],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold tracking-tight text-zinc-900">{val}</div>
                <div className="mt-0.5 text-xs text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile card */}
        <aside className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">{t.badge}</span>
          </div>

          <div className="mt-6 flex min-h-[220px] items-end justify-center rounded-xl border border-zinc-200 bg-white">
            <div className="relative mb-5 flex h-44 w-36 items-end justify-center">
              <div className="absolute inset-x-6 bottom-4 h-28 rounded-[24px] bg-zinc-200" />
              <div className="absolute top-0 left-1/2 h-[68px] w-[68px] -translate-x-1/2 rounded-full bg-zinc-300" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-zinc-400">{t.metric1}</p>
              <p className="mt-1 text-sm font-semibold text-zinc-800">90 / 100</p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-zinc-400">{t.metric2}</p>
              <p className="mt-1 text-sm font-semibold text-zinc-800">92 / 100</p>
            </div>
          </div>
        </aside>
      </section>

      {/* About */}
      <section className="mt-20 border-t border-zinc-100 pt-16">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">{t.aboutLabel}</p>
        <h2 className="mt-3 max-w-xl text-2xl font-bold tracking-tight text-zinc-900">{t.aboutTitle}</h2>
        <div className="mt-6 grid gap-5 text-sm leading-7 text-zinc-500 lg:grid-cols-2">
          <p>{t.aboutText}</p>
          <p>{t.aboutText2}</p>
        </div>
      </section>
    </div>
  )
}

/* ─────────────────────────────────────────
   PORTFOLIO PAGE
───────────────────────────────────────── */
function PortfolioPage({ language, t }) {
  const colors = [
    'bg-zinc-100',
    'bg-slate-100',
    'bg-stone-100',
  ]
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">{t.portfolioLabel}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">{t.portfolioTitle}</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioProjects.map((project, i) => (
          <article key={i} className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:shadow-md">
            <div className={`h-44 ${colors[i % colors.length]} flex items-center justify-center`}>
              <span className="text-3xl font-black tracking-tight text-zinc-300">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="p-5">
              <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">{project.category[language]}</span>
              <h3 className="mt-1 text-base font-semibold text-zinc-900">{project.title[language]}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{project.summary[language]}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to="/contact" className="mt-4 inline-flex text-xs font-semibold text-zinc-700 underline-offset-2 hover:underline">
                {t.readMore} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   BLOG PAGE
───────────────────────────────────────── */
function BlogPage({ language, t }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(allCategories[language][0])
  const [sortOrder, setSortOrder] = useState('newest')

  const categories = allCategories[language]

  const filtered = useMemo(() => {
    const allCat = categories[0]
    let posts = blogPosts.filter((p) => {
      const matchSearch = p.title[language].toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt[language].toLowerCase().includes(search.toLowerCase())
      const matchCat = category === allCat || p.category[language] === category
      return matchSearch && matchCat
    })
    posts = [...posts].sort((a, b) => {
      return sortOrder === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    })
    return posts
  }, [search, category, sortOrder, language, categories])

  const fmtDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    })

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">{t.blogLabel}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">{t.blogTitle}</h2>

      {/* Toolbar */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.blogSearch}
            className="w-full rounded border border-zinc-300 bg-white py-2.5 pl-9 pr-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">✕</button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded border px-3 py-1.5 text-xs font-medium transition ${
                category === cat
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400 hover:text-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Date sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded border border-zinc-300 bg-white px-3 py-2.5 text-xs text-zinc-600 focus:border-zinc-500 focus:outline-none"
        >
          <option value="newest">{t.blogSortNewest}</option>
          <option value="oldest">{t.blogSortOldest}</option>
        </select>
      </div>

      {/* Count */}
      <p className="mt-4 text-xs text-zinc-400">
        {filtered.length} {language === 'fr' ? 'article' + (filtered.length > 1 ? 's' : '') : 'article' + (filtered.length > 1 ? 's' : '')}
      </p>

      {/* Articles */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-sm text-zinc-400">{t.blogNoResults}</p>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article key={post.id} className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:shadow-md">
              <div className="h-36 bg-zinc-50 flex items-end justify-between p-4">
                <span className="rounded border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                  {post.category[language]}
                </span>
                <span className="text-[10px] text-zinc-400">{fmtDate(post.date)}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-sm font-semibold leading-snug text-zinc-900">{post.title[language]}</h3>
                <p className="mt-2 flex-1 text-xs leading-5 text-zinc-500">{post.excerpt[language]}</p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex text-xs font-semibold text-zinc-700 underline-offset-2 hover:underline"
                >
                  {t.readArticle} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────── */
function ContactPage({ language, t }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    e.target.reset()
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8">
      <div className="grid gap-14 lg:grid-cols-[1fr_480px]">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">{t.contactLabel}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">{t.contactTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-500">{t.contactText}</p>

          <div className="mt-8 space-y-2 text-sm">
            <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-zinc-600 transition hover:text-zinc-900">
              <span className="text-zinc-300">→</span>{t.email}
            </a>
            <a href={`tel:${t.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-zinc-600 transition hover:text-zinc-900">
              <span className="text-zinc-300">→</span>{t.phone}
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-600 transition hover:text-zinc-900">
              <span className="text-zinc-300">→</span>LinkedIn
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
          <div className="grid gap-4">
            <label className="block text-xs font-medium text-zinc-600">
              {t.formName}
              <input type="text" required className="mt-1.5 w-full rounded border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none" placeholder={t.formName} />
            </label>
            <label className="block text-xs font-medium text-zinc-600">
              {t.formEmail}
              <input type="email" required className="mt-1.5 w-full rounded border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none" placeholder={t.formEmail} />
            </label>
            <label className="block text-xs font-medium text-zinc-600">
              {t.formMessage}
              <textarea rows="5" required className="mt-1.5 w-full rounded border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none" placeholder={t.formMessage} />
            </label>
            <button
              type="submit"
              className="mt-1 rounded bg-zinc-900 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              {submitted ? (language === 'fr' ? 'Message envoyé ✓' : 'Message sent ✓') : t.formSubmit}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
