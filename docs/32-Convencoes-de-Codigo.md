# Convenções de Código

## Geral

- **TypeScript strict** — `strict: true` no `tsconfig.json`.
- **Nomes em inglês** no código; documentação em português.
- **Sem `any`** — usar `unknown` + type guards se necessário.

## Ficheiros

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Módulos TS | camelCase | `astar.ts`, `eventBus.ts` |
| Componentes React | PascalCase.tsx | `GraphBackground.tsx` |
| Testes | `*.test.ts` | `astar.test.ts` |
| Dados | camelCase em `data/` | `graph.ts`, `projects.ts` |
| Hooks | `use*.ts` | `useEngineStore.ts` |

## Pastas

Seguir `33-Estrutura-de-Diretorios.md`:

- Funções puras em `algorithms/`
- Orquestração em `engine/`
- Modelo formal em `turing/`
- UI em `components/` e `pages/`

## Estilo

- Preferir `const` e funções nomeadas exportadas.
- Eventos tipados via `EventMap` central.
- Um export principal por ficheiro de algoritmo.
- Imports: externos → internos → tipos.

## Git

- Commits focados — não misturar Fase 1 core com copy de marketing.
- Mensagens: imperativo, curto (`add astar path reconstruction`).
- Branch por feature/fase.

## Ver também

- `33-Estrutura-de-Diretorios.md`
- `34-Interfaces-TypeScript.md`
