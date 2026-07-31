# Páginas (Views)

## Secções

| Vista | NodeId | Símbolo | Conteúdo principal |
|-------|--------|---------|-------------------|
| HomeView | `init` | λ | Apresentação, headline, CTA |
| AutomataView | `automata` | M | DFA, PDA, TM explicados |
| GraphsView | `graphs` | G | Teoria de grafos |
| AlgoView | `algo` | A | Dijkstra, A*, BFS (Algorithm Arena) |
| TraceView | `trace` | T | Timeline de aprendizagem |
| ComplexityView | `complexity` | C | Classes assintóticas |
| ReposView | `repos` | R | Projectos e experimentos |
| StructuresView | `structures` | S | Competências técnicas |
| MemoryView | `memory` | H | Heap, stack, queue, hash |
| ProofView | `proof` | P | Experiência profissional |
| ContactView | `io` | Ω | Contacto e links |

## Localização

`src/views/` — um ficheiro por secção:

```text
src/views/
├── HomeView.tsx
├── AutomataView.tsx
├── GraphsView.tsx
├── AlgoView.tsx
├── TraceView.tsx
├── ComplexityView.tsx
├── ReposView.tsx
├── StructuresView.tsx
├── MemoryView.tsx
├── ProofView.tsx
└── ContactView.tsx
```

O mapeamento `NodeId → View` está em `src/app/App.tsx`.

## Comportamento

- Cada vista corresponde a um nó do `CS_GRAPH`.
- O **ScrollSite** coordena scroll e secção activa.
- O **Cortex** controla transições via pathfinding (não scroll directo).
- Meta tags (`title`, `description`) actualizadas por secção em `App.tsx`.
- Conteúdo pessoal centralizado em `src/content/profile.ts`.

## Registo de vistas

```tsx
// src/app/App.tsx
const VIEWS = {
  init: () => <HomeView />,
  automata: () => <AutomataView />,
  graphs: () => <GraphsView />,
  // …
  io: () => <ContactView />,
}
```

## Ver também

- `19-Projetos.md` — secção Repos
- `20-SkillsGraph.md` — secção Structures
- `24-SEO.md` — meta por secção
- `src/content/profile.ts` — dados do portfólio
