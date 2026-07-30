# Interfaces TypeScript

Contrato inicial — nomes podem ser ajustados na implementação, mas a forma deve manter-se estável.

## Grafo

```typescript
type NodeId = 'H' | 'A' | 'J' | 'P' | 'S' | 'E' | 'C';

interface GraphNode {
  id: NodeId;
  label: string;
  depth: number;
  neighbors: NodeId[];
  weights: Partial<Record<NodeId, number>>;
}

interface Graph {
  getNode(id: NodeId): GraphNode;
  getNeighbors(id: NodeId): NodeId[];
  getEdgeWeight(from: NodeId, to: NodeId): number;
  getDepth(id: NodeId): number;
  getAllNodes(): GraphNode[];
}
```

## A*

```typescript
interface AStarResult {
  path: NodeId[];
  cost: number;
  openSet: NodeId[];
  closedSet: NodeId[];
  nodesExpanded: number;
}

function astar(graph: Graph, start: NodeId, goal: NodeId): AStarResult;
```

## FSM / Turing

```typescript
type NavState = 'Idle' | 'Searching' | 'Traversing' | 'Rendering' | 'Completed';

interface TuringSnapshot {
  tape: string[];
  head: number;
  state: NavState;
}
```

## Eventos

```typescript
interface NavigateRequest {
  from: NodeId;
  to: NodeId;
}

interface PathFound {
  path: NodeId[];
  cost: number;
  openSet: NodeId[];
  closedSet: NodeId[];
}

interface NodeExpanded {
  nodeId: NodeId;
  f: number;
  g: number;
  h: number;
}

interface EventMap {
  NAVIGATE_REQUEST: NavigateRequest;
  SEARCH_STARTED: NavigateRequest;
  NODE_EXPANDED: NodeExpanded;
  PATH_FOUND: PathFound;
  STATE_CHANGED: { from: NavState; to: NavState };
  TAPE_UPDATED: TuringSnapshot;
  ANIMATION_STEP: { nodeId: NodeId; progress: number; stepIndex: number };
  ANIMATION_COMPLETED: { path: NodeId[] };
  NAVIGATION_COMPLETED: { from: NodeId; to: NodeId; path: NodeId[] };
}
```

## Store (Zustand)

```typescript
interface EngineStore {
  currentSection: NodeId;
  fsmState: NavState;
  path: NodeId[];
  openSet: NodeId[];
  closedSet: NodeId[];
  tape: TuringSnapshot;
  logs: string[];
  metrics: NavigationMetrics;
}
```

## Ver também

- `28-API-Interna.md`
- `03-Grafo.md`
