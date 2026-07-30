# SEO

## Entrega (Fase 3)

SEO básico para SPA Vite/React — conteúdo indexável sem sacrificar a experiência algorítmica.

## Checklist

- [ ] `<title>` e `<meta name="description">` por secção
- [ ] Open Graph: `og:title`, `og:description`, `og:image`
- [ ] HTML semântico (`<main>`, `<article>`, headings hierárquicos)
- [ ] `sitemap.xml` e `robots.txt`
- [ ] URLs partilháveis — hash (`#contact`) ou history API sincronizado com Engine
- [ ] Texto real no HTML (não só canvas) para crawlers

## Implementação sugerida

```tsx
// usePageMeta.ts
function usePageMeta(section: NodeId) {
  const meta = sectionMeta[section];
  useEffect(() => {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [section]);
}
```

## Nota

O valor educativo/técnico é primário. SEO é secundário, mas o conteúdo (bio, projetos, skills) deve ser indexável para quem chega via Google.

## Ver também

- `18-Paginas.md`
- `25-Deploy.md`
