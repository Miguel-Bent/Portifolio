# Skills Graph

## Conceito

Grafo de **competências** separado do grafo de navegação. Nós = skills; arestas = relações ("usa", "complementa", "domínio").

## Dados

`src/data/skills.ts`:

```typescript
interface SkillNode {
  id: string;
  label: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;       // 'frontend', 'backend', 'devops', ...
  neighbors: string[];
}
```

## Visualização

- Layout force-directed ou hierárquico por categoria.
- Focus highlight ao passar o rato ou seleccionar.
- Reutilizar primitivas do `GraphBackground` onde possível.
- Cores por categoria; tamanho por nível.

## Entrega (Fase 3)

- [ ] Grafo responsivo na página Skills
- [ ] Dados tipados em `src/data/skills.ts`
- [ ] Interacção: hover, click para detalhe
- [ ] Separado do A* de navegação de secções

## Exemplo de relações

```text
[React] ──uses──→ [TypeScript]
[React] ──complements──→ [Tailwind]
[Node.js] ──domain──→ [Backend]
```

## Ver também

- `19-Projetos.md`
- `18-Paginas.md`
