import type { Profile } from './types'

/**
 * Fonte única dos teus dados pessoais.
 * Edita este ficheiro (ou partilha a info no chat) para actualizar todo o portfólio.
 */
export const profile: Profile = {
  name: 'Miguel Bento',
  siteName: 'theorylab',
  headline: 'Estudante de Ciência da Computação · ISUTC',
  role: 'Estudante de Ciência da Computação · ISUTC',
  bio: 'Estudante na ISUTC, em Maputo. Interessado em grafos, autômatos, algoritmos e sistemas interactivos. Este site é o meu portfólio e laboratório — cada navegação corre pathfinding real.',
  contactMessage:
    'Se este percurso chamou a atenção, escreve-me. Gosto de começar pelos problemas que valem a pena resolver.',
  metaDescription:
    'Miguel Bento — portfólio de Ciência da Computação (ISUTC, Maputo) com CS Lab interactivo, grafos e autômatos.',

  links: {
    email: 'miguelbento012@gmail.com',
    github: 'github.com/Miguel-Bent',
    linkedin: 'linkedin.com/in/miguel-bento012',
    location: 'Maputo, Moçambique',
  },

  education: [
    {
      school: 'ISUTC — Instituto Superior de Transportes e Comunicações',
      degree: 'Ciência da Computação',
      when: 'em curso',
      text: 'Formação em Maputo, Moçambique.',
    },
  ],

  timeline: [
    {
      yr: '2022',
      title: 'Foundations',
      text: 'Estruturas de dados, grafos e análise de complexidade. Primeiros contactos com teoria formal.',
    },
    {
      yr: '2023',
      title: 'Automata',
      text: 'DFA, PDA e máquinas de Turing. Linguagens formais e computabilidade.',
    },
    {
      yr: '2024',
      title: 'Algorithms',
      text: 'Dijkstra, A* e BFS na prática. Pathfinding, heurísticas e visualização de algoritmos.',
    },
    {
      yr: '2026',
      title: 'TheoryLab',
      text: 'Portfólio pessoal como laboratório vivo — cada navegação é um algoritmo a correr.',
    },
  ],

  experience: [
    {
      role: 'CS Builder',
      org: 'Miguel Bento',
      when: '2024 —',
      text: 'Engines desacoplados, autômatos observáveis e algoritmos comparáveis no mesmo grafo.',
    },
    {
      role: 'Student',
      org: 'ISUTC',
      when: 'em curso',
      text: 'Ciência da Computação em Maputo. Grafos, autômatos, complexidade e design de sistemas.',
    },
  ],

  projects: [
    {
      id: 'theorylab',
      name: 'TheoryLab',
      tags: ['TypeScript', 'React', 'Vite'],
      desc: 'Este portfólio — site interactivo com grafo de navegação, pathfinding e autômatos em tempo real.',
      status: 'live',
      repo: 'github.com/Miguel-Bent',
    },
    {
      id: 'pages',
      name: 'Miguel-Bent.github.io',
      tags: ['GitHub Pages', 'Portfolio'],
      desc: 'Repositório do site pessoal no GitHub.',
      status: 'live',
      repo: 'github.com/Miguel-Bent/Miguel-Bent.github.io',
    },
    {
      id: 'path',
      name: 'Pathfinder Suite',
      tags: ['Dijkstra', 'A*', 'BFS'],
      desc: 'Três algoritmos no mesmo grafo — compare caminhos, custos e complexidade em tempo real.',
      status: 'live',
    },
    {
      id: 'auto',
      name: 'Automata Trinity',
      tags: ['DFA', 'PDA', 'TM'],
      desc: 'DFA controla fases, PDA empilha símbolos do caminho, TM percorre a fita de módulos.',
      status: 'live',
    },
    {
      id: 'viz',
      name: 'Live Viz Engine',
      tags: ['React', 'Zustand', 'Framer Motion'],
      desc: 'Visualização em tempo real de frontier, visited, stack e telemetria de execução.',
      status: 'live',
    },
  ],

  skills: [
    { id: 'ts', name: 'TypeScript', lvl: 5, links: ['react', 'node'] },
    { id: 'react', name: 'React', lvl: 5, links: ['ts'] },
    { id: 'node', name: 'Node.js', lvl: 4, links: ['ts'] },
    { id: 'graphs', name: 'Graph Theory', lvl: 5, links: ['dijkstra', 'bfs'] },
    { id: 'dijkstra', name: 'Dijkstra', lvl: 4, links: ['graphs', 'heap'] },
    { id: 'astar', name: 'A* Search', lvl: 4, links: ['graphs', 'heuristic'] },
    { id: 'bfs', name: 'BFS', lvl: 4, links: ['graphs', 'queue'] },
    { id: 'dfa', name: 'DFA / FSM', lvl: 4, links: ['pda', 'tm'] },
    { id: 'pda', name: 'PDA / Stack', lvl: 3, links: ['dfa'] },
    { id: 'tm', name: 'Turing Machine', lvl: 3, links: ['dfa'] },
  ],
}

export const profileNameBoot = profile.name.toUpperCase()
