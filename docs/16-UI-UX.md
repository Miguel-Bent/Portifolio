# UI / UX

## Princípios

1. **Composição clara** — conteúdo legível sobre fundo atmosférico, não competindo com ele.
2. **Sensação algorítmica** — transições mostram que há um path, não um fade genérico.
3. **Conteúdo primeiro** — o portfólio deve funcionar mesmo com System View desligado.
4. **Tipografia expressiva** — hierarquia forte; monospace para dados do inspector.
5. **Fundo atmosférico** — grafo subtil em repouso; destacado durante navegação.

## Navegação

```text
Clique / teclado  →  NAVIGATE_REQUEST  →  Engine  →  Animação  →  Nova secção
```

- Menu de navegação emite pedidos, nunca muda secção directamente.
- Feedback visual durante `Searching` (spinner ou pulse no destino).
- Secção activa claramente indicada no menu.

## Responsividade

| Viewport | Layout                                              |
|----------|-----------------------------------------------------|
| Desktop  | Conteúdo + System View lado a lado ou overlay       |
| Tablet   | System View colapsável                              |
| Mobile   | Conteúdo primeiro; inspector em drawer/modal        |

## Motion

Mínimo de 3 movimentos intencionais:

1. Transição de secção ao longo do path A*.
2. Highlight de arestas/nós no fundo.
3. Movimento da cabeça na fita Turing (System View).

## Acessibilidade

- Respeitar `prefers-reduced-motion` (ver `23-Acessibilidade.md`).
- Focus visível em todos os controlos interactivos.
- `aria-live` discreto ao completar navegação.

## Ver também

- `23-Acessibilidade.md`
- `35-Animacoes.md`
