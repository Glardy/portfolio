import { NavLink, Route, Routes, Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

const navItems = [
  { to: '/', label: { fr: 'Accueil', en: 'Home' } },
  { to: '/portfolio', label: { fr: 'Portfolio', en: 'Portfolio' } },
  { to: '/blog', label: { fr: 'Blog', en: 'Blog' } },
  { to: '/contact', label: { fr: 'Contact', en: 'Contact' } },
]

const portfolioProjects = [
  {
    title: { fr: 'Tarification assurance', en: 'Insurance pricing' },
    category: { fr: 'Actuariat', en: 'Actuarial' },
    summary: {
      fr: 'Modélisation de portefeuille et analyse de solvabilité pour des scénarios de tarification plus robustes.',
      en: 'Portfolio modeling and solvency analysis to improve pricing resilience and risk decision support.',
    },
    tags: ['Python', 'Risque', 'Data'],
  },
  {
    title: { fr: 'Dashboard risk management', en: 'Risk management dashboard' },
    category: { fr: 'Risk', en: 'Risk' },
    summary: {
      fr: 'Visualisation des principaux indicateurs de risque et des alertes de crise avec un focus décisionnel.',
      en: 'Visualization of key risk indicators and crisis triggers with a sharp decision-making focus.',
    },
    tags: ['Analytics', 'Tableau', 'Finance'],
  },
  {
    title: { fr: 'Prédiction de défaillance', en: 'Default prediction' },
    category: { fr: 'Data Science', en: 'Data Science' },
    summary: {
      fr: 'Étude prédictive pour identifier les signaux d’instabilité et améliorer la qualité des décisions.',
      en: 'Predictive study to detect early instability signals and improve decision quality.',
    },
    tags: ['ML', 'SQL', 'NLP'],
  },
]

const blogPosts = [
  {
    title: { fr: 'Le risque est-il encore une contrainte ou un levier ?', en: 'Is risk still a constraint or a strategic lever?' },
    tag: { fr: 'Actuariat', en: 'Actuarial' },
    excerpt: {
      fr: 'Les entreprises qui appréhendent le risque de manière proactive deviennent plus résilientes et plus lisibles.',
      en: 'Organizations that anticipate risk more proactively become more resilient, measurable, and strategic.',
    },
  },
  {
    title: { fr: 'Comment la data science transforme la finance', en: 'How data science is reshaping finance' },
    tag: { fr: 'Data', en: 'Data' },
    excerpt: {
      fr: 'Les modèles prédictifs aident à informer les décisions de portefeuille et d’allocation des ressources.',
      en: 'Predictive models are helping organizations improve portfolio decisions and smarter capital allocation.',
    },
  },
  {
    title: { fr: 'Solvabilité et prise de décision', en: 'Solvency and strategic decision-making' },
    tag: { fr: 'Finance', en: 'Finance' },
    excerpt: {
      fr: 'Une lecture équilibrée entre contraintes réglementaires et dynamique de croissance durable.',
      en: 'A balanced view between regulatory obligations and long-term sustainable growth ambition.',
    },
  },
]

const translations = {
  fr: {
    nav: 'FR / EN',
    home: 'Accueil',
    portfolio: 'Portfolio',
    blog: 'Blog',
    contact: 'Contact',
    badge: 'Disponible pour des missions',
    heroIntro: 'Actuaire • Risk Management • Data Science',
    heroTitle: 'Je transforme les chiffres en décisions mieux sécurisées.',
    heroText:
      'Je suis un jeune profil passionné par l’actuariat, la gestion des risques et la data. Mon approche combine rigueur analytique, finance et intelligence artificielle appliquée pour mieux piloter les décisions.',
    primaryCta: 'Voir mes projets',
    secondaryCta: 'Mon parcours',
    stat1: 'Master',
    stat2: 'Actuariat & Finance',
    stat3: '3 axes',
    stat4: 'Actuariat, Risk, Data',
    sectionTitle: 'Ce que je mets en avant',
    aboutTitle: 'Un profil jeune, analytique et orienté impact réel.',
    aboutText:
      'Titulaire d’un master en actuariat et finance, je développe des compétences solides en modélisation quantitative, gestion des risques et analyse des données.',
    aboutText2:
      'Je cherche à appliquer ces compétences dans des missions à forte valeur analytique, avec une vraie logique de décision, de performance et de sécurité.',
    metricTitle: 'Expérience & compétences',
    metric1: 'Modélisation',
    metric2: 'Analyse',
    metric3: 'Communication',
    featured: 'Projets phares',
    readMore: 'Voir le projet',
    articlesTitle: 'Derniers articles',
    contactTitle: 'Discutons de votre projet',
    contactText:
      'Je suis ouvert aux missions de data, actuariat, gestion des risques et analyse financière. N’hésitez pas à me contacter.',
    email: 'votrenom@email.com',
    phone: '+33 6 00 00 00 00',
    formName: 'Nom',
    formEmail: 'Email',
    formMessage: 'Message',
    formSubmit: 'Envoyer',
    footer: 'Portfolio professionnel',
    viewAll: 'Voir tous les projets',
    pageTitle: 'Portfolio - Actuaire & Finance',
  },
  en: {
    nav: 'FR / EN',
    home: 'Home',
    portfolio: 'Portfolio',
    blog: 'Blog',
    contact: 'Contact',
    badge: 'Available for projects',
    heroIntro: 'Actuarial • Risk Management • Data Science',
    heroTitle: 'I turn numbers into safer, sharper decisions.',
    heroText:
      'I am a young professional passionate about actuarial science, risk management and data. My approach combines analytical rigor, finance and applied AI to improve decision-making processes.',
    primaryCta: 'See my work',
    secondaryCta: 'My journey',
    stat1: 'Master',
    stat2: 'Actuarial & Finance',
    stat3: '3 pillars',
    stat4: 'Actuarial, Risk, Data',
    sectionTitle: 'What I bring',
    aboutTitle: 'A young profile with a strong analytical and business mindset.',
    aboutText:
      'With a master’s degree in actuarial science and finance, I have developed strong expertise in quantitative modeling, risk management and data analysis.',
    aboutText2:
      'I am focused on applying these skills to high-value analytical missions where decision quality, performance and security matter most.',
    metricTitle: 'Skills & strengths',
    metric1: 'Modeling',
    metric2: 'Analysis',
    metric3: 'Communication',
    featured: 'Featured projects',
    readMore: 'View project',
    articlesTitle: 'Latest articles',
    contactTitle: 'Let’s discuss your project',
    contactText:
      'I am open to data, actuarial, risk and financial analysis opportunities. Feel free to reach out and start a conversation.',
    email: 'yourname@email.com',
    phone: '+33 6 00 00 00 00',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Message',
    formSubmit: 'Send',
    footer: 'Professional portfolio',
    viewAll: 'View all projects',
    pageTitle: 'Portfolio - Actuarial & Finance',
  },
}

function App() {
  const [language, setLanguage] = useState('fr')
  const t = useMemo(() => translations[language], [language])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-emerald-500 font-bold text-slate-900">
              VN
            </span>
            <span className="text-lg font-semibold tracking-tight">Votre Nom</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition hover:text-white ${isActive ? 'text-white' : 'text-slate-300'}`
                }
              >
                {item.label[language]}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle language"
              onClick={() => setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'))}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-teal-300/60 hover:text-white"
            >
              {t.nav}
            </button>
            <Link
              to="/contact"
              className="hidden rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-teal-500/20 transition hover:brightness-110 sm:inline-flex"
            >
              {language === 'fr' ? 'Me contacter' : 'Contact me'}
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage language={language} t={t} />} />
          <Route path="/portfolio" element={<PortfolioPage language={language} t={t} />} />
          <Route path="/blog" element={<BlogPage language={language} t={t} />} />
          <Route path="/contact" element={<ContactPage language={language} t={t} />} />
        </Routes>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-8 text-sm text-slate-400 sm:px-8 lg:flex-row lg:px-10">
          <p>© 2026 — Votre Nom</p>
          <div className="flex gap-5">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            <a href="https://www.github.com" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <a href="https://www.kaggle.com" target="_blank" rel="noreferrer" className="hover:text-white">Kaggle</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function HomePage({ language, t }) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:px-10 lg:pt-16">
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">{t.heroIntro}</p>
          <h1 className="max-w-4xl text-5xl font-black tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t.heroText}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/portfolio"
              className="rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-teal-500/20 transition hover:-translate-y-0.5"
            >
              {t.primaryCta}
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:border-teal-300/60 hover:bg-white/10"
            >
              {t.secondaryCta}
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-3xl font-black tracking-[-0.06em] text-white">&lt;30</div>
              <div className="mt-1 text-sm text-slate-400">{language === 'fr' ? 'ans' : 'years'}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-3xl font-black tracking-[-0.06em] text-white">{t.stat1}</div>
              <div className="mt-1 text-sm text-slate-400">{t.stat2}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-3xl font-black tracking-[-0.06em] text-white">{t.stat3}</div>
              <div className="mt-1 text-sm text-slate-400">{t.stat4}</div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 shadow-2xl shadow-slate-950/30">
          <div className="mb-5 flex justify-end">
            <span className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300">{t.badge}</span>
          </div>

          <div className="flex min-h-[320px] items-end justify-center rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-slate-700/50 via-slate-800/70 to-slate-900">
            <div className="relative mb-6 flex h-48 w-40 items-end justify-center">
              <div className="absolute inset-x-8 bottom-6 h-32 rounded-[32px] bg-gradient-to-b from-sky-200 to-sky-400 opacity-90 shadow-lg shadow-sky-400/20" />
              <div className="absolute top-0 h-20 w-20 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 shadow-inner shadow-amber-300/30" />
              <div className="absolute top-7 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-800" />
              <div className="absolute top-7 left-[40%] h-2 w-2 -translate-x-1/2 rounded-full bg-slate-800" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-slate-400">{t.metric1}</div>
              <div className="mt-1 text-xl font-bold text-white">90%</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-slate-400">{t.metric2}</div>
              <div className="mt-1 text-xl font-bold text-white">92%</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">{t.sectionTitle}</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white sm:text-4xl">{t.aboutTitle}</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-7">
            <p className="text-base leading-8 text-slate-300">{t.aboutText}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-7">
            <p className="text-base leading-8 text-slate-300">{t.aboutText2}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function PortfolioPage({ language, t }) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:px-10">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">Portfolio</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white sm:text-4xl">{t.featured}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {portfolioProjects.map((project, index) => (
          <article key={index} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 transition hover:-translate-y-1 hover:border-teal-300/50">
            <div className={`h-52 bg-gradient-to-br ${
              index % 3 === 0 ? 'from-teal-500/30 via-cyan-500/20 to-slate-900' :
              index % 3 === 1 ? 'from-amber-500/25 via-orange-500/20 to-slate-900' :
              'from-indigo-500/25 via-violet-500/20 to-slate-900'
            }`} />
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                  {project.category[language]}
                </span>
                <span className="text-xs text-slate-400">2026</span>
              </div>
              <h3 className="text-xl font-bold text-white">{project.title[language]}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{project.summary[language]}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to="/contact" className="mt-5 inline-flex text-sm font-semibold text-teal-300 hover:text-teal-200">
                {t.readMore}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function BlogPage({ language, t }) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:px-10">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">Blog</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white sm:text-4xl">{t.articlesTitle}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <article key={index} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60">
            <div className={`h-52 bg-gradient-to-br ${
              index % 3 === 0 ? 'from-teal-500/30 via-sky-500/20 to-slate-900' :
              index % 3 === 1 ? 'from-amber-500/25 via-yellow-500/15 to-slate-900' :
              'from-violet-500/25 via-indigo-500/20 to-slate-900'
            }`} />
            <div className="p-6">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                {post.tag[language]}
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">{post.title[language]}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{post.excerpt[language]}</p>
              <Link to="/contact" className="mt-5 inline-flex text-sm font-semibold text-teal-300 hover:text-teal-200">
                {language === 'fr' ? 'Lire l’article' : 'Read article'}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function ContactPage({ language, t }) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">Contact</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-white sm:text-4xl">{t.contactTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{t.contactText}</p>

          <div className="mt-8 space-y-3 text-base text-slate-200">
            <a href="mailto:votrenom@email.com" className="block hover:text-teal-300">{t.email}</a>
            <a href="tel:+33600000000" className="block hover:text-teal-300">{t.phone}</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="block hover:text-teal-300">LinkedIn</a>
          </div>
        </div>

        <form className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
          <div className="grid gap-5">
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">{t.formName}</span>
              <input type="text" className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-teal-300 focus:outline-none" placeholder={t.formName} />
            </label>
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">{t.formEmail}</span>
              <input type="email" className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-teal-300 focus:outline-none" placeholder={t.formEmail} />
            </label>
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">{t.formMessage}</span>
              <textarea rows="5" className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-teal-300 focus:outline-none" placeholder={t.formMessage} />
            </label>
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 px-5 py-3 font-semibold text-slate-900 shadow-lg shadow-teal-500/20 transition hover:brightness-110">
              {t.formSubmit}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
