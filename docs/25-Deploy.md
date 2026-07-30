# Deploy

## Alvo típico

Build estático Vite → **Vercel**, **Netlify** ou **GitHub Pages**.

## Checklist

- [ ] `npm run build` sem erros
- [ ] Variáveis de ambiente documentadas (se houver)
- [ ] `base` correcto no `vite.config.ts` (ex.: `/Portifolio/` para GH Pages)
- [ ] Preview local: `npm run preview`
- [ ] Smoke test: Home → Contact via Engine em produção
- [ ] Lighthouse básico (performance, a11y)

## CI sugerido

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
      - run: npm run build
```

## Comandos

```bash
npm run build    # gera dist/
npm run preview  # serve dist/ localmente
```

## Ver também

- `21-Testes.md`
- `26-Roadmap.md`
