# Documentação — THEORYLAB

Índice da documentação técnica do portfólio. Os ficheiros estão numerados para leitura sequencial; podes saltar directamente para o tema que precisares.

## Começar aqui

| Ficheiro | Tema |
|----------|------|
| [00-Visao-Geral.md](00-Visao-Geral.md) | O que é o projecto, objectivos e stack |
| [01-Arquitetura.md](01-Arquitetura.md) | Pipeline, camadas e regras |
| [33-Estrutura-de-Diretorios.md](33-Estrutura-de-Diretorios.md) | Árvore actual de `src/` |
| [27-Contribuicao.md](27-Contribuicao.md) | Fluxo de contribuição e regras |

## Núcleo computacional

| Ficheiro | Tema |
|----------|------|
| [02-Core-Engine.md](02-Core-Engine.md) | Cortex, theory e critérios de conclusão |
| [03-Grafo.md](03-Grafo.md) | CS_GRAPH e nós de navegação |
| [04-AStar.md](04-AStar.md) | Algoritmo A* |
| [05-Heuristica.md](05-Heuristica.md) | Função heurística por profundidade |
| [06-PriorityQueue.md](06-PriorityQueue.md) | Min-heap / open set |
| [07-EventBus.md](07-EventBus.md) | Synapse (pub/sub) |
| [08-FiniteStateMachine.md](08-FiniteStateMachine.md) | DFA de navegação |
| [09-TuringMachine.md](09-TuringMachine.md) | Fita e transições |
| [10-NavigationEngine.md](10-NavigationEngine.md) | Orquestração de navegação |
| [11-AnimationEngine.md](11-AnimationEngine.md) | Animator e timeline |
| [12-CameraEngine.md](12-CameraEngine.md) | Câmara ao longo do path |
| [28-API-Interna.md](28-API-Interna.md) | API interna do engine |
| [31-Fluxo-de-Eventos.md](31-Fluxo-de-Eventos.md) | Eventos e ordem de emissão |
| [34-Interfaces-TypeScript.md](34-Interfaces-TypeScript.md) | Tipos partilhados |

## Interface e conteúdo

| Ficheiro | Tema |
|----------|------|
| [14-Renderer.md](14-Renderer.md) | Camada React |
| [15-Background.md](15-Background.md) | Fundo e efeitos visuais |
| [16-UI-UX.md](16-UI-UX.md) | Design system e UX |
| [17-Componentes.md](17-Componentes.md) | Componentes em `src/ui/` |
| [18-Paginas.md](18-Paginas.md) | Vistas em `src/views/` |
| [19-Projetos.md](19-Projetos.md) | Secção Repos |
| [20-SkillsGraph.md](20-SkillsGraph.md) | Grafo de competências |
| [35-Animacoes.md](35-Animacoes.md) | Animações Framer Motion |
| [36-Camera.md](36-Camera.md) | Comportamento da câmara |
| [37-Inspector.md](37-Inspector.md) | CS Lab / System View |

## Qualidade e operação

| Ficheiro | Tema |
|----------|------|
| [21-Testes.md](21-Testes.md) | Vitest e estratégia de testes |
| [22-Performance.md](22-Performance.md) | Optimizações |
| [23-Acessibilidade.md](23-Acessibilidade.md) | A11y e reduced motion |
| [24-SEO.md](24-SEO.md) | Meta tags e títulos |
| [25-Deploy.md](25-Deploy.md) | Build e CI/CD |
| [38-Metricas.md](38-Metricas.md) | Métricas de execução |

## Planeamento

| Ficheiro | Tema |
|----------|------|
| [26-Roadmap.md](26-Roadmap.md) | Fases de desenvolvimento |
| [29-Decisoes-de-Arquitetura.md](29-Decisoes-de-Arquitetura.md) | ADRs |
| [30-Diagramas.md](30-Diagramas.md) | Diagramas ASCII |
| [32-Convencoes-de-Codigo.md](32-Convencoes-de-Codigo.md) | Estilo e convenções |
| [39-Backlog.md](39-Backlog.md) | Tarefas pendentes |

## Nota sobre paths

Alguns documentos mais antigos podem referir paths planeados na fase inicial (`src/engine/`, `src/pages/`). A implementação actual usa `src/cortex/`, `src/theory/`, `src/ui/` e `src/views/` — ver [33-Estrutura-de-Diretorios.md](33-Estrutura-de-Diretorios.md) como fonte de verdade.
