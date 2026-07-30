export const timeline = [
  { yr: '2022', title: 'Foundations', text: 'Estruturas de dados, grafos, complexidade.' },
  { yr: '2023', title: 'Automata', text: 'DFA, PDA, máquinas de Turing — teoria formal.' },
  { yr: '2024', title: 'Algorithms', text: 'Dijkstra, A*, BFS — pathfinding na prática.' },
  { yr: '2026', title: 'THEORYLAB', text: 'Portfólio como laboratório vivo de CS.' },
]

export const experience = [
  {
    role: 'CS Builder',
    org: 'Theory Lab',
    when: '2024 —',
    text: 'Engines desacoplados, autômatos observáveis, algoritmos comparáveis.',
  },
  {
    role: 'Student',
    org: 'Ciência da Computação',
    when: 'ongoing',
    text: 'Grafos, autômatos, complexidade e design de sistemas.',
  },
]

export const projects = [
  {
    id: 'path',
    name: 'Pathfinder Suite',
    tags: ['Dijkstra', 'A*', 'BFS'],
    desc: 'Três algoritmos no mesmo grafo — compare caminhos e complexidade.',
  },
  {
    id: 'auto',
    name: 'Automata Trinity',
    tags: ['DFA', 'PDA', 'TM'],
    desc: 'DFA controla fases, PDA empilha símbolos, TM percorre a fita.',
  },
  {
    id: 'viz',
    name: 'Live Viz',
    tags: ['React', 'Zustand'],
    desc: 'Visualização em tempo real de frontier, visited e stack.',
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
