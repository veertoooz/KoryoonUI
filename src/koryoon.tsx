/**
 * Koryoon — 3D hierarchy visualization library
 * Entry point for CDN and module usage
 */

import './styles.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { SphereScene } from './components/SphereScene';
import type { Hierarchy, KoryoonConfig, KoryoonState } from './types';

export interface KoryoonInitOptions {
  container: string | HTMLElement;
  hierarchy: Hierarchy;
  hierarchyUrl?: string;
  rootNodeId?: string;
  config?: KoryoonConfig;
  onStateChange?: (state: KoryoonState) => void;
}

export interface KoryoonInstance {
  getState: () => KoryoonState | null;
  navigateTo: (id: string) => void;
  goBack: () => void;
}

function resolveRootNodeId(hierarchy: Hierarchy, explicit?: string): string {
  if (explicit && hierarchy[explicit]) return explicit;
  const root = Object.values(hierarchy).find(n => n.parentId === null);
  return root?.id ?? Object.keys(hierarchy)[0] ?? '';
}

/**
 * Initialize Koryoon viewer.
 */
export function init(options: KoryoonInitOptions): KoryoonInstance {
  const el =
    typeof options.container === 'string'
      ? document.querySelector(options.container)
      : options.container;

  if (!el || !(el instanceof HTMLElement)) {
    console.error('Koryoon: container must be a valid selector or HTMLElement');
    return {
      getState: () => null,
      navigateTo: () => {},
      goBack: () => {},
    };
  }

  const hierarchy = options.hierarchy ?? {};
  const rootNodeId =
    options.rootNodeId ?? resolveRootNodeId(hierarchy);

  let handlers: { getState: () => KoryoonState; navigateTo: (id: string) => void; goBack: () => void } | null = null;

  const root = createRoot(el);
  root.render(
    <StrictMode>
      <SphereScene
        hierarchy={hierarchy}
        hierarchyUrl={options.hierarchyUrl}
        rootNodeId={rootNodeId || undefined}
        config={options.config}
        onStateChange={options.onStateChange}
        onRegisterHandlers={(h) => {
          handlers = h;
        }}
      />
    </StrictMode>
  );

  return {
    getState: () => (handlers ? handlers.getState() : null),
    navigateTo: (id: string) => handlers?.navigateTo(id),
    goBack: () => handlers?.goBack(),
  };
}

if (typeof window !== 'undefined') {
  (window as any).Koryoon = { init };
}
