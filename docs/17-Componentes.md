# Componentes

## Localização

`src/ui/` — componentes de interface reutilizáveis.

## Componentes principais

| Componente | Ficheiro | Função |
|------------|----------|--------|
| ScrollSite | `ScrollSite.tsx` | Site scroll-driven com vistas por secção |
| CSLab | `CSLab.tsx` | Painel inspector (frontier, visited, logs) |
| DockNav | `DockNav.tsx` | Navegação rápida entre nós |
| SiteHeader | `SiteHeader.tsx` | Cabeçalho com fita e autômatos |
| TapeBar | `TapeBar.tsx` | Fita da máquina de Turing |
| LabGraph | `LabGraph.tsx` | Visualização do grafo CS |
| GraphPanel | `GraphPanel.tsx` | Painel de grafo no CS Lab |
| GraphEdges | `GraphEdges.tsx` | Arestas do grafo |
| ViewFrame | `ViewFrame.tsx` | Moldura comum das vistas |
| AutomataIntro | `AutomataIntro.tsx` | Intro animada no boot |
| AutomataPanel | `AutomataPanel.tsx` | Painel DFA/PDA/TM |
| FeaturedBadge | `FeaturedBadge.tsx` | Destaque de projectos |

## Categorias

| Categoria | Exemplos | Regra |
|-----------|----------|-------|
| Layout | `ScrollSite`, `ViewFrame` | Estrutura global |
| Navigation | `DockNav` | Emite `GOTO` via store/Synapse |
| Graph / FX | `LabGraph`, `GraphEdges` | Leem store; não calculam pathfinding |
| Automata | `TapeBar`, `AutomataPanel` | CS Lab / header |
| Inspector | `CSLab`, `GraphPanel` | Subscrevem lab-store |

## Regras

1. **Componentes de apresentação** recebem props ou leem `lab-store` — sem pathfinding embutido.
2. **Acções do utilizador** emitem eventos (`GOTO`, `ALGO`), nunca mudam secção directamente com `useState`.
3. **Um componente por ficheiro**, PascalCase.
4. **Hooks** em `src/hooks/` — ex.: `useScrollNavigation`.

## Exemplo

```tsx
// DockNav — correcto: pede navegação via store
function DockNav() {
  const goto = useLab((s) => s.goto)
  return <button onClick={() => goto('io')}>I/O</button>
}

// Incorrecto — setState directo para mudar secção
function BadButton() {
  const [node, setNode] = useState('init')
  return <button onClick={() => setNode('io')}>Contact</button>
}
```

## Ver também

- `18-Paginas.md` — vistas em `src/views/`
- `14-Renderer.md`
- `37-Inspector.md` — CS Lab
