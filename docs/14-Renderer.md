# Renderer

## Objetivo (Fase 2)

Conectar o Core Engine ao **React** — toda transição visual é acionada pelo Engine, nunca pelo router ou estado local de componentes.

## Entregas

- [ ] Vite + React + TypeScript
- [ ] Tailwind CSS configurado
- [ ] Framer Motion para transições
- [ ] Layout base (`Shell`, header, footer)
- [ ] Camera Engine integrado
- [ ] Componentes reutilizáveis
- [ ] Fundo animado com grafo (nodes, edges, weights)
- [ ] Navegação controlada pelo Engine

## Regra de ouro

```
Engine emite estado  →  React renderiza
```

Nunca:

```
Utilizador clica  →  setState('Contact')  →  React muda secção
```

O clique emite `NAVIGATE_REQUEST`; o Engine decide o path e a animação.

## Entry point

`src/App.tsx`:

```tsx
function App() {
  useEngineSubscription(); // hook que liga Event Bus ao Zustand

  return (
    <Shell>
      <GraphBackground />
      <ActivePage />
      <SystemViewToggle />
    </Shell>
  );
}
```

## Stack de renderização

| Camada        | Tecnologia     |
|---------------|----------------|
| Layout/CSS    | Tailwind       |
| Transições 2D | Framer Motion  |
| Fundo 3D      | R3F (opcional) |
| Estado        | Zustand        |

## Critério de conclusão

Navegar de Home a Contact: o utilizador vê animação ao longo do path A*; nenhum componente calcula rotas.

## Ver também

- `17-Componentes.md`
- `15-Background.md`
