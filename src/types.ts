/**
 * Koryoon Library — Data Contract
 *
 * A node has EITHER children OR component, never both.
 * - Parent (childrenIds.length > 0): no component
 * - Leaf (childrenIds.length === 0): may have component
 */

export interface NodeComponent {
  componentType: string;
  data: Record<string, any>;
}

export interface KoryoonNode {
  id: string;
  name: string;
  parentId: string | null;
  childrenIds: string[];

  /** Only when childrenIds.length === 0 (leaf node) */
  component?: NodeComponent;

  /** Optional metadata — library passes through */
  radius?: number;
  color?: string;
  description?: string;
  iframe?: string;

  [key: string]: unknown;
}

export type Hierarchy = Record<string, KoryoonNode>;

export interface KoryoonScaleConfig {
  /** Base orbit radius for child spheres (default 4) */
  orbitRadiusBase?: number;
  /** Base size for center sphere (default 1.5) */
  sphereSizeBase?: number;
  /** Center sphere as fraction of screen height (default 1/3) */
  centerSphereScreenFraction?: number;
  /** Padding when fitting all spheres in view (default 1.2) */
  fitPadding?: number;
  /** Reference height in px: 1 unit = containerHeight/referenceHeight (default 600) */
  referenceHeight?: number;
}

export interface KoryoonConfig {
  /** Default: first node with parentId === null */
  rootNodeId?: string;
  scale?: KoryoonScaleConfig;
  theme?: {
    pointCloud?: {
      inactiveColor: string;
      hoverColor: string;
      color: string;
    }
  }
}

export interface KoryoonState {
  currentNodeId: string;
  history: string[];
  currentNode: KoryoonNode | null;
  childrenNodes: KoryoonNode[];
  hoveredNodeId: string | null;
  canGoBack: boolean;
  hierarchy: Hierarchy;
  isLoading: boolean;
  error: string | null;
}

export interface SpherePosition {
  x: number;
  y: number;
  z: number;
  theta: number;
  phi: number;
  index: number;
}

/**
 * Returns false if node has both children and component (invalid).
 * Valid: (childrenIds.length > 0 && !component) || (childrenIds.length === 0)
 */
export function isValidNode(node: KoryoonNode): boolean {
  const hasChildren = node.childrenIds.length > 0;
  const hasComponent = node.component != null;
  return !(hasChildren && hasComponent);
}
