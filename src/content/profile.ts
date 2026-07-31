import type { Profile } from './types'

/**
 * Fonte única dos teus dados pessoais.
 * Edita este ficheiro (ou partilha a info no chat) para actualizar todo o portfólio.
 */
export const profile: Profile = {
  name: 'Miguel Bento',
  siteName: 'theorylab',
  headline: 'Estudante de Engenharia e Ciência dos Computadores · ISUTC',
  role: 'Estudante de Engenharia e Ciência dos Computadores · ISUTC',
  bio: 'Estudante na ISUTC com experiência em desenvolvimento web, WordPress e suporte técnico. Especializado em projetos full-stack em produção — de e-commerce a apps PWA — com base sólida em redes, hardware e trabalho em equipa.',
  contactMessage:
    'Se este percurso chamou a atenção, escreve-me ou liga. Gosto de começar pelos problemas que valem a pena resolver.',
  metaDescription:
    'Miguel Bento — Engenharia e Ciência dos Computadores (ISUTC, Maputo). Desenvolvimento web, WordPress e projetos full-stack.',

  links: {
    email: 'miguelbento012@gmail.com',
    github: 'github.com/Miguel-Bent',
    linkedin: 'linkedin.com/in/miguel-bento012',
    location: 'Maputo, Magoanine — Moçambique',
    phone: '+258 843 969 752',
  },

  languages: [
    { name: 'Português', level: 'Nativo' },
    { name: 'Inglês', level: 'Intermediário' },
  ],

  softSkills: [
    'Inteligência emocional',
    'Comunicação assertiva',
    'Proatividade na resolução de problemas',
    'Trabalho colaborativo em equipas multidisciplinares',
  ],

  education: [
    {
      school: 'ISUTC — Instituto Superior de Transportes e Comunicações',
      degree: 'Licenciatura em Engenharia e Ciência dos Computadores',
      when: 'Fev 2025 —',
      text: 'Em curso, Maputo.',
    },
    {
      school: 'ISUTC / ITC',
      degree: 'Certificação em Programação de Aplicações Web',
      when: '2023 — 2024',
    },
    {
      school: 'ISUTC / ITC',
      degree: 'Certificação em Suporte Informático',
      when: '2022 — 2023',
    },
    {
      school: 'ISUTC / ITC',
      degree: 'Certificação em Eletricidade Industrial',
      when: '2021 — 2022',
      text: 'Quadros de distribuição, controladores lógicos e instalações em baixa tensão.',
    },
  ],

  timeline: [
    {
      yr: 'Nov 2023',
      title: 'Estágio · Electricidade de Moçambique',
      text: 'Suporte informático — manutenção de hardware e software, redes LAN/Wi-Fi e apoio ao utilizador final.',
    },
    {
      yr: 'Nov 2024',
      title: 'Estágio · CIUEM',
      text: 'Migração Joomla → WordPress, desenvolvimento com Elementor, SmartSlider e Mega Menu. Protótipos em Figma e Adobe XD.',
    },
    {
      yr: 'Fev 2025',
      title: 'ISUTC · Engenharia e Ciência dos Computadores',
      text: 'Início da licenciatura em Fevereiro de 2025, em Maputo.',
    },
    {
      yr: '30 Mai 2026',
      title: 'Gestão Financeira Pessoal',
      text: 'Lançamento do app full-stack com JWT, orçamentos, importação CSV/Excel, exportação PDF e deploy em Vercel + Railway.',
    },
    {
      yr: '04 Jul 2026',
      title: 'AjudaCheia · The Pseudocoders',
      text: 'Primeiro hackathon com a equipa The Pseudocoders — Cursor Hackathon da bitAfrica. Projeto vencedor na categoria SOS/Reunião: app mobile-first para cheias em Moçambique, com PWA offline.',
      featured: true,
      award: 'The Pseudocoders',
    },
    {
      yr: '13 Jul 2026',
      title: 'Your Glow',
      text: 'E-commerce de skincare em Maputo para cliente real: loja pública, checkout por WhatsApp, API Node.js/Express, PostgreSQL e painel administrativo.',
    },
    {
      yr: '26 Jul 2026',
      title: 'BioBantu Platform',
      text: 'MVP institucional para a BioBantu-258 — bioinsumos, agricultura sustentável e visão de plataforma modular API-first.',
    },
    {
      yr: '30 Jul 2026',
      title: 'TheoryLab',
      text: 'Portfólio interactivo com grafo de 11 nós, pathfinding (Dijkstra, A*, BFS), autômatos e CS Lab — este site.',
    },
  ],

  experience: [
    {
      role: 'Vencedor · Hackathon',
      org: 'The Pseudocoders — bitAfrica × Cursor',
      when: '04 Jul 2026',
      text: 'Primeiro hackathon com a equipa The Pseudocoders. Vitória na categoria SOS/Reunião com AjudaCheia — app mobile-first, PWA offline e fluxos de SOS, voluntariado e reencontro familiar.',
      featured: true,
      award: 'The Pseudocoders',
    },
    {
      role: 'Desenvolvedor Web',
      org: 'Projetos pessoais e clientes',
      when: '2026 —',
      text: 'Your Glow, Finanças Pessoais, BioBantu, AjudaCheia e TheoryLab — sites e apps full-stack em produção.',
    },
    {
      role: 'Estudante',
      org: 'ISUTC · Engenharia e Ciência dos Computadores',
      when: 'Fev 2025 —',
      text: 'Licenciatura em curso, Maputo.',
    },
    {
      role: 'Estágio · Programação Web',
      org: 'CIUEM',
      when: 'Nov 2024 — Fev 2025',
      text: 'Migração de plataformas Joomla para WordPress. Elementor, SmartSlider, Mega Menu. Protótipos em Figma e Adobe XD. Capacitação da equipa em CMS.',
    },
    {
      role: 'Estágio · Suporte Informático',
      org: 'Electricidade de Moçambique, E.P.',
      when: 'Nov 2023 — Jan 2024',
      text: 'Manutenção preventiva e corretiva de hardware e software. Redes LAN, Wi-Fi e servidores. Suporte ao utilizador e instalação de sistemas operativos.',
    },
  ],

  projects: [
    {
      id: 'financas',
      name: 'Gestão Financeira Pessoal',
      tags: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Prisma'],
      desc: 'App full-stack para registar, analisar e planear finanças pessoais e de negócio — autenticação JWT, orçamentos, importação CSV/Excel, exportação PDF, espaços Pessoal | Negócio e dark mode.',
      status: 'live',
      url: 'financas-pessoais-nine-self.vercel.app',
      repo: 'github.com/Miguel-Bent/financas_pessoais',
    },
    {
      id: 'yourglow',
      name: 'Your Glow',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'E-commerce'],
      desc: 'Loja de skincare e autocuidado em Maputo. O cliente monta o carrinho no site e fecha por WhatsApp; painel admin para catálogo, cupões e pedidos.',
      status: 'live',
      url: 'yourglow.me',
    },
    {
      id: 'biobantu',
      name: 'BioBantu Platform',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      desc: 'Plataforma institucional modular para a BioBantu-258 — bioinsumos, agricultura sustentável e inovação agroindustrial em Moçambique. MVP com website público e roadmap API-first.',
      status: 'live',
      url: 'biobantu.vercel.app',
    },
    {
      id: 'ajudacheia',
      name: 'AjudaCheia',
      tags: ['PWA', 'React', 'Mobile-first', 'The Pseudocoders', 'bitAfrica', 'Cursor'],
      desc: 'O meu primeiro hackathon com a equipa The Pseudocoders — Cursor Hackathon da bitAfrica, onde ganhámos. App mobile-first de resposta às cheias em Moçambique: SOS, rede de voluntários, reencontro familiar e modo offline.',
      status: 'live',
      url: 'ajuda-cheia.vercel.app',
      featured: true,
      award: 'The Pseudocoders',
    },
    {
      id: 'theorylab',
      name: 'TheoryLab',
      tags: ['TypeScript', 'React', 'Vite', 'Zustand', 'Framer Motion'],
      desc: 'Este portfólio — grafo de 11 nós, pathfinding (Dijkstra, A*, BFS), autômatos DFA/PDA/TM, CS Lab e revelação progressiva do mapa.',
      status: 'wip',
    },
  ],

  skills: [
    { id: 'js', name: 'JavaScript', lvl: 4, links: ['ts', 'php', 'react'] },
    { id: 'ts', name: 'TypeScript', lvl: 4, links: ['js', 'react', 'node'] },
    { id: 'java', name: 'Java', lvl: 3, links: ['js'] },
    { id: 'php', name: 'PHP', lvl: 4, links: ['wordpress', 'sql'] },
    { id: 'react', name: 'React', lvl: 4, links: ['ts', 'js', 'vite'] },
    { id: 'next', name: 'Next.js', lvl: 3, links: ['react', 'ts'] },
    { id: 'wordpress', name: 'WordPress', lvl: 4, links: ['php', 'htmlcss'] },
    { id: 'htmlcss', name: 'HTML / CSS', lvl: 4, links: ['js', 'wordpress', 'tailwind'] },
    { id: 'node', name: 'Node.js', lvl: 4, links: ['express', 'ts'] },
    { id: 'express', name: 'Express', lvl: 4, links: ['node', 'postgres'] },
    { id: 'sql', name: 'SQL', lvl: 4, links: ['postgres', 'prisma'] },
    { id: 'postgres', name: 'PostgreSQL', lvl: 4, links: ['sql', 'prisma', 'node'] },
    { id: 'prisma', name: 'Prisma', lvl: 3, links: ['postgres', 'node'] },
    { id: 'vite', name: 'Vite', lvl: 4, links: ['react', 'ts'] },
    { id: 'tailwind', name: 'Tailwind CSS', lvl: 4, links: ['react', 'htmlcss'] },
    { id: 'figma', name: 'Figma', lvl: 3, links: ['xd', 'htmlcss'] },
    { id: 'xd', name: 'Adobe XD', lvl: 3, links: ['figma'] },
    { id: 'git', name: 'Git / GitHub', lvl: 4, links: ['vercel', 'railway'] },
    { id: 'vercel', name: 'Vercel', lvl: 4, links: ['react', 'next'] },
    { id: 'railway', name: 'Railway', lvl: 3, links: ['node', 'postgres'] },
    { id: 'pwa', name: 'PWA / Offline', lvl: 3, links: ['react', 'js'] },
    { id: 'networks', name: 'Redes & Infraestrutura', lvl: 3, links: ['hardware'] },
    { id: 'hardware', name: 'Hardware & Suporte TI', lvl: 3, links: ['networks'] },
  ],
}

export const profileNameBoot = profile.name.toUpperCase()
