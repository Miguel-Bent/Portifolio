# Contribuição

## Fluxo sugerido

1. Branch a partir de `main` (`feature/fase-1-astar`, etc.).
2. Seguir a fase activa do roadmap (`26-Roadmap.md`).
3. Documentar decisões relevantes em `29-Decisoes-de-Arquitetura.md`.
4. PR com: **o quê**, **porquê**, plano de testes.
5. Garantir que testes do core passam antes de merge.

## Regras

| Regra | Detalhe |
|-------|---------|
| Core sem React | Fase 1 não importa React |
| UI não faz pathfinding | Componentes emitem eventos |
| Convenções | Ver `32-Convencoes-de-Codigo.md` |
| Sem secrets | Nunca commitar `.env`, tokens |
| Escopo educativo | Mudanças que enfraquecem A*/Turing/FSM devem ser discutidas primeiro |

## Escopo educativo

Este projecto é uma demonstração de CS. PRs que simplificam navegação para `useState('Contact')` sem passar pelo Engine **não serão aceites** sem ADR que justifique.

## Ver também

- `32-Convencoes-de-Codigo.md`
- `29-Decisoes-de-Arquitetura.md`
