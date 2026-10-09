import type { Profile } from './types'

/** Dados pessoais usados em todo o portfólio. */
export const profile: Profile = {
  name: 'Miguel Bento',
  siteName: 'theorylab',
  headline: 'Full Stack · Next.js, NestJS, PostgreSQL · WordPress',
  role: 'Full Stack Developer',
  bio: 'Sou programador full stack em Maputo e estudo Engenharia e Ciência dos Computadores no ISUTC desde fevereiro de 2025. Os meus projetos estão no ar: uma loja de skincare que recebe pedidos por WhatsApp e uma PWA offline para as cheias, que ganhou um hackathon com a minha equipa. Trabalho sobretudo com Next.js, TypeScript, Tailwind, NestJS, Prisma e PostgreSQL. Para clientes também uso WordPress (migrações, Elementor) e Express. Uso IA para prototipar e depurar mais depressa.',
  contactMessage:
    'Se algum destes projetos te interessou, ou tens um parecido em mente, escreve-me.',
  metaDescription:
    'Miguel Bento, programador full stack em Maputo. Projetos em produção: AjudaCheia, Your Glow, Finanças Pessoais e BioBantu.',

  links: {
    email: 'miguelbento012@gmail.com',
    github: 'github.com/Miguel-Bent',
    linkedin: 'linkedin.com/in/miguel-bento012',
    location: 'Magoanine, Maputo, Moçambique',
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
      text: 'Suporte informático: manutenção de hardware e software, redes LAN e Wi-Fi, e apoio aos utilizadores.',
    },
    {
      yr: 'Nov 2024',
      title: 'Estágio · CIUEM',
      text: 'Migrei o site de Joomla para WordPress e montei as páginas com Elementor, SmartSlider e Mega Menu. Os protótipos foram feitos em Figma e Adobe XD.',
    },
    {
      yr: '30 Mai 2026',
      title: 'Gestão Financeira Pessoal',
      text: 'Lancei uma app de finanças com login JWT, orçamentos, importação de CSV e Excel e exportação em PDF. O frontend está na Vercel e a API na Railway.',
    },
    {
      yr: '04 Jul 2026',
      title: 'AjudaCheia · The Pseudocoders',
      text: 'O meu primeiro hackathon, o Cursor Hackathon da bitAfrica, com a equipa The Pseudocoders. Ganhámos na categoria SOS/Reunião com uma app mobile-first para as cheias em Moçambique, que funciona offline como PWA.',
      featured: true,
      award: 'Vencedor · Cursor Hackathon',
    },
    {
      yr: '13 Jul 2026',
      title: 'Your Glow',
      text: 'Loja online de skincare em Maputo, feita para um cliente. Tem loja pública, checkout por WhatsApp, API em Node.js/Express com PostgreSQL e um painel de administração.',
    },
    {
      yr: '26 Jul 2026',
      title: 'BioBantu Platform',
      text: 'MVP do site institucional da BioBantu-258, que trabalha com bioinsumos e agricultura sustentável. O plano é evoluir para uma plataforma modular, API-first.',
    },
    {
      yr: '30 Jul 2026',
      title: 'TheoryLab',
      text: 'Este site. As secções são nós de um grafo, o caminho entre elas é calculado com Dijkstra, A* ou BFS, e há autômatos e um CS Lab para ver o que se passa.',
    },
  ],

  projects: [
    {
      id: 'financas',
      name: 'Gestão Financeira Pessoal',
      tags: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Prisma'],
      desc: 'App para registar, analisar e planear finanças, com espaços separados para o pessoal e o negócio. Tem login com JWT, orçamentos, importação de CSV e Excel, exportação em PDF e modo escuro.',
      technical:
        'Frontend na Vercel, API na Railway. Refresh tokens com rotação, lixeira com soft delete, rate limiting por rota e CI no GitHub Actions.',
      status: 'live',
      url: 'financas-pessoais-nine-self.vercel.app',
      repo: 'github.com/Miguel-Bent/financas_pessoais',
    },
    {
      id: 'yourglow',
      name: 'Your Glow',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'E-commerce'],
      desc: 'Loja de skincare e autocuidado em Maputo. O cliente monta o carrinho no site e fecha o pedido por WhatsApp. O catálogo, os cupões e os pedidos são geridos num painel admin.',
      technical:
        'Não há gateway de pagamento: o carrinho é convertido numa mensagem de WhatsApp. Uma API REST serve o catálogo e o admin, e todos os dados ficam em PostgreSQL.',
      status: 'live',
      url: 'yourglow.me',
      image: '/projects/yourglow.png',
      imageAlt: 'Captura do site Your Glow, loja de skincare em Maputo',
    },
    {
      id: 'biobantu',
      name: 'BioBantu Platform',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      desc: 'Site institucional da BioBantu-258, que trabalha com bioinsumos, agricultura sustentável e inovação agroindustrial em Moçambique. Esta versão é o MVP público; o plano é crescer para uma plataforma modular, API-first.',
      technical:
        'Next.js com App Router. As secções institucionais são componentes reutilizáveis, e a estrutura já tem lugar para os módulos de catálogo e parceiros.',
      status: 'live',
      url: 'biobantu.vercel.app',
      image: '/projects/biobantu.png',
      imageAlt: 'Captura do site BioBantu Platform',
    },
    {
      id: 'ajudacheia',
      name: 'AjudaCheia',
      tags: ['PWA', 'React', 'Mobile-first', 'The Pseudocoders', 'bitAfrica', 'Cursor'],
      desc: 'Fizemos esta app no Cursor Hackathon da bitAfrica, o meu primeiro hackathon, com a equipa The Pseudocoders, e ganhámos. É uma app mobile-first para as cheias em Moçambique, com pedidos de SOS, rede de voluntários, reencontro de famílias e modo offline.',
      technical:
        'Deixámos de fora mapas e bibliotecas pesadas. Os dados ficam em localStorage para funcionar sem rede, os fluxos de SOS, voluntário e reencontro foram pensados para ligações instáveis, e a PWA pode ser instalada, com cache e indicador de ligação.',
      status: 'live',
      url: 'ajuda-cheia.vercel.app',
      image: '/projects/ajudacheia.png',
      imageAlt: 'Captura da app AjudaCheia, para SOS e voluntariado em cheias',
      featured: true,
      award: 'Vencedor · Cursor Hackathon',
    },
    {
      id: 'theorylab',
      name: 'TheoryLab',
      tags: ['TypeScript', 'React', 'Vite', 'Zustand', 'Framer Motion'],
      desc: 'Este portfólio. As secções são nós de um grafo e o caminho entre elas é calculado com Dijkstra, A* ou BFS. O mapa vai aparecendo à medida que o exploras, autômatos DFA, PDA e TM controlam as transições, e o CS Lab mostra o que acontece em cada salto.',
      technical:
        'A navegação lê directamente do grafo e as arestas aparecem quando passas por elas. O estado global está em Zustand e cada secção é uma view independente.',
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
