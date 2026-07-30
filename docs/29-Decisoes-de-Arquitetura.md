# Decisões de Arquitetura (ADR)

Registo de decisões importantes. Formato: contexto → decisão → consequências.

---

## ADR-001: React apenas renderiza

**Contexto:** Portfólio com navegação algorítmica; tentação de usar react-router.

**Decisão:** Pathfinding, FSM e Turing vivem fora de componentes React. UI emite eventos e observa estado.

**Consequências:** Mais boilerplate inicial; core testável sem DOM; System View partilha mesma fonte de verdade.

---

## ADR-002: Heurística por profundidade

**Contexto:** Escolha de `h(n)` para A* com ~7 nós.

**Decisão:** `h(n) = |depth(n) - depth(goal)|`.

**Consequências:** O(1), interpretável no inspector; revalidar se topologia mudar.

---

## ADR-003: Priority Queue manual

**Contexto:** Fase 1 pede implementação própria.

**Decisão:** PQ em array ordenado ou heap manual em `priorityQueue.ts` — sem biblioteca externa.

**Consequências:** Código educativo; performance irrelevante para n=7.

---

## ADR-004: System View opt-in

**Contexto:** Inspector pode sobrecarregar UX.

**Decisão:** System View é toggle; portfólio funciona sem ele.

**Consequências:** Dois modos de leitura do mesmo estado; sem duplicar lógica de A*.

---

## ADR-005: Stack tecnológica

**Contexto:** Escolha de ferramentas para renderer e 3D.

**Decisão:** React, TypeScript, Vite, Tailwind, Framer Motion, Zustand, React Three Fiber.

**Consequências:** Ecossistema maduro; R3F opcional para MVP 2D.

---

## Como adicionar ADR

1. Próximo número sequencial (`ADR-006`).
2. Secção neste ficheiro ou ficheiro `adr/ADR-006-titulo.md`.
3. Referenciar na PR que motivou a decisão.
