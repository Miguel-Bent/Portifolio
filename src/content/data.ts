export const timeline = [
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
]

export const experience = [
  {
    role: 'CS Builder',
    org: 'Miguel Bento',
    when: '2024 —',
    text: 'Engines desacoplados, autômatos observáveis e algoritmos comparáveis no mesmo grafo.',
  },
  {
    role: 'Student',
    org: 'Ciência da Computação',
    when: 'ongoing',
    text: 'Grafos, autômatos, complexidade e design de sistemas. Aprendizagem contínua.',
  },
]

export const projects = [
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
  {
    id: 'theory',
    name: 'TheoryLab',
    tags: ['TypeScript', 'Vite', 'Vitest'],
    desc: 'Este portfólio — um site que é simultaneamente produto e demonstração de CS.',
    status: 'live',
  },
]

export const skills = [
  { id: 'graphs', name: 'Graph Theory', lvl: 5, links: ['dijkstra', 'bfs'] },
  { id: 'dijkstra', name: 'Dijkstra', lvl: 4, links: ['graphs', 'heap'] },
  { id: 'astar', name: 'A* Search', lvl: 4, links: ['graphs', 'heuristic'] },
  { id: 'bfs', name: 'BFS', lvl: 4, links: ['graphs', 'queue'] },
  { id: 'dfa', name: 'DFA / FSM', lvl: 4, links: ['pda', 'tm'] },
  { id: 'pda', name: 'PDA / Stack', lvl: 3, links: ['dfa'] },
  { id: 'tm', name: 'Turing Machine', lvl: 3, links: ['dfa'] },
  { id: 'ts', name: 'TypeScript', lvl: 5, links: ['react'] },
  { id: 'react', name: 'React', lvl: 5, links: ['ts'] },
]

export const links = {
  email: 'miguel.bento@email.com',
  github: 'github.com/miguelbento',
  linkedin: 'linkedin.com/in/miguelbento',
  location: 'Portugal',
}
