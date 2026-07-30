# Componentes

## Localização

`src/components/`

## Categorias

| Categoria     | Exemplos                                      | Regra                          |
|---------------|-----------------------------------------------|--------------------------------|
| Layout        | `Shell`, `Header`, `Footer`                   | Estrutura global               |
| Navigation    | `NavMenu`, `NavigateButton`, `SectionIndicator`| Emitem `NAVIGATE_REQUEST`     |
| Graph / FX    | `GraphBackground`, `EdgeHighlight`, `NodeBadge`| Leem store; não calculam A*  |
| Turing / FSM  | `TapeDisplay`, `FsmBadge`                     | System View                    |
| System View   | `SystemViewPanel`, `OpenSetList`, `LogStream` | Subscrevem Event Bus           |
| Content       | `Timeline`, `ProjectCard`, `SkillNode`        | Apresentação pura              |

## Regras

1. **Componentes de apresentação** recebem props ou leem store — sem A* embutido.
2. **Acções do utilizador** emitem eventos (`NAVIGATE_REQUEST`), nunca chamam `navigate()` directamente excepto via hook dedicado.
3. **Um componente por ficheiro**, PascalCase.
4. **Hooks** em `src/hooks/` — ex.: `useEngineSubscription`, `useNavigation`.

## Exemplo

```tsx
// NavigateButton.tsx — correcto
function NavigateButton({ target }: { target: NodeId }) {
  const requestNavigate = useNavigateRequest();
  return <button onClick={() => requestNavigate(target)}>Go to {target}</button>;
}

// Incorrecto — setState directo para mudar secção
function BadButton() {
  const setSection = useStore(s => s.setSection);
  return <button onClick={() => setSection('C')}>Contact</button>;
}
```

## Ver também

- `18-Paginas.md`
- `14-Renderer.md`
