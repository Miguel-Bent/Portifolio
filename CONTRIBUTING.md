# Contribuição

Obrigado pelo interesse em contribuir para o THEORYLAB.

## Guia completo

Consulta [`docs/27-Contribuicao.md`](docs/27-Contribuicao.md) para o fluxo de trabalho, regras arquitecturais e convenções de código.

## Resumo

1. Cria uma branch a partir de `main` ou da branch de feature activa.
2. Garante que `npm test` e `npm run build` passam.
3. A UI **não** faz pathfinding — componentes emitem eventos via Synapse.
4. O core (`src/theory/`, `src/cortex/`) deve permanecer testável sem React.
5. Documenta decisões relevantes em `docs/29-Decisoes-de-Arquitetura.md`.

## Comandos úteis

```bash
npm install
npm run dev
npm test
npm run build
```
