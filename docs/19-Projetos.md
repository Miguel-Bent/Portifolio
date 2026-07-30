# Projetos

## Objetivo

A secção **Projects** apresenta trabalho real num formato explorável — preferencialmente um **grafo de projetos** com relações, tags e dependências conceptuais.

## Entregas (Fase 3)

- [ ] Lista ou grafo de projetos
- [ ] Metadados: título, stack, descrição, links (repo, demo)
- [ ] Arestas opcionais entre projetos relacionados
- [ ] Visualização responsiva

## Dados

`src/data/projects.ts`:

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  links: { label: string; url: string }[];
  related?: string[];  // IDs de projetos ligados
}
```

## UX

- **Uma secção, um propósito** — Projects é sobre trabalho, não repetir Skills.
- Evitar grid genérico de cards se o grafo for o visual principal.
- Clique num projeto → detalhe inline ou modal, sem quebrar o Engine de navegação de secções.

## Distinção

| Grafo              | Nós              | Propósito                    |
|--------------------|------------------|------------------------------|
| Navegação (A*)     | Secções H–C      | Mover-se pelo portfólio      |
| Projetos           | Projetos         | Explorar trabalho            |
| Skills             | Competências     | Mostrar stack e relações     |

Três grafos independentes; não misturar pathfinding de secções com grafos de conteúdo.

## Ver também

- `20-SkillsGraph.md`
- `18-Paginas.md`
