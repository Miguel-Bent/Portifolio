# Acessibilidade

## Requisitos mínimos

- **Navegação por teclado** — Tab entre controlos; Enter/Space activa navegação.
- **Focus visível** — outline ou ring em botões e links.
- **Contraste** — WCAG AA para texto e controlos.
- **`prefers-reduced-motion`** — encurtar ou saltar animações de path; transição instantânea.
- **Landmarks** — `<main>`, `<nav>`, headings por secção (`h1` por página).
- **`aria-live="polite"`** — anunciar mudança de secção ao completar `NAVIGATION_COMPLETED`.

## Navegação algorítmica

O visitante não precisa de entender A* para usar o site:

- Menu com nomes legíveis ("About", não só "A").
- Secção activa indicada visualmente e para leitores de ecrã (`aria-current="page"`).
- System View é opt-in — conteúdo do portfólio funciona sem inspector.

## System View

- Labels de texto, não só cor, para open/closed set e estados FSM.
- Painéis com `role="region"` e `aria-label`.
- Logs com scroll acessível.

## Ver também

- `16-UI-UX.md`
- `35-Animacoes.md` — reduced motion
