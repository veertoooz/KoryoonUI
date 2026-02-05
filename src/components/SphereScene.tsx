import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useMemo, useEffect, useCallback, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { useSpherePoints } from '../hooks/useSpherePoints';
import { computeScale } from '../lib/scale';
import SimpleStars from './SimpleStars';
import { IframeModal } from './IframeModal';
import { LoadingScreen } from './LoadingScreen';
import { getTextureAtlas } from '../lib/texture-atlas';
import SphericalPointCloud from './SphericalPointCloud';
import type { Hierarchy, KoryoonNode, KoryoonState, KoryoonConfig } from '../types';

// Constants
const DEFAULT_ROOT_NODE_ID = 'hiphop';
const DEFAULT_CENTER: [number, number, number] = [0, 0, 0];
const CAMERA_FOV = 50;
const TRANSITION_DURATION_MS = 250;

export interface KoryoonHandlers {
  getState: () => KoryoonState;
  navigateTo: (id: string) => void;
  goBack: () => void;
}

interface SphereSceneProps {
  hierarchy: Hierarchy;
  rootNodeId?: string;
  hierarchyUrl?: string;
  config?: KoryoonConfig;
  onStateChange?: (state: KoryoonState) => void;
  onRegisterHandlers?: (handlers: KoryoonHandlers) => void;
}

