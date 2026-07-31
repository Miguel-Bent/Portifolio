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

## CI

Workflow em `.github/workflows/ci.yml` — corre `npm test` e `npm run build` em cada push/PR para `main`, `master` e branches `feature/**`.

## Comandos

```bash
npm run build    # gera dist/
npm run preview  # serve dist/ localmente
```

## Ver também

- `21-Testes.md`
- `26-Roadmap.md`
