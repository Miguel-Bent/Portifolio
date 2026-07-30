# Páginas

## Secções

| Página      | NodeId | Conteúdo principal                    |
|-------------|--------|-----------------------------------------|
| Home        | H      | Apresentação, tagline, CTA              |
| About       | A      | Bio, foto, valores                      |
| Journey     | J      | Timeline da carreira/formação           |
| Projects    | P      | Grafo ou lista de projetos              |
| Skills      | S      | Grafo de competências                   |
| Experience  | E      | Experiência profissional detalhada      |
| Contact     | C      | Formulário / links sociais              |

## Localização

`src/pages/` — um ficheiro por secção:

```
src/pages/
├── HomePage.tsx
├── AboutPage.tsx
├── JourneyPage.tsx
├── ProjectsPage.tsx
├── SkillsPage.tsx
├── ExperiencePage.tsx
└── ContactPage.tsx
```

## Comportamento

- Cada página = um nó do grafo.
- Mount/unmount coordenado pelo Animation Engine (estado `Rendering`).
- Apenas a página activa está montada (ou todas com `display: none` — decisão de implementação).
- Conteúdo responsivo; SEO básico por página (ver `24-SEO.md`).

## ActivePage

```tsx
function ActivePage() {
  const current = useEngineStore(s => s.currentSection);
  const pages: Record<NodeId, React.FC> = { H: HomePage, A: AboutPage, /* ... */ };
  const Page = pages[current];
  return <Page />;
}
```

## Ver também

- `19-Projetos.md`
- `20-SkillsGraph.md`
- `24-SEO.md`
