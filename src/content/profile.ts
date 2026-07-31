import type { Profile } from './types'

/**
 * Fonte única dos teus dados pessoais.
 * Edita este ficheiro (ou partilha a info no chat) para actualizar todo o portfólio.
 */
export const profile: Profile = {
  name: 'Miguel Bento',
  siteName: 'theorylab',
  headline: 'Full Stack · Next.js, NestJS, PostgreSQL · WordPress',
  role: 'Full Stack Developer',
  bio: 'Construo apps e sites em produção — do checkout por WhatsApp ao PWA offline que ganhou um hackathon. Stack habitual: Next.js, TypeScript, Tailwind, NestJS, Prisma e PostgreSQL; também WordPress (migrações, Elementor) e Express em clientes reais. Uso IA no fluxo para prototipar e depurar mais depressa. Licenciatura em Engenharia e Ciência dos Computadores, ISUTC (desde Fev 2025).',
  contactMessage:
    'Se algum destes projetos ou demos te interessou, escreve-me. Gosto de resolver problemas com código deployado, não só slides.',
  metaDescription:
    'Miguel Bento — Full Stack Developer. Projetos em produção: AjudaCheia, Your Glow, Finanças Pessoais, BioBantu. Maputo.',

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

  projects: [
    {
      id: 'financas',
      name: 'Gestão Financeira Pessoal',
      tags: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Prisma'],
      desc: 'App full-stack para registar, analisar e planear finanças pessoais e de negócio — autenticação JWT, orçamentos, importação CSV/Excel, exportação PDF, espaços Pessoal | Negócio e dark mode.',
      technical:
        'Separação Vercel/Railway; refresh tokens com rotação; soft delete na lixeira; rate limiting por rota; CI com GitHub Actions.',
      status: 'live',
      url: 'financas-pessoais-nine-self.vercel.app',
      repo: 'github.com/Miguel-Bent/financas_pessoais',
    },
    {
      id: 'yourglow',
      name: 'Your Glow',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'E-commerce'],
      desc: 'Loja de skincare e autocuidado em Maputo. O cliente monta o carrinho no site e fecha por WhatsApp; painel admin para catálogo, cupões e pedidos.',
      technical:
        'Checkout sem gateway — pedido serializado para WhatsApp; API REST para catálogo e admin; PostgreSQL como fonte única de verdade.',
      status: 'live',
      url: 'yourglow.me',
    },
    {
      id: 'biobantu',
      name: 'BioBantu Platform',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      desc: 'Plataforma institucional modular para a BioBantu-258 — bioinsumos, agricultura sustentável e inovação agroindustrial em Moçambique. MVP com website público e roadmap API-first.',
      technical:
        'App Router Next.js; componentes reutilizáveis para secções institucionais; estrutura preparada para módulos futuros (catálogo, parceiros).',
      status: 'live',
      url: 'biobantu.vercel.app',
    },
    {
      id: 'ajudacheia',
      name: 'AjudaCheia',
      tags: ['PWA', 'React', 'Mobile-first', 'The Pseudocoders', 'bitAfrica', 'Cursor'],
      desc: 'O meu primeiro hackathon com a equipa The Pseudocoders — Cursor Hackathon da bitAfrica, onde ganhámos. App mobile-first de resposta às cheias em Moçambique: SOS, rede de voluntários, reencontro familiar e modo offline.',
      technical:
        'Sem mapas nem libs pesadas — localStorage para persistência offline; fluxos SOS/voluntário/reencontro desenhados para rede instável; PWA instalável com cache e indicador de ligação.',
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
      technical:
        'Grafo como fonte de navegação; arestas reveladas à medida que visitas nós; estado global Zustand; views desacopladas por módulo CS.',
      status: 'wip',
    },
  ],

  skills: [
    { id: 'next', name: 'Next.js', links: ['react', 'ts', 'tailwind'] },
    { id: 'postgres', name: 'PostgreSQL', links: ['sql', 'prisma', 'nestjs'] },
    { id: 'nestjs', name: 'NestJS / TypeScript', links: ['ts', 'postgres', 'prisma'] },
    { id: 'wordpress', name: 'WordPress', links: ['php', 'htmlcss'] },
    { id: 'ts', name: 'TypeScript', links: ['js', 'next', 'nestjs'] },
    { id: 'react', name: 'React', links: ['ts', 'next', 'vite'] },
    { id: 'tailwind', name: 'Tailwind CSS', links: ['next', 'htmlcss'] },
    { id: 'prisma', name: 'Prisma', links: ['postgres', 'nestjs', 'node'] },
    { id: 'strapi', name: 'Strapi CMS', links: ['next', 'postgres'] },
    { id: 'node', name: 'Node.js', links: ['express', 'nestjs', 'ts'] },
    { id: 'express', name: 'Express', links: ['node', 'postgres'] },
    { id: 'js', name: 'JavaScript', links: ['ts', 'php', 'react'] },
    { id: 'php', name: 'PHP', links: ['wordpress', 'sql'] },
    { id: 'java', name: 'Java', links: ['js'] },
    { id: 'sql', name: 'SQL', links: ['postgres', 'prisma'] },
    { id: 'htmlcss', name: 'HTML / CSS', links: ['tailwind', 'wordpress'] },
    { id: 'vite', name: 'Vite', links: ['react', 'ts'] },
    { id: 'figma', name: 'Figma', links: ['xd', 'htmlcss'] },
    { id: 'xd', name: 'Adobe XD', links: ['figma'] },
    { id: 'networks', name: 'Redes & Infraestrutura', links: ['hardware'] },
    { id: 'hardware', name: 'Suporte Técnico / Hardware', links: ['networks'] },
    { id: 'pwa', name: 'PWA / Offline', links: ['react', 'js'] },
    { id: 'git', name: 'Git / GitHub', links: ['vercel', 'railway'] },
    { id: 'vercel', name: 'Vercel', links: ['next', 'react'] },
    { id: 'railway', name: 'Railway', links: ['node', 'postgres'] },
  ],
}

export const profileNameBoot = profile.name.toUpperCase()