export const SphereScene = ({ hierarchy: initialHierarchy, rootNodeId: propsRootNodeId, hierarchyUrl, config, onStateChange, onRegisterHandlers }: SphereSceneProps) => {
  const rootNodeId = propsRootNodeId ?? DEFAULT_ROOT_NODE_ID;

  // State management
  const [currentId, setCurrentId] = useState<string>(rootNodeId);
  const [history, setHistory] = useState<string[]>([rootNodeId]);
  const [isVisible, setIsVisible] = useState(true);
  const [iframeModal, setIframeModal] = useState<{ url: string; title: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [webglError, setWebglError] = useState<string | null>(null);
  
  // Hierarchy state
  const [hierarchy, setHierarchy] = useState<Hierarchy>(initialHierarchy);

  // Auto-hover state
  const [autoHoveredSphereId, setAutoHoveredSphereId] = useState<string | null>(null);

  // Container size (for screen-relative scaling)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.Camera>(null);
  const sphereRefs = useRef<Map<string, THREE.Points>>(new Map());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const hoverAnimationRef = useRef<number | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch hierarchy data if hierarchyUrl provided
  useEffect(() => {
    if (!hierarchyUrl) {
      setLoading(false);
      return;
    }
    const fetchHierarchy = async () => {
      try {
        const response = await fetch(hierarchyUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Hierarchy = await response.json();
        setHierarchy(data);
        
        if (!data[rootNodeId]) {
          setWebglError(`Root node "${rootNodeId}" not found in data.`);
        }
      } catch (error) {
        console.error('Error loading hierarchy:', error);
        setWebglError('Failed to load data. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchHierarchy();
  }, [hierarchyUrl, rootNodeId]);

  // Initialize from initialHierarchy when no hierarchyUrl
  useEffect(() => {
    if (!hierarchyUrl && Object.keys(initialHierarchy).length > 0) {
      setHierarchy(initialHierarchy);
      setLoading(false);
    }
  }, [hierarchyUrl, initialHierarchy]);

  // Derived state - must be defined before useEffects and other code that depend on it
  const currentNode: KoryoonNode | null = useMemo(() => {
    return hierarchy[currentId] || null;
  }, [hierarchy, currentId]);

  const childrenNodes: KoryoonNode[] = useMemo(() => {
    if (!currentNode || !currentNode.childrenIds) return [];
    return currentNode.childrenIds
      .map(id => hierarchy[id])
      .filter(Boolean) as KoryoonNode[];
  }, [currentNode, hierarchy]);

  const renderNodes: KoryoonNode[] = useMemo(() => {
    if (!currentNode) return [];
    return [currentNode, ...childrenNodes];
  }, [currentNode, childrenNodes]);

  // ResizeObserver: track container size for screen-relative scaling
  useEffect(() => {
    if (loading || webglError || !currentNode) return;
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });
    ro.observe(el);
    updateSize(); // initial size in case ResizeObserver delays
    return () => ro.disconnect();
  }, [loading, webglError, currentNode]);

  // Window resize fallback (container may be 100% viewport)
  useEffect(() => {
    if (loading || webglError || !currentNode) return;
    const handleResize = () => {
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loading, webglError, currentNode]);

  const viewportHeight =
    containerSize.height || (typeof window !== 'undefined' ? window.innerHeight : 600);
  const { orbitRadius, sphereSize, cameraDistance } = computeScale(
    renderNodes.length,
    config?.scale,
    viewportHeight,
    CAMERA_FOV
  );

  // Update camera position when cameraDistance changes (resize, node count)
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, cameraDistance * 0.15, cameraDistance);
    }
  }, [cameraDistance]);

  // Positions calculation - only when we have nodes to render
  const positions = useSpherePoints({
    count: renderNodes.length,
    radius: orbitRadius,
    center: DEFAULT_CENTER,
  });

  // Texture atlas loading - only when hierarchy is loaded
  useEffect(() => {
    if (Object.keys(hierarchy).length === 0) return;

    let mounted = true;
    const atlas = getTextureAtlas();

    try {
      atlas.generateAtlas();
      if (mounted) {
        setLoading(false);
      }
    } catch (error) {
      console.error('Texture atlas loading failed:', error);
      if (mounted) {
        setLoading(false);
        setWebglError('Failed to initialize graphics. Please check your browser settings.');
      }
    }

    return () => {
      mounted = false;
      atlas.dispose();
    };
  }, [hierarchy]);

  // Auto-hover detection animation
  useEffect(() => {
    const updateAutoHover = () => {
      if (!cameraRef.current || renderNodes.length === 0) {
        hoverAnimationRef.current = requestAnimationFrame(updateAutoHover);
        return;
      }

      const raycaster = raycasterRef.current;
      raycaster.setFromCamera(new THREE.Vector2(0, 0), cameraRef.current);
      
      const sphereMeshes = Array.from(sphereRefs.current.values());
      
      let closestSphere: { distance: number; object: THREE.Points } | null = null;
      let minDistance = Infinity;

      sphereMeshes.forEach((mesh) => {
        const worldPosition = new THREE.Vector3();
        mesh.getWorldPosition(worldPosition);
        
        const meshWithRadius = mesh as any;
        const sphereRadius = meshWithRadius.radius || mesh.scale.x * 5;
        
        const distanceToRay = raycaster.ray.distanceToPoint(worldPosition);
        
        if (distanceToRay <= sphereRadius) {
          const sphereToRay = worldPosition.clone().sub(raycaster.ray.origin);
          const projectionLength = sphereToRay.dot(raycaster.ray.direction);
          
          if (projectionLength > 0 && projectionLength < minDistance) {
            minDistance = projectionLength;
            closestSphere = {
              distance: projectionLength,
              object: mesh
            };
          }
        }
      });

      let hoveredId: string | null = null;
      if (closestSphere) {
        const intersectedMesh = (closestSphere as { distance: number; object: THREE.Points }).object;
        
        sphereRefs.current.forEach((mesh, nodeId) => {
          if (mesh === intersectedMesh) {
            hoveredId = nodeId;
          }
        });
      }

      if (hoveredId !== autoHoveredSphereId) {
        setAutoHoveredSphereId(hoveredId);
      }

      hoverAnimationRef.current = requestAnimationFrame(updateAutoHover);
    };

    hoverAnimationRef.current = requestAnimationFrame(updateAutoHover);

    return () => {
      if (hoverAnimationRef.current) {
        cancelAnimationFrame(hoverAnimationRef.current);
      }
    };
  }, [renderNodes, autoHoveredSphereId]);

  const handleScreenDoubleClick = useCallback(() => {
    if (!autoHoveredSphereId || !hierarchy[autoHoveredSphereId]) {
      return;
    }

    const hoveredNode = hierarchy[autoHoveredSphereId];
    
    if (hoveredNode.id === currentId) {
      if (history.length > 1) {
        setIsVisible(false);
        setTimeout(() => {
          const newHistory = history.slice(0, -1);
          setHistory(newHistory);
          setCurrentId(newHistory[newHistory.length - 1]);
          setTimeout(() => setIsVisible(true), 50);
        }, TRANSITION_DURATION_MS);
      }
      return;
    }

    if (hoveredNode.childrenIds.length === 0 && hoveredNode.iframe) {
      setIframeModal({ 
        url: hoveredNode.iframe, 
        title: hoveredNode.name 
      });
      return;
    }

    setIsVisible(false);
    setTimeout(() => {
      setHistory((prev) => [...prev, hoveredNode.id]);
      setCurrentId(hoveredNode.id);
      setTimeout(() => setIsVisible(true), 50);
    }, TRANSITION_DURATION_MS);
  }, [autoHoveredSphereId, hierarchy, currentId, history]);

  useEffect(() => {
    const handleGlobalDoubleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isCanvasClick = target.tagName === 'CANVAS' || 
                           target.closest('.canvas-container') ||
                           target.className.includes('crosshair');
      
      if (isCanvasClick) {
        e.preventDefault();
        e.stopPropagation();
        handleScreenDoubleClick();
      }
    };

    window.addEventListener('dblclick', handleGlobalDoubleClick);
    
    return () => {
      window.removeEventListener('dblclick', handleGlobalDoubleClick);
    };
  }, [handleScreenDoubleClick]);

  const handleBack = useCallback(() => {
    if (history.length <= 1) return;

    setIsVisible(false);
    setTimeout(() => {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentId(newHistory[newHistory.length - 1]);
      setTimeout(() => setIsVisible(true), 50);
    }, TRANSITION_DURATION_MS);
  }, [history]);

  const navigateTo = useCallback((nodeId: string) => {
    const node = hierarchy[nodeId];
    if (!node) return;

    const path: string[] = [];
    let n: KoryoonNode | undefined = node;
    while (n) {
      path.unshift(n.id);
      n = n.parentId ? hierarchy[n.parentId] : undefined;
    }

    setIsVisible(false);
    setTimeout(() => {
      setHistory(path);
      setCurrentId(nodeId);
      setTimeout(() => setIsVisible(true), 50);
    }, TRANSITION_DURATION_MS);
  }, [hierarchy]);

  useEffect(() => {
    const getState = (): KoryoonState => ({
      currentNodeId: currentId,
      history,
      currentNode,
      childrenNodes,
      hoveredNodeId: autoHoveredSphereId,
      canGoBack: history.length > 1,
      hierarchy,
      isLoading: loading,
      error: webglError,
    });

    onStateChange?.(getState());
    onRegisterHandlers?.({
      getState,
      navigateTo,
      goBack: handleBack,
    });
  }, [onStateChange, onRegisterHandlers, currentId, history, currentNode, childrenNodes, autoHoveredSphereId, hierarchy, loading, webglError, navigateTo, handleBack]);

  // Early returns for loading and error states
  if (loading || Object.keys(hierarchy).length === 0) {
    return <LoadingScreen />;
  }

  if (webglError) {
    return (
      <div className="koryoon-fullscreen koryoon-flex-center" style={{ background: '#000' }}>
        <div
          className="koryoon-text-center"
          style={{
            padding: '2rem',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
            Graphics Error
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>{webglError}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!currentNode) {
    return (
      <div className="koryoon-fullscreen koryoon-flex-center" style={{ background: '#000' }}>
        <div
          className="koryoon-text-center"
          style={{
            padding: '2rem',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
            Data Error
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
            Current node not found in hierarchy.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="koryoon-fullscreen canvas-container"
      style={{ position: 'relative', background: '#000' }}
    >
      {iframeModal && (
        <IframeModal
          url={iframeModal.url}
          title={iframeModal.title}
          isOpen={!!iframeModal}
          onClose={() => setIframeModal(null)}
        />
      )}

      {/* Canvas */}
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, cameraDistance * 0.15, cameraDistance], fov: CAMERA_FOV }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          precision: 'mediump',
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false,
          depth: true,
          stencil: false,
          logarithmicDepthBuffer: false,
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />

          <SimpleStars />

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={cameraDistance * 0.4}
            maxDistance={cameraDistance * 2}
            enableDamping
            dampingFactor={0.05}
          />

          {isVisible && renderNodes.map((node, index) => {
            const isCenter = index === 0;
            const position = positions[index] 
              ? [positions[index].x, positions[index].y, positions[index].z] 
              : [0, 0, 0];
           
            return (
              <SphericalPointCloud
                key={`${node.id}-${index}`}
                nodeId={node.id}
                node={node}
                isCenter={isCenter}
                sphereRefs={sphereRefs}
                count={10000}
                radius={sphereSize}
                pointSize={0.05}
                color={autoHoveredSphereId && isCenter ? config?.theme?.pointCloud?.inactiveColor || "black": config?.theme?.pointCloud?.color || "purple"}
                hoverScale={1.4}
                hoverColor={config?.theme?.pointCloud?.hoverColor || "purple"}
                animate={true}
                speed={node.id === autoHoveredSphereId ? 0: 20}
                position={position}
                isAutoHovered={node.id === autoHoveredSphereId}
              />
            );
          })}
        </Suspense>
      </Canvas>
    </div>
  );
};
