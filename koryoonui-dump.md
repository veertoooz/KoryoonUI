This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where line numbers have been added.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/**/*.{js,jsx,ts,tsx}, src/**/*.{css,scss,module.css,module.scss}, *.json, *.config.{js,ts}, *.{md,mdx}, env*, .env*, **/components/**/*, **/hooks/**/*, **/utils/**/*, **/context/**/*, **/store/**/*, **/lib/**/*, **/api/**/*
- Files matching these patterns are excluded: node_modules, .git, .svn, .hg, .next, .vercel, dist, build, out, .cache, .turbo, temp/**, tmp/**, coverage/**, public/**/*.{mp4,avi,mov,mp3,wav}, public/**/*.{zip,rar,7z,tar,gz}
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  components/
    IframeModal.tsx
    LoadingScreen.tsx
    SimpleStars.tsx
    SphereScene.tsx
    SphericalPointCloud.tsx
  hooks/
    useSphereHierarchy.ts
    useSpherePoints.ts
  lib/
    perlin-noise.ts
    scale.ts
    texture-atlas.ts
  demo-entry.js
  koryoon.tsx
  styles.css
  types.ts
package.json
README.md
repomix.config.ts
tsconfig.json
vite.config.ts
```

# Files

## File: repomix.config.ts
````typescript
 1: import { defineConfig } from 'repomix';
 2: 
 3: export default defineConfig({
 4:   // Input settings
 5:   input: {
 6:     maxFileSize: 50000000 // Skip large binary files 
 7:   },
 8:   
 9:   // Output configuration optimized for React projects
10:   output: {
11:     filePath: 'koryoonui-dump.md', // Using .md extension for Markdown output
12:     style: 'markdown', // Using markdown format instead of XML
13:     removeComments: false, // Keep comments for context (especially JSX comments)
14:     removeEmptyLines: false,
15:     showLineNumbers: true, // Helpful for referencing code
16:     directoryStructure: true, // Important for React's component structure
17:     fileSummary: true,
18:     topFilesLength: 10, // Show more files in summary for React projects
19:     
20:     // Git integration
21:     git: {
22:       sortByChanges: true, // Highlight frequently changed files
23:       sortByChangesMaxCommits: 100,
24:       includeDiffs: false,
25:       includeLogs: false
26:     }
27:   },
28:   
29:   // Focus on React-specific files
30:   include: [
31:     'src/**/*.{js,jsx,ts,tsx}', // Core React components
32:     'src/**/*.{css,scss,module.css,module.scss}', // Styling files
33:     '*.json', // package.json and other configs
34:     '*.config.{js,ts}', // Webpack, Vite, Next.js configs
35:     '*.{md,mdx}', // Documentation
36:     'env*', // Environment variables
37:     '.env*',
38:     '**/components/**/*', // Component directories
39:     '**/hooks/**/*', // Custom hooks
40:     '**/utils/**/*', // Utility functions
41:     '**/context/**/*', // Context providers
42:     '**/store/**/*', // State management
43:     '**/lib/**/*', // Library code
44:     '**/api/**/*' // API integration
45:   ],
46:   
47:   // Critical exclusions for React projects
48:   ignore: {
49:     useGitignore: true,
50:     useDotIgnore: true,
51:     useDefaultPatterns: true,
52:     customPatterns: [
53:       'node_modules',
54:       '.git',
55:       '.svn',
56:       '.hg',
57:       '.next',
58:       '.vercel',
59:       'dist',
60:       'build',
61:       'out',
62:       '.cache',
63:       '.turbo',
64:     // Temporary files
65:     'temp/**',
66:       'tmp/**',
67:       'coverage/**',
68:       'public/**/*.{mp4,avi,mov,mp3,wav}',
69:       'public/**/*.{zip,rar,7z,tar,gz}'
70:     ]
71:   },
72:   
73: });
````

## File: src/components/IframeModal.tsx
````typescript
  1: import { useEffect } from 'react';
  2: 
  3: interface IframeModalProps {
  4:   url: string;
  5:   isOpen: boolean;
  6:   onClose: () => void;
  7:   title?: string;
  8: }
  9: 
 10: export const IframeModal = ({ url, isOpen, onClose, title }: IframeModalProps) => {
 11:   useEffect(() => {
 12:     const handleEscape = (e: KeyboardEvent) => {
 13:       if (e.key === 'Escape') onClose();
 14:     };
 15:     if (isOpen) {
 16:       document.addEventListener('keydown', handleEscape);
 17:       document.body.style.overflow = 'hidden';
 18:     }
 19:     return () => {
 20:       document.removeEventListener('keydown', handleEscape);
 21:       document.body.style.overflow = 'unset';
 22:     };
 23:   }, [isOpen, onClose]);
 24: 
 25:   if (!isOpen) return null;
 26: 
 27:   return (
 28:     <div
 29:       style={{
 30:         position: 'fixed',
 31:         inset: 0,
 32:         zIndex: 99999,
 33:         display: 'flex',
 34:         alignItems: 'center',
 35:         justifyContent: 'center',
 36:         background: 'rgba(0,0,0,0.8)',
 37:         backdropFilter: 'blur(4px)',
 38:       }}
 39:       onClick={onClose}
 40:     >
 41:       <div
 42:         style={{
 43:           position: 'relative',
 44:           width: '95vw',
 45:           height: '95vh',
 46:           background: '#1a1a1a',
 47:           borderRadius: '8px',
 48:           boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
 49:           overflow: 'hidden',
 50:         }}
 51:         onClick={(e) => e.stopPropagation()}
 52:       >
 53:         <div
 54:           style={{
 55:             display: 'flex',
 56:             alignItems: 'center',
 57:             justifyContent: 'space-between',
 58:             padding: '1rem',
 59:             background: '#262626',
 60:             borderBottom: '1px solid #404040',
 61:           }}
 62:         >
 63:           <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#fff' }}>
 64:             {title || 'Content'}
 65:           </h2>
 66:           <button
 67:             onClick={onClose}
 68:             style={{
 69:               background: 'transparent',
 70:               border: 'none',
 71:               cursor: 'pointer',
 72:               padding: '0.5rem',
 73:               color: '#fff',
 74:               borderRadius: '50%',
 75:             }}
 76:             aria-label="Close"
 77:           >
 78:             <svg
 79:               xmlns="http://www.w3.org/2000/svg"
 80:               width="24"
 81:               height="24"
 82:               fill="none"
 83:               viewBox="0 0 24 24"
 84:               stroke="currentColor"
 85:             >
 86:               <path
 87:                 strokeLinecap="round"
 88:                 strokeLinejoin="round"
 89:                 strokeWidth={2}
 90:                 d="M6 18L18 6M6 6l12 12"
 91:               />
 92:             </svg>
 93:           </button>
 94:         </div>
 95:         <div style={{ width: '100%', height: 'calc(95vh - 4rem)' }}>
 96:           <iframe
 97:             src={url}
 98:             style={{ width: '100%', height: '100%', border: 'none' }}
 99:             allow="fullscreen"
100:             allowFullScreen
101:             title={title || 'Content'}
102:           />
103:         </div>
104:       </div>
105:     </div>
106:   );
107: };
````

## File: src/components/LoadingScreen.tsx
````typescript
 1: export const LoadingScreen = () => {
 2:   return (
 3:     <div
 4:       className="koryoon-fullscreen koryoon-flex-center koryoon-text-center"
 5:       style={{ background: '#000' }}
 6:     >
 7:       <div>
 8:         <div className="koryoon-spinner" style={{ margin: '0 auto 1rem' }} />
 9:         <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem' }}>
10:           Loading 3D experience...
11:         </p>
12:         <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
13:           Optimized for GeForce 210
14:         </p>
15:       </div>
16:     </div>
17:   );
18: };
````

## File: src/components/SimpleStars.tsx
````typescript
 1: import { useRef, useMemo } from 'react';
 2: 
 3: const SimpleStars = () => {
 4:   const pointsRef = useRef<any>(null);
 5:   
 6:   // Generate minimal stars
 7:   const starPositions = useMemo(() => {
 8:     const count = 1000; // Very low count for GeForce 210
 9:     const positions = new Float32Array(count * 3);
10:     
11:     for (let i = 0; i < count; i++) {
12:       // Simple sphere distribution
13:       const radius = 50 + Math.random() * 70;
14:       const theta = Math.random() * Math.PI * 2;
15:       const phi = Math.acos(Math.random() * 2 - 1);
16:       
17:       positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
18:       positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
19:       positions[i * 3 + 2] = radius * Math.cos(phi);
20:     }
21:     
22:     return positions;
23:   }, []);
24:   
25:   return (
26:     <points ref={pointsRef}>
27:       <bufferGeometry>
28:         <bufferAttribute
29:           attach="attributes-position"
30:           args={[starPositions, 3]}
31:         />
32:       </bufferGeometry>
33:       <pointsMaterial
34:         size={0.3}
35:         sizeAttenuation={true}
36:         color="#ffffff"
37:         transparent
38:         opacity={1}
39:         depthWrite={false}
40:       />
41:     </points>
42:   );
43: };
44: 
45: export default SimpleStars;
````

## File: src/hooks/useSphereHierarchy.ts
````typescript
 1: // src/hooks/useSphereHierarchy.ts
 2: import { useState, useCallback } from 'react';
 3: import type { KoryoonNode, Hierarchy } from '../types';
 4: 
 5: export const useSphereHierarchy = (initialNodes: Hierarchy) => {
 6:   const [nodes, setNodes] = useState(initialNodes);
 7:   const [selectedNodeId, setSelectedNodeId] = useState<string>('');
 8:   const [history, setHistory] = useState<string[]>([]);
 9:   
10:   // Navigate to a node
11:   const navigateTo = useCallback((nodeId: string) => {
12:     setSelectedNodeId(nodeId);
13:     setHistory(prev => [...prev, nodeId]);
14:     
15:     // Update node visibility
16:     setNodes(prev => {
17:       const updated = { ...prev };
18:       
19:       // Hide all nodes first
20:       Object.keys(updated).forEach(id => {
21:         updated[id] = { ...updated[id] };
22:       });
23:       
24:       return updated;
25:     });
26:   }, []);
27:   
28:   // Go back in navigation
29:   const goBack = useCallback(() => {
30:     if (history.length > 1) {
31:       const previousPath = history.slice(0, -1);
32:       const previousNodeId = previousPath[previousPath.length - 1];
33:       
34:       setHistory(previousPath);
35:       setSelectedNodeId(previousNodeId);
36:     }
37:   }, [history]);
38:   
39:   // Toggle node expansion
40:   const toggleExpand = useCallback((nodeId: string) => {
41:     setNodes(prev => ({
42:       ...prev,
43:       [nodeId]: {
44:         ...prev[nodeId],
45:       }
46:     }));
47:   }, []);
48:   
49:   // Get current visible nodes for rendering
50:   const getVisibleNodes = useCallback((): KoryoonNode[] => {
51:     const selected = nodes[selectedNodeId];
52:     if (!selected) return [];
53:     
54:     const visible: KoryoonNode[] = [selected];
55:     
56:     // Always show children of selected node
57:     selected.childrenIds.forEach(childId => {
58:       const child = nodes[childId];
59:       if (child) {
60:         visible.push(child);
61:       }
62:     });
63:     
64:     return visible;
65:   }, [nodes, selectedNodeId]);
66:   
67:   // Get breadcrumb path
68:   const getBreadcrumb = useCallback((): KoryoonNode[] => {
69:     const path: KoryoonNode[] = [];
70:     let currentNode = nodes[selectedNodeId];
71:     
72:     while (currentNode) {
73:       path.unshift(currentNode);
74:       if (!currentNode.parentId) break;
75:       currentNode = nodes[currentNode.parentId];
76:     }
77:     
78:     return path;
79:   }, [nodes, selectedNodeId]);
80:   
81:   return {
82:     nodes,
83:     selectedNodeId,
84:     history,
85:     navigateTo,
86:     goBack,
87:     toggleExpand,
88:     getVisibleNodes,
89:     getBreadcrumb,
90:     setSelectedNodeId
91:   };
92: };
````

## File: src/hooks/useSpherePoints.ts
````typescript
 1: import { useMemo } from 'react';
 2: import type { SpherePosition } from '../types';
 3: 
 4: interface Options {
 5:   count: number;
 6:   radius?: number;
 7:   center?: [number, number, number];
 8: }
 9: 
10: export const useSpherePoints = ({
11:   count,
12:   radius = 6,
13:   center = [0, 0, 0],
14: }: Options): SpherePosition[] =>
15:   useMemo(() => {
16:     if (count === 0) return [];
17: 
18:     const [cx, cy, cz] = center;
19:     const points: SpherePosition[] = [];
20:     const goldenRatio = (1 + Math.sqrt(5)) / 2;
21: 
22:     // We start loop at 0. 
23:     // If we want index 0 to be the Center Node, we handle it specifically.
24:     for (let i = 0; i < count; i++) {
25:       if (i === 0) {
26:         // Place the first item (Current Node) dead center
27:         points.push({ x: cx, y: cy, z: cz, theta: 0, phi: 0, index: 0 });
28:         continue;
29:       }
30: 
31:       // Distribute the rest (Children) on the sphere surface
32:       // We adjust index (i - 1) so the math stays uniform for the children
33:       const childIndex = i - 1; 
34:       const childCount = count - 1;
35:       
36:       const theta = (2 * Math.PI * childIndex) / goldenRatio;
37:       const phi = Math.acos(1 - (2 * (childIndex + 0.5)) / childCount);
38: 
39:       points.push({
40:         x: cx + radius * Math.sin(phi) * Math.cos(theta),
41:         y: cy + radius * Math.sin(phi) * Math.sin(theta),
42:         z: cz + radius * Math.cos(phi),
43:         theta,
44:         phi,
45:         index: i,
46:       });
47:     }
48: 
49:     return points;
50:   }, [count, radius, center]);
````

## File: src/lib/perlin-noise.ts
````typescript
  1: 'use client';
  2: // src/lib/perlin-noise.ts
  3: // Classic 3D Perlin noise implementation
  4: class PerlinNoise {
  5:     private permutation: number[];
  6:     
  7:     constructor(seed: number = Math.random() * 256) {
  8:       this.permutation = new Array(512);
  9:       const p = new Array(256);
 10:       
 11:       for (let i = 0; i < 256; i++) {
 12:         p[i] = i;
 13:       }
 14:       
 15:       // Shuffle array using seed
 16:       for (let i = 255; i > 0; i--) {
 17:         const j = Math.floor(this.fract(Math.sin(seed + i) * 43758.5453123) * (i + 1));
 18:         [p[i], p[j]] = [p[j], p[i]];
 19:       }
 20:       
 21:       for (let i = 0; i < 512; i++) {
 22:         this.permutation[i] = p[i & 255];
 23:       }
 24:     }
 25:     
 26:     private fract(x: number): number {
 27:       return x - Math.floor(x);
 28:     }
 29:     
 30:     private fade(t: number): number {
 31:       return t * t * t * (t * (t * 6 - 15) + 10);
 32:     }
 33:     
 34:     private lerp(t: number, a: number, b: number): number {
 35:       return a + t * (b - a);
 36:     }
 37:     
 38:     private grad(hash: number, x: number, y: number, z: number): number {
 39:       const h = hash & 15;
 40:       const u = h < 8 ? x : y;
 41:       const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
 42:       return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
 43:     }
 44:     
 45:     noise(x: number, y: number, z: number): number {
 46:       const X = Math.floor(x) & 255;
 47:       const Y = Math.floor(y) & 255;
 48:       const Z = Math.floor(z) & 255;
 49:       
 50:       x -= Math.floor(x);
 51:       y -= Math.floor(y);
 52:       z -= Math.floor(z);
 53:       
 54:       const u = this.fade(x);
 55:       const v = this.fade(y);
 56:       const w = this.fade(z);
 57:       
 58:       const A = this.permutation[X] + Y;
 59:       const AA = this.permutation[A] + Z;
 60:       const AB = this.permutation[A + 1] + Z;
 61:       const B = this.permutation[X + 1] + Y;
 62:       const BA = this.permutation[B] + Z;
 63:       const BB = this.permutation[B + 1] + Z;
 64:       
 65:       return this.lerp(
 66:         w,
 67:         this.lerp(
 68:           v,
 69:           this.lerp(u, this.grad(this.permutation[AA], x, y, z), this.grad(this.permutation[BA], x - 1, y, z)),
 70:           this.lerp(u, this.grad(this.permutation[AB], x, y - 1, z), this.grad(this.permutation[BB], x - 1, y - 1, z))
 71:         ),
 72:         this.lerp(
 73:           v,
 74:           this.lerp(u, this.grad(this.permutation[AA + 1], x, y, z - 1), this.grad(this.permutation[BA + 1], x - 1, y, z - 1)),
 75:           this.lerp(u, this.grad(this.permutation[AB + 1], x, y - 1, z - 1), this.grad(this.permutation[BB + 1], x - 1, y - 1, z - 1))
 76:         )
 77:       );
 78:     }
 79:     
 80:     // Multi-octave Perlin noise (fractal Brownian motion)
 81:     fbm(
 82:       x: number, 
 83:       y: number, 
 84:       z: number, 
 85:       octaves: number = 4, 
 86:       persistence: number = 0.5, 
 87:       lacunarity: number = 2.0
 88:     ): number {
 89:       let value = 0;
 90:       let amplitude = 1;
 91:       let frequency = 1;
 92:       let maxValue = 0;
 93:       
 94:       for (let i = 0; i < octaves; i++) {
 95:         value += this.noise(x * frequency, y * frequency, z * frequency) * amplitude;
 96:         maxValue += amplitude;
 97:         amplitude *= persistence;
 98:         frequency *= lacunarity;
 99:       }
100:       
101:       return value / maxValue;
102:     }
103:   }
104:   
105:   // Create a singleton instance with seeded randomness for consistent animation
106:   const perlin = new PerlinNoise(12345);
107:   
108:   export { perlin, PerlinNoise };
````

## File: src/lib/scale.ts
````typescript
 1: import type { KoryoonScaleConfig } from '../types';
 2: 
 3: const DEFAULTS = {
 4:   orbitRadiusBase: 4,
 5:   sphereSizeBase: 1.5,
 6:   centerSphereScreenFraction: 1 / 3,
 7:   fitPadding: 1.2,
 8:   referenceHeight: 600,
 9: };
10: 
11: export function computeScale(
12:   n: number,
13:   config?: KoryoonScaleConfig,
14:   containerHeight = 600,
15:   fovDeg = 50
16: ) {
17:   const base = config?.orbitRadiusBase ?? DEFAULTS.orbitRadiusBase;
18:   const sizeBase = config?.sphereSizeBase ?? DEFAULTS.sphereSizeBase;
19:   const centerFraction =
20:     config?.centerSphereScreenFraction ?? DEFAULTS.centerSphereScreenFraction;
21:   const fitPadding = config?.fitPadding ?? DEFAULTS.fitPadding;
22:   const referenceHeight = config?.referenceHeight ?? DEFAULTS.referenceHeight;
23: 
24:   const scaleFactor = 1 + Math.sqrt(Math.max(0, n - 1));
25:   const orbitRadius = base * scaleFactor;
26:   const sphereSize = sizeBase / scaleFactor;
27: 
28:   // Scale scene to container height (referenceHeight px = 1 unit)
29:   const sceneScale = Math.max(containerHeight / referenceHeight, 0.5);
30:   const worldOrbitRadius = orbitRadius * sceneScale;
31:   const worldSphereSize = sphereSize * sceneScale;
32: 
33:   // Perspective: center sphere occupies centerFraction of screen
34:   // screenFraction = sphereSize / (cameraDistance * tan(fov/2))
35:   // cameraDistance = sphereSize / (centerFraction * tan(fov/2))
36:   const fovRad = (fovDeg * Math.PI) / 180;
37:   const tanHalfFov = Math.tan(fovRad / 2);
38:   const cameraForCenterThird =
39:     worldSphereSize / (centerFraction * tanHalfFov);
40: 
41:   // Fit all spheres: bounding radius must fit in view
42:   const boundingRadius = worldOrbitRadius + worldSphereSize;
43:   const cameraForFitAll = (boundingRadius * fitPadding) / tanHalfFov;
44: 
45:   const cameraDistance = Math.max(cameraForCenterThird, cameraForFitAll);
46: 
47:   return {
48:     orbitRadius: worldOrbitRadius,
49:     sphereSize: worldSphereSize,
50:     cameraDistance,
51:     scaleFactor,
52:     sceneScale,
53:   };
54: }
````

## File: src/lib/texture-atlas.ts
````typescript
  1: import { CanvasTexture, LinearFilter } from 'three';
  2: 
  3: export class TextureAtlas {
  4:   private canvas: HTMLCanvasElement;
  5:   private ctx: CanvasRenderingContext2D;
  6:   private texture: CanvasTexture;
  7:   private loaded = false;
  8:   private readonly size = 2048;
  9:   private readonly grid = 4; // 4x4 = 16 regions
 10:   private cellSize: number;
 11: 
 12:   constructor() {
 13:     this.canvas = document.createElement('canvas');
 14:     this.canvas.width = this.size;
 15:     this.canvas.height = this.size;
 16:     this.ctx = this.canvas.getContext('2d')!;
 17:     this.cellSize = this.size / this.grid;
 18:     this.texture = new CanvasTexture(this.canvas);
 19:     this.texture.minFilter = LinearFilter;
 20:     this.texture.magFilter = LinearFilter;
 21:     this.texture.needsUpdate = true;
 22:   }
 23: 
 24:   generateAtlas(): void {
 25:     if (this.loaded) return;
 26: 
 27:     // Clear canvas
 28:     this.ctx.fillStyle = '#000';
 29:     this.ctx.fillRect(0, 0, this.size, this.size);
 30: 
 31:     // Predefined planet palettes
 32:     const palettes = [
 33:       { primary: '#FF9966', secondary: '#CC6600', type: 'gas' },
 34:       { primary: '#666666', secondary: '#333333', type: 'rock' },
 35:       { primary: '#66CCFF', secondary: '#0066CC', type: 'ice' },
 36:       { primary: '#FF3300', secondary: '#990000', type: 'lava' },
 37:       { primary: '#339933', secondary: '#006600', type: 'earth' },
 38:       { primary: '#FFCC66', secondary: '#CC9900', type: 'desert' },
 39:       { primary: '#0066CC', secondary: '#003366', type: 'water' },
 40:       { primary: '#999999', secondary: '#666666', type: 'metal' },
 41:       { primary: '#9966CC', secondary: '#663399', type: 'magic' },
 42:       { primary: '#FF6699', secondary: '#CC3366', type: 'candy' },
 43:       { primary: '#33CC99', secondary: '#009966', type: 'jungle' },
 44:       { primary: '#FFCC33', secondary: '#FF9900', type: 'sun' },
 45:       { primary: '#99CCFF', secondary: '#6699CC', type: 'sky' },
 46:       { primary: '#CC99FF', secondary: '#9966CC', type: 'purple' },
 47:       { primary: '#FF6666', secondary: '#CC3333', type: 'mars' },
 48:       { primary: '#66FF99', secondary: '#33CC66', type: 'neon' }
 49:     ];
 50: 
 51:     for (let y = 0; y < this.grid; y++) {
 52:       for (let x = 0; x < this.grid; x++) {
 53:         const index = y * this.grid + x;
 54:         const palette = palettes[index % palettes.length];
 55:         this.drawPlanetCell(x, y, palette);
 56:       }
 57:     }
 58: 
 59:     this.loaded = true;
 60:     this.texture.needsUpdate = true;
 61:   }
 62: 
 63:   private drawPlanetCell(x: number, y: number, palette: { primary: string; secondary: string }): void {
 64:     const px = x * this.cellSize;
 65:     const py = y * this.cellSize;
 66:     
 67:     // Draw gradient background
 68:     const gradient = this.ctx.createRadialGradient(
 69:       px + this.cellSize / 2,
 70:       py + this.cellSize / 2,
 71:       0,
 72:       px + this.cellSize / 2,
 73:       py + this.cellSize / 2,
 74:       this.cellSize / 2
 75:     );
 76:     gradient.addColorStop(0, palette.primary);
 77:     gradient.addColorStop(1, palette.secondary);
 78:     
 79:     this.ctx.fillStyle = gradient;
 80:     this.ctx.beginPath();
 81:     this.ctx.arc(
 82:       px + this.cellSize / 2,
 83:       py + this.cellSize / 2,
 84:       this.cellSize / 2 - 10,
 85:       0,
 86:       Math.PI * 2
 87:     );
 88:     this.ctx.fill();
 89: 
 90:     // Add surface details
 91:     this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
 92:     for (let i = 0; i < 8; i++) {
 93:       const cx = px + 20 + Math.random() * (this.cellSize - 40);
 94:       const cy = py + 20 + Math.random() * (this.cellSize - 40);
 95:       const radius = Math.random() * 12 + 4;
 96:       this.ctx.beginPath();
 97:       this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
 98:       this.ctx.fill();
 99:     }
100: 
101:     // Add highlights
102:     this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
103:     for (let i = 0; i < 4; i++) {
104:       const hx = px + 15 + Math.random() * (this.cellSize - 30);
105:       const hy = py + 15 + Math.random() * (this.cellSize - 30);
106:       const hradius = Math.random() * 6 + 2;
107:       this.ctx.beginPath();
108:       this.ctx.arc(hx, hy, hradius, 0, Math.PI * 2);
109:       this.ctx.fill();
110:     }
111: 
112:     // Add atmospheric lines
113:     this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
114:     this.ctx.lineWidth = 1.5;
115:     for (let i = 0; i < 3; i++) {
116:       const startAngle = Math.random() * Math.PI * 2;
117:       const endAngle = startAngle + Math.PI * (0.3 + Math.random() * 0.4);
118:       this.ctx.beginPath();
119:       this.ctx.arc(
120:         px + this.cellSize / 2,
121:         py + this.cellSize / 2,
122:         this.cellSize / 2 - 15,
123:         startAngle,
124:         endAngle
125:       );
126:       this.ctx.stroke();
127:     }
128:   }
129: 
130:   getTextureRegion(index: number): { offset: [number, number]; repeat: [number, number] } {
131:     const x = (index % this.grid) / this.grid;
132:     const y = Math.floor(index / this.grid) / this.grid;
133:     const repeat = 1 / this.grid;
134:     
135:     return {
136:       offset: [x, y],
137:       repeat: [repeat, repeat]
138:     };
139:   }
140: 
141:   getTexture(): CanvasTexture {
142:     return this.texture;
143:   }
144: 
145:   isLoaded(): boolean {
146:     return this.loaded;
147:   }
148: 
149:   dispose(): void {
150:     this.texture.dispose();
151:   }
152: }
153: 
154: // Singleton instance
155: let atlasInstance: TextureAtlas | null = null;
156: 
157: export const getTextureAtlas = (): TextureAtlas => {
158:   if (!atlasInstance) {
159:     atlasInstance = new TextureAtlas();
160:   }
161:   return atlasInstance;
162: };
````

## File: src/demo-entry.js
````javascript
 1: /**
 2:  * Koryoon demo — loads hierarchy and initializes the viewer
 3:  */
 4: import { init } from './koryoon';
 5: 
 6: init({
 7:   container: '#koryoon-root',
 8:   hierarchy: {},
 9:   hierarchyUrl: '/hiphop.json',
10:   rootNodeId: 'hiphop',
11: });
````

## File: src/koryoon.tsx
````typescript
 1: /**
 2:  * Koryoon — 3D hierarchy visualization library
 3:  * Entry point for CDN and module usage
 4:  */
 5: 
 6: import './styles.css';
 7: import { createRoot } from 'react-dom/client';
 8: import { StrictMode } from 'react';
 9: import { SphereScene } from './components/SphereScene';
10: import type { Hierarchy, KoryoonConfig, KoryoonState } from './types';
11: 
12: export interface KoryoonInitOptions {
13:   container: string | HTMLElement;
14:   hierarchy: Hierarchy;
15:   hierarchyUrl?: string;
16:   rootNodeId?: string;
17:   config?: KoryoonConfig;
18:   onStateChange?: (state: KoryoonState) => void;
19: }
20: 
21: export interface KoryoonInstance {
22:   getState: () => KoryoonState | null;
23:   navigateTo: (id: string) => void;
24:   goBack: () => void;
25: }
26: 
27: function resolveRootNodeId(hierarchy: Hierarchy, explicit?: string): string {
28:   if (explicit && hierarchy[explicit]) return explicit;
29:   const root = Object.values(hierarchy).find(n => n.parentId === null);
30:   return root?.id ?? Object.keys(hierarchy)[0] ?? '';
31: }
32: 
33: /**
34:  * Initialize Koryoon viewer.
35:  */
36: export function init(options: KoryoonInitOptions): KoryoonInstance {
37:   const el =
38:     typeof options.container === 'string'
39:       ? document.querySelector(options.container)
40:       : options.container;
41: 
42:   if (!el || !(el instanceof HTMLElement)) {
43:     console.error('Koryoon: container must be a valid selector or HTMLElement');
44:     return {
45:       getState: () => null,
46:       navigateTo: () => {},
47:       goBack: () => {},
48:     };
49:   }
50: 
51:   const hierarchy = options.hierarchy ?? {};
52:   const rootNodeId =
53:     options.rootNodeId ?? resolveRootNodeId(hierarchy);
54: 
55:   let handlers: { getState: () => KoryoonState; navigateTo: (id: string) => void; goBack: () => void } | null = null;
56: 
57:   const root = createRoot(el);
58:   root.render(
59:     <StrictMode>
60:       <SphereScene
61:         hierarchy={hierarchy}
62:         hierarchyUrl={options.hierarchyUrl}
63:         rootNodeId={rootNodeId || undefined}
64:         config={options.config}
65:         onStateChange={options.onStateChange}
66:         onRegisterHandlers={(h) => {
67:           handlers = h;
68:         }}
69:       />
70:     </StrictMode>
71:   );
72: 
73:   return {
74:     getState: () => (handlers ? handlers.getState() : null),
75:     navigateTo: (id: string) => handlers?.navigateTo(id),
76:     goBack: () => handlers?.goBack(),
77:   };
78: }
79: 
80: if (typeof window !== 'undefined') {
81:   (window as any).Koryoon = { init };
82: }
````

## File: src/styles.css
````css
 1: /* Koryoon library styles — minimal, no Tailwind/DaisyUI */
 2: 
 3: /* Loading spinner */
 4: .koryoon-spinner {
 5:   width: 3rem;
 6:   height: 3rem;
 7:   border: 3px solid rgba(255, 255, 255, 0.2);
 8:   border-top-color: white;
 9:   border-radius: 50%;
10:   animation: koryoon-spin 0.8s linear infinite;
11: }
12: 
13: @keyframes koryoon-spin {
14:   to { transform: rotate(360deg); }
15: }
16: 
17: /* Layout utilities */
18: .koryoon-fullscreen {
19:   width: 100%;
20:   height: 100%;
21: }
22: 
23: .koryoon-flex-center {
24:   display: flex;
25:   align-items: center;
26:   justify-content: center;
27: }
28: 
29: .koryoon-text-center {
30:   text-align: center;
31: }
````

## File: README.md
````markdown
 1: # Koryoon UI
 2: 
 3: 3D hierarchy visualization library — interactive sphere navigation built with React Three Fiber.
 4: 
 5: ## Installation
 6: 
 7: ```bash
 8: npm install koryoon-ui
 9: ```
10: 
11: ## Usage
12: 
13: ### CDN (IIFE)
14: 
15: ```html
16: <link rel="stylesheet" href="https://unpkg.com/koryoon-ui/dist/koryoon.css">
17: <script src="https://unpkg.com/koryoon-ui/dist/koryoon.min.js"></script>
18: <div id="koryoon-root"></div>
19: <script>
20:   Koryoon.init({
21:     container: '#koryoon-root',
22:     hierarchy: { /* your hierarchy */ },
23:     rootNodeId: 'root',
24:     hierarchyUrl: '/path/to/hierarchy.json'  // optional
25:   });
26: </script>
27: ```
28: 
29: ### With a bundler
30: 
31: Import the built IIFE and styles:
32: 
33: ```js
34: import 'koryoon-ui/style';
35: 
36: // Script adds Koryoon to window, or load via script tag
37: const { init } = window.Koryoon;
38: 
39: init({
40:   container: '#koryoon-root',
41:   hierarchy: yourHierarchy,
42:   rootNodeId: 'root',
43:   hierarchyUrl: '/api/hierarchy.json',
44:   config: { scale: { sphereSizeBase: 10 } },
45:   onStateChange: (state) => console.log(state)
46: });
47: ```
48: 
49: ## Hierarchy format
50: 
51: Each node needs `id`, `name`, `parentId`, `childrenIds`. Root has `parentId: null`.
52: 
53: ```json
54: {
55:   "root": {
56:     "id": "root",
57:     "name": "Root",
58:     "parentId": null,
59:     "childrenIds": ["child1", "child2"]
60:   },
61:   "child1": {
62:     "id": "child1",
63:     "name": "Child 1",
64:     "parentId": "root",
65:     "childrenIds": []
66:   }
67: }
68: ```
69: 
70: ## Examples
71: 
72: See `examples/demo.html` and `examples/sample-hierarchy.json` in the package.
73: 
74: ## License
75: 
76: MIT
````

## File: tsconfig.json
````json
 1: {
 2:   "compilerOptions": {
 3:     "target": "ES2020",
 4:     "lib": ["dom", "dom.iterable", "esnext"],
 5:     "allowJs": true,
 6:     "skipLibCheck": true,
 7:     "strict": true,
 8:     "noEmit": true,
 9:     "esModuleInterop": true,
10:     "module": "ESNext",
11:     "moduleResolution": "bundler",
12:     "resolveJsonModule": true,
13:     "isolatedModules": true,
14:     "jsx": "react-jsx"
15:   },
16:   "include": ["src/**/*.ts", "src/**/*.tsx", "vite.config.ts"],
17:   "exclude": ["node_modules"]
18: }
````

## File: vite.config.ts
````typescript
 1: import { defineConfig } from "vite";
 2: 
 3: export default defineConfig({
 4:   publicDir: "public",
 5:   define: {
 6:     "process.env.NODE_ENV": JSON.stringify("production"),
 7:   },
 8:   build: {
 9:     copyPublicDir: false,
10:     minify: false,
11:     lib: {
12:       entry: "src/koryoon.tsx",
13:       name: "Koryoon",
14:       fileName: "koryoon",
15:       formats: ["iife"],
16:     },
17:     rollupOptions: {
18:       output: {
19:         extend: true,
20:         inlineDynamicImports: true,
21:         entryFileNames: "koryoon.min.js",
22:       },
23:     },
24:     outDir: "dist",
25:     emptyOutDir: true,
26:   },
27: });
````

## File: src/components/SphericalPointCloud.tsx
````typescript
  1: import React, { useRef, useMemo } from 'react';
  2: import { Points, PointMaterial, Html } from '@react-three/drei';
  3: import * as THREE from 'three';
  4: import { useFrame } from '@react-three/fiber';
  5: import type { KoryoonNode } from '../types';
  6: 
  7: interface SphericalPointCloudProps {
  8:     count?: number;
  9:     radius?: number;
 10:     pointSize?: number;
 11:     color?: string;
 12:     animate?: boolean;
 13:     speed?: number;
 14:     noise?: boolean;
 15:     noiseScale?: number;
 16:     distribution?: 'uniform' | 'fibonacci' | 'random';
 17:     opacity?: number;
 18:     node: KoryoonNode;
 19:     transparent?: boolean;
 20:     isCenter?: boolean;
 21:     hoverScale?: number;
 22:     hoverDuration?: number;
 23:     hoverColor?: string;
 24:     isAutoHovered?: boolean;
 25:     nodeId?: string;
 26:     sphereRefs?: React.MutableRefObject<Map<string, THREE.Points>>;
 27:     [key: string]: any;
 28: }
 29: 
 30: const SphericalPointCloud: React.FC<SphericalPointCloudProps> = ({
 31:     count = 10000,
 32:     radius = 5,
 33:     isCenter = false,
 34:     pointSize = 0.05,
 35:     node,
 36:     isVisible = true,
 37:     color = 'purple',
 38:     animate = true,
 39:     speed = 1,
 40:     noise = true,
 41:     noiseScale = 0.5,
 42:     distribution = 'uniform',
 43:     opacity = 1,
 44:     transparent = true,
 45:     hoverScale = 1.2,
 46:     hoverDuration = 0.3,
 47:     hoverColor = 'white',
 48:     isAutoHovered = false,
 49:     nodeId,
 50:     sphereRefs,
 51:     ...props
 52: }) => {
 53:     const pointsRef = useRef<THREE.Points>(null);
 54: 
 55:     // Register this sphere with parent's ref map and add radius property
 56:     React.useEffect(() => {
 57:         if (pointsRef.current && nodeId && sphereRefs) {
 58:             // Add radius property to the mesh for raycasting
 59:             (pointsRef.current as any).radius = radius;
 60:             sphereRefs.current.set(nodeId, pointsRef.current);
 61:             return () => {
 62:                 sphereRefs.current.delete(nodeId);
 63:             };
 64:         }
 65:     }, [nodeId, sphereRefs, radius]);
 66: 
 67:     const scale = isAutoHovered ? hoverScale : 1;
 68:     const materialColor = isAutoHovered ? (hoverColor || color) : color;
 69:     const materialSize = isAutoHovered ? pointSize * 1.3 : pointSize;
 70: 
 71:     // Generate spherical point positions
 72:     const positions = useMemo(() => {
 73:         const positions = new Float32Array(count * 3);
 74: 
 75:         for (let i = 0; i < count; i++) {
 76:             let x: number, y: number, z: number;
 77: 
 78:             switch (distribution) {
 79:                 case 'fibonacci': {
 80:                     const goldenAngle = Math.PI * (3 - Math.sqrt(5));
 81:                     const offset = 2 / count;
 82:                     const yPos = 1 - (i * offset) - (offset / 2);
 83:                     const radiusAtY = Math.sqrt(1 - yPos * yPos);
 84:                     const phi = i * goldenAngle;
 85: 
 86:                     x = Math.cos(phi) * radiusAtY;
 87:                     y = yPos;
 88:                     z = Math.sin(phi) * radiusAtY;
 89:                     break;
 90:                 }
 91: 
 92:                 case 'random': {
 93:                     const theta = 2 * Math.PI * Math.random();
 94:                     const phiRandom = Math.acos(2 * Math.random() - 1);
 95:                     const r = radius * Math.cbrt(Math.random());
 96: 
 97:                     x = r * Math.sin(phiRandom) * Math.cos(theta);
 98:                     y = r * Math.sin(phiRandom) * Math.sin(theta);
 99:                     z = r * Math.cos(phiRandom);
100:                     break;
101:                 }
102: 
103:                 case 'uniform':
104:                 default: {
105:                     const u = Math.random();
106:                     const v = Math.random();
107:                     const thetaUniform = 2 * Math.PI * u;
108:                     const phiUniform = Math.acos(2 * v - 1);
109: 
110:                     x = radius * Math.sin(phiUniform) * Math.cos(thetaUniform);
111:                     y = radius * Math.sin(phiUniform) * Math.sin(thetaUniform);
112:                     z = radius * Math.cos(phiUniform);
113:                     break;
114:                 }
115:             }
116: 
117:             if (noise) {
118:                 const noiseX = (Math.random() - 0.5) * noiseScale;
119:                 const noiseY = (Math.random() - 0.5) * noiseScale;
120:                 const noiseZ = (Math.random() - 0.5) * noiseScale;
121: 
122:                 positions[i * 3] = x + noiseX;
123:                 positions[i * 3 + 1] = y + noiseY;
124:                 positions[i * 3 + 2] = z + noiseZ;
125:             } else {
126:                 positions[i * 3] = x;
127:                 positions[i * 3 + 1] = y;
128:                 positions[i * 3 + 2] = z;
129:             }
130:         }
131: 
132:         return positions;
133:     }, [count, radius, distribution, noise, noiseScale]);
134: 
135:     // Rotation animation
136:     useFrame((state) => {
137:         if (animate && pointsRef.current) {
138:             pointsRef.current.rotation.y += 0.001 * speed;
139:             pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
140:         }
141:     });
142:  
143:     return (
144:         <group>
145:             <Points
146:                 ref={pointsRef}
147:                 positions={positions}
148:                 scale={scale}
149:                 {...props}
150:             >
151:                 <PointMaterial
152:                     transparent={transparent}
153:                     color={materialColor}
154:                     size={materialSize}
155:                     sizeAttenuation={true}
156:                     depthWrite={false}
157:                     opacity={color === 'black' ? 0 : opacity}
158:                     blending={THREE.AdditiveBlending}
159:                 />
160:                 {/* Text label */}
161:                 <Html
162:                     position={[0, 0, 0]}
163:                     center
164:                     distanceFactor={10}
165:                     style={{
166:                         pointerEvents: 'none',
167:                         transition: 'all 0.3s ease',
168:                         opacity: isVisible ? 1 : 0,
169:                         letterSpacing: '1.5vw',
170:                         position: 'relative',
171:                         textAlign: 'center',
172:                         padding: '2.5vw',
173:                         zIndex: 9999,
174:                     }}
175:                 >
176:                     <div
177:                       style={{
178:                         opacity: isCenter && isAutoHovered !== isCenter ? 0 : 1,
179:                         transition: 'all 0.3s',
180:                       }}
181:                     >
182:                         <div
183:                           style={{
184:                             fontWeight: isAutoHovered ? 700 : 400,
185:                             color: '#fff',
186:                             fontSize: isAutoHovered ? (isCenter ? '4vw' : '10vw') : '4vw',
187:                             transition: 'all 0.3s',
188:                           }}
189:                         >
190:                           {node.name}
191:                         </div>
192:                     </div>
193:                 </Html>
194:             </Points>
195:         </group>
196:     );
197: };
198: 
199: export default SphericalPointCloud;
````

## File: src/types.ts
````typescript
 1: /**
 2:  * Koryoon Library — Data Contract
 3:  *
 4:  * A node has EITHER children OR component, never both.
 5:  * - Parent (childrenIds.length > 0): no component
 6:  * - Leaf (childrenIds.length === 0): may have component
 7:  */
 8: 
 9: export interface NodeComponent {
10:   componentType: string;
11:   data: Record<string, any>;
12: }
13: 
14: export interface KoryoonNode {
15:   id: string;
16:   name: string;
17:   parentId: string | null;
18:   childrenIds: string[];
19: 
20:   /** Only when childrenIds.length === 0 (leaf node) */
21:   component?: NodeComponent;
22: 
23:   /** Optional metadata — library passes through */
24:   radius?: number;
25:   color?: string;
26:   description?: string;
27:   iframe?: string;
28: 
29:   [key: string]: unknown;
30: }
31: 
32: export type Hierarchy = Record<string, KoryoonNode>;
33: 
34: export interface KoryoonScaleConfig {
35:   /** Base orbit radius for child spheres (default 4) */
36:   orbitRadiusBase?: number;
37:   /** Base size for center sphere (default 1.5) */
38:   sphereSizeBase?: number;
39:   /** Center sphere as fraction of screen height (default 1/3) */
40:   centerSphereScreenFraction?: number;
41:   /** Padding when fitting all spheres in view (default 1.2) */
42:   fitPadding?: number;
43:   /** Reference height in px: 1 unit = containerHeight/referenceHeight (default 600) */
44:   referenceHeight?: number;
45: }
46: 
47: export interface KoryoonConfig {
48:   /** Default: first node with parentId === null */
49:   rootNodeId?: string;
50:   scale?: KoryoonScaleConfig;
51:   theme?: {
52:     pointCloud?: {
53:       inactiveColor: string;
54:       hoverColor: string;
55:       color: string;
56:     }
57:   }
58: }
59: 
60: export interface KoryoonState {
61:   currentNodeId: string;
62:   history: string[];
63:   currentNode: KoryoonNode | null;
64:   childrenNodes: KoryoonNode[];
65:   hoveredNodeId: string | null;
66:   canGoBack: boolean;
67:   hierarchy: Hierarchy;
68:   isLoading: boolean;
69:   error: string | null;
70: }
71: 
72: export interface SpherePosition {
73:   x: number;
74:   y: number;
75:   z: number;
76:   theta: number;
77:   phi: number;
78:   index: number;
79: }
80: 
81: /**
82:  * Returns false if node has both children and component (invalid).
83:  * Valid: (childrenIds.length > 0 && !component) || (childrenIds.length === 0)
84:  */
85: export function isValidNode(node: KoryoonNode): boolean {
86:   const hasChildren = node.childrenIds.length > 0;
87:   const hasComponent = node.component != null;
88:   return !(hasChildren && hasComponent);
89: }
````

## File: src/components/SphereScene.tsx
````typescript
  1: import { Canvas } from '@react-three/fiber';
  2: import { OrbitControls } from '@react-three/drei';
  3: import { useState, useMemo, useEffect, useCallback, useRef, Suspense } from 'react';
  4: import * as THREE from 'three';
  5: import { useSpherePoints } from '../hooks/useSpherePoints';
  6: import { computeScale } from '../lib/scale';
  7: import SimpleStars from './SimpleStars';
  8: import { IframeModal } from './IframeModal';
  9: import { LoadingScreen } from './LoadingScreen';
 10: import { getTextureAtlas } from '../lib/texture-atlas';
 11: import SphericalPointCloud from './SphericalPointCloud';
 12: import type { Hierarchy, KoryoonNode, KoryoonState, KoryoonConfig } from '../types';
 13: 
 14: // Constants
 15: const DEFAULT_ROOT_NODE_ID = 'hiphop';
 16: const DEFAULT_CENTER: [number, number, number] = [0, 0, 0];
 17: const CAMERA_FOV = 50;
 18: const TRANSITION_DURATION_MS = 250;
 19: 
 20: export interface KoryoonHandlers {
 21:   getState: () => KoryoonState;
 22:   navigateTo: (id: string) => void;
 23:   goBack: () => void;
 24: }
 25: 
 26: interface SphereSceneProps {
 27:   hierarchy: Hierarchy;
 28:   rootNodeId?: string;
 29:   hierarchyUrl?: string;
 30:   config?: KoryoonConfig;
 31:   onStateChange?: (state: KoryoonState) => void;
 32:   onRegisterHandlers?: (handlers: KoryoonHandlers) => void;
 33: }
 34: 
 35: export const SphereScene = ({ hierarchy: initialHierarchy, rootNodeId: propsRootNodeId, hierarchyUrl, config, onStateChange, onRegisterHandlers }: SphereSceneProps) => {
 36:   const rootNodeId = propsRootNodeId ?? DEFAULT_ROOT_NODE_ID;
 37: 
 38:   // State management
 39:   const [currentId, setCurrentId] = useState<string>(rootNodeId);
 40:   const [history, setHistory] = useState<string[]>([rootNodeId]);
 41:   const [isVisible, setIsVisible] = useState(true);
 42:   const [iframeModal, setIframeModal] = useState<{ url: string; title: string } | null>(null);
 43:   const [loading, setLoading] = useState(true);
 44:   const [webglError, setWebglError] = useState<string | null>(null);
 45:   
 46:   // Hierarchy state
 47:   const [hierarchy, setHierarchy] = useState<Hierarchy>(initialHierarchy);
 48: 
 49:   // Auto-hover state
 50:   const [autoHoveredSphereId, setAutoHoveredSphereId] = useState<string | null>(null);
 51: 
 52:   // Container size (for screen-relative scaling)
 53:   const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
 54: 
 55:   // Refs
 56:   const containerRef = useRef<HTMLDivElement>(null);
 57:   const controlsRef = useRef<any>(null);
 58:   const cameraRef = useRef<THREE.Camera>(null);
 59:   const sphereRefs = useRef<Map<string, THREE.Points>>(new Map());
 60:   const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
 61:   const hoverAnimationRef = useRef<number | undefined>(undefined);
 62:   const canvasRef = useRef<HTMLCanvasElement>(null);
 63: 
 64:   // Fetch hierarchy data if hierarchyUrl provided
 65:   useEffect(() => {
 66:     if (!hierarchyUrl) {
 67:       setLoading(false);
 68:       return;
 69:     }
 70:     const fetchHierarchy = async () => {
 71:       try {
 72:         const response = await fetch(hierarchyUrl);
 73:         if (!response.ok) {
 74:           throw new Error(`HTTP error! status: ${response.status}`);
 75:         }
 76:         const data: Hierarchy = await response.json();
 77:         setHierarchy(data);
 78:         
 79:         if (!data[rootNodeId]) {
 80:           setWebglError(`Root node "${rootNodeId}" not found in data.`);
 81:         }
 82:       } catch (error) {
 83:         console.error('Error loading hierarchy:', error);
 84:         setWebglError('Failed to load data. Please try refreshing the page.');
 85:       } finally {
 86:         setLoading(false);
 87:       }
 88:     };
 89: 
 90:     fetchHierarchy();
 91:   }, [hierarchyUrl, rootNodeId]);
 92: 
 93:   // Initialize from initialHierarchy when no hierarchyUrl
 94:   useEffect(() => {
 95:     if (!hierarchyUrl && Object.keys(initialHierarchy).length > 0) {
 96:       setHierarchy(initialHierarchy);
 97:       setLoading(false);
 98:     }
 99:   }, [hierarchyUrl, initialHierarchy]);
100: 
101:   // Derived state - must be defined before useEffects and other code that depend on it
102:   const currentNode: KoryoonNode | null = useMemo(() => {
103:     return hierarchy[currentId] || null;
104:   }, [hierarchy, currentId]);
105: 
106:   const childrenNodes: KoryoonNode[] = useMemo(() => {
107:     if (!currentNode || !currentNode.childrenIds) return [];
108:     return currentNode.childrenIds
109:       .map(id => hierarchy[id])
110:       .filter(Boolean) as KoryoonNode[];
111:   }, [currentNode, hierarchy]);
112: 
113:   const renderNodes: KoryoonNode[] = useMemo(() => {
114:     if (!currentNode) return [];
115:     return [currentNode, ...childrenNodes];
116:   }, [currentNode, childrenNodes]);
117: 
118:   // ResizeObserver: track container size for screen-relative scaling
119:   useEffect(() => {
120:     if (loading || webglError || !currentNode) return;
121:     const el = containerRef.current;
122:     if (!el) return;
123: 
124:     const updateSize = () => {
125:       const rect = el.getBoundingClientRect();
126:       setContainerSize({ width: rect.width, height: rect.height });
127:     };
128: 
129:     const ro = new ResizeObserver((entries) => {
130:       for (const entry of entries) {
131:         const { width, height } = entry.contentRect;
132:         setContainerSize({ width, height });
133:       }
134:     });
135:     ro.observe(el);
136:     updateSize(); // initial size in case ResizeObserver delays
137:     return () => ro.disconnect();
138:   }, [loading, webglError, currentNode]);
139: 
140:   // Window resize fallback (container may be 100% viewport)
141:   useEffect(() => {
142:     if (loading || webglError || !currentNode) return;
143:     const handleResize = () => {
144:       const el = containerRef.current;
145:       if (el) {
146:         const rect = el.getBoundingClientRect();
147:         setContainerSize({ width: rect.width, height: rect.height });
148:       }
149:     };
150:     window.addEventListener('resize', handleResize);
151:     return () => window.removeEventListener('resize', handleResize);
152:   }, [loading, webglError, currentNode]);
153: 
154:   const viewportHeight =
155:     containerSize.height || (typeof window !== 'undefined' ? window.innerHeight : 600);
156:   const { orbitRadius, sphereSize, cameraDistance } = computeScale(
157:     renderNodes.length,
158:     config?.scale,
159:     viewportHeight,
160:     CAMERA_FOV
161:   );
162: 
163:   // Update camera position when cameraDistance changes (resize, node count)
164:   useEffect(() => {
165:     if (cameraRef.current) {
166:       cameraRef.current.position.set(0, cameraDistance * 0.15, cameraDistance);
167:     }
168:   }, [cameraDistance]);
169: 
170:   // Positions calculation - only when we have nodes to render
171:   const positions = useSpherePoints({
172:     count: renderNodes.length,
173:     radius: orbitRadius,
174:     center: DEFAULT_CENTER,
175:   });
176: 
177:   // Texture atlas loading - only when hierarchy is loaded
178:   useEffect(() => {
179:     if (Object.keys(hierarchy).length === 0) return;
180: 
181:     let mounted = true;
182:     const atlas = getTextureAtlas();
183: 
184:     try {
185:       atlas.generateAtlas();
186:       if (mounted) {
187:         setLoading(false);
188:       }
189:     } catch (error) {
190:       console.error('Texture atlas loading failed:', error);
191:       if (mounted) {
192:         setLoading(false);
193:         setWebglError('Failed to initialize graphics. Please check your browser settings.');
194:       }
195:     }
196: 
197:     return () => {
198:       mounted = false;
199:       atlas.dispose();
200:     };
201:   }, [hierarchy]);
202: 
203:   // Auto-hover detection animation
204:   useEffect(() => {
205:     const updateAutoHover = () => {
206:       if (!cameraRef.current || renderNodes.length === 0) {
207:         hoverAnimationRef.current = requestAnimationFrame(updateAutoHover);
208:         return;
209:       }
210: 
211:       const raycaster = raycasterRef.current;
212:       raycaster.setFromCamera(new THREE.Vector2(0, 0), cameraRef.current);
213:       
214:       const sphereMeshes = Array.from(sphereRefs.current.values());
215:       
216:       let closestSphere: { distance: number; object: THREE.Points } | null = null;
217:       let minDistance = Infinity;
218: 
219:       sphereMeshes.forEach((mesh) => {
220:         const worldPosition = new THREE.Vector3();
221:         mesh.getWorldPosition(worldPosition);
222:         
223:         const meshWithRadius = mesh as any;
224:         const sphereRadius = meshWithRadius.radius || mesh.scale.x * 5;
225:         
226:         const distanceToRay = raycaster.ray.distanceToPoint(worldPosition);
227:         
228:         if (distanceToRay <= sphereRadius) {
229:           const sphereToRay = worldPosition.clone().sub(raycaster.ray.origin);
230:           const projectionLength = sphereToRay.dot(raycaster.ray.direction);
231:           
232:           if (projectionLength > 0 && projectionLength < minDistance) {
233:             minDistance = projectionLength;
234:             closestSphere = {
235:               distance: projectionLength,
236:               object: mesh
237:             };
238:           }
239:         }
240:       });
241: 
242:       let hoveredId: string | null = null;
243:       if (closestSphere) {
244:         const intersectedMesh = (closestSphere as { distance: number; object: THREE.Points }).object;
245:         
246:         sphereRefs.current.forEach((mesh, nodeId) => {
247:           if (mesh === intersectedMesh) {
248:             hoveredId = nodeId;
249:           }
250:         });
251:       }
252: 
253:       if (hoveredId !== autoHoveredSphereId) {
254:         setAutoHoveredSphereId(hoveredId);
255:       }
256: 
257:       hoverAnimationRef.current = requestAnimationFrame(updateAutoHover);
258:     };
259: 
260:     hoverAnimationRef.current = requestAnimationFrame(updateAutoHover);
261: 
262:     return () => {
263:       if (hoverAnimationRef.current) {
264:         cancelAnimationFrame(hoverAnimationRef.current);
265:       }
266:     };
267:   }, [renderNodes, autoHoveredSphereId]);
268: 
269:   const handleScreenDoubleClick = useCallback(() => {
270:     if (!autoHoveredSphereId || !hierarchy[autoHoveredSphereId]) {
271:       return;
272:     }
273: 
274:     const hoveredNode = hierarchy[autoHoveredSphereId];
275:     
276:     if (hoveredNode.id === currentId) {
277:       if (history.length > 1) {
278:         setIsVisible(false);
279:         setTimeout(() => {
280:           const newHistory = history.slice(0, -1);
281:           setHistory(newHistory);
282:           setCurrentId(newHistory[newHistory.length - 1]);
283:           setTimeout(() => setIsVisible(true), 50);
284:         }, TRANSITION_DURATION_MS);
285:       }
286:       return;
287:     }
288: 
289:     if (hoveredNode.childrenIds.length === 0 && hoveredNode.iframe) {
290:       setIframeModal({ 
291:         url: hoveredNode.iframe, 
292:         title: hoveredNode.name 
293:       });
294:       return;
295:     }
296: 
297:     setIsVisible(false);
298:     setTimeout(() => {
299:       setHistory((prev) => [...prev, hoveredNode.id]);
300:       setCurrentId(hoveredNode.id);
301:       setTimeout(() => setIsVisible(true), 50);
302:     }, TRANSITION_DURATION_MS);
303:   }, [autoHoveredSphereId, hierarchy, currentId, history]);
304: 
305:   useEffect(() => {
306:     const handleGlobalDoubleClick = (e: MouseEvent) => {
307:       const target = e.target as HTMLElement;
308:       
309:       const isCanvasClick = target.tagName === 'CANVAS' || 
310:                            target.closest('.canvas-container') ||
311:                            target.className.includes('crosshair');
312:       
313:       if (isCanvasClick) {
314:         e.preventDefault();
315:         e.stopPropagation();
316:         handleScreenDoubleClick();
317:       }
318:     };
319: 
320:     window.addEventListener('dblclick', handleGlobalDoubleClick);
321:     
322:     return () => {
323:       window.removeEventListener('dblclick', handleGlobalDoubleClick);
324:     };
325:   }, [handleScreenDoubleClick]);
326: 
327:   const handleBack = useCallback(() => {
328:     if (history.length <= 1) return;
329: 
330:     setIsVisible(false);
331:     setTimeout(() => {
332:       const newHistory = history.slice(0, -1);
333:       setHistory(newHistory);
334:       setCurrentId(newHistory[newHistory.length - 1]);
335:       setTimeout(() => setIsVisible(true), 50);
336:     }, TRANSITION_DURATION_MS);
337:   }, [history]);
338: 
339:   const navigateTo = useCallback((nodeId: string) => {
340:     const node = hierarchy[nodeId];
341:     if (!node) return;
342: 
343:     const path: string[] = [];
344:     let n: KoryoonNode | undefined = node;
345:     while (n) {
346:       path.unshift(n.id);
347:       n = n.parentId ? hierarchy[n.parentId] : undefined;
348:     }
349: 
350:     setIsVisible(false);
351:     setTimeout(() => {
352:       setHistory(path);
353:       setCurrentId(nodeId);
354:       setTimeout(() => setIsVisible(true), 50);
355:     }, TRANSITION_DURATION_MS);
356:   }, [hierarchy]);
357: 
358:   useEffect(() => {
359:     const getState = (): KoryoonState => ({
360:       currentNodeId: currentId,
361:       history,
362:       currentNode,
363:       childrenNodes,
364:       hoveredNodeId: autoHoveredSphereId,
365:       canGoBack: history.length > 1,
366:       hierarchy,
367:       isLoading: loading,
368:       error: webglError,
369:     });
370: 
371:     onStateChange?.(getState());
372:     onRegisterHandlers?.({
373:       getState,
374:       navigateTo,
375:       goBack: handleBack,
376:     });
377:   }, [onStateChange, onRegisterHandlers, currentId, history, currentNode, childrenNodes, autoHoveredSphereId, hierarchy, loading, webglError, navigateTo, handleBack]);
378: 
379:   // Early returns for loading and error states
380:   if (loading || Object.keys(hierarchy).length === 0) {
381:     return <LoadingScreen />;
382:   }
383: 
384:   if (webglError) {
385:     return (
386:       <div className="koryoon-fullscreen koryoon-flex-center" style={{ background: '#000' }}>
387:         <div
388:           className="koryoon-text-center"
389:           style={{
390:             padding: '2rem',
391:             background: 'rgba(0,0,0,0.5)',
392:             backdropFilter: 'blur(8px)',
393:             borderRadius: '1rem',
394:             border: '1px solid rgba(255,255,255,0.1)',
395:           }}
396:         >
397:           <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
398:             Graphics Error
399:           </h2>
400:           <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>{webglError}</p>
401:           <button
402:             onClick={() => window.location.reload()}
403:             style={{
404:               padding: '0.5rem 1rem',
405:               background: 'rgba(255,255,255,0.1)',
406:               border: 'none',
407:               color: '#fff',
408:               borderRadius: '4px',
409:               cursor: 'pointer',
410:             }}
411:           >
412:             Retry
413:           </button>
414:         </div>
415:       </div>
416:     );
417:   }
418: 
419:   if (!currentNode) {
420:     return (
421:       <div className="koryoon-fullscreen koryoon-flex-center" style={{ background: '#000' }}>
422:         <div
423:           className="koryoon-text-center"
424:           style={{
425:             padding: '2rem',
426:             background: 'rgba(0,0,0,0.5)',
427:             backdropFilter: 'blur(8px)',
428:             borderRadius: '1rem',
429:             border: '1px solid rgba(255,255,255,0.1)',
430:           }}
431:         >
432:           <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
433:             Data Error
434:           </h2>
435:           <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
436:             Current node not found in hierarchy.
437:           </p>
438:           <button
439:             onClick={() => window.location.reload()}
440:             style={{
441:               padding: '0.5rem 1rem',
442:               background: 'rgba(255,255,255,0.1)',
443:               border: 'none',
444:               color: '#fff',
445:               borderRadius: '4px',
446:               cursor: 'pointer',
447:             }}
448:           >
449:             Reset
450:           </button>
451:         </div>
452:       </div>
453:     );
454:   }
455: 
456:   return (
457:     <div
458:       ref={containerRef}
459:       className="koryoon-fullscreen canvas-container"
460:       style={{ position: 'relative', background: '#000' }}
461:     >
462:       {iframeModal && (
463:         <IframeModal
464:           url={iframeModal.url}
465:           title={iframeModal.title}
466:           isOpen={!!iframeModal}
467:           onClose={() => setIframeModal(null)}
468:         />
469:       )}
470: 
471:       {/* Canvas */}
472:       <Canvas
473:         ref={canvasRef}
474:         camera={{ position: [0, cameraDistance * 0.15, cameraDistance], fov: CAMERA_FOV }}
475:         onCreated={({ camera }) => {
476:           cameraRef.current = camera;
477:         }}
478:         gl={{
479:           antialias: false,
480:           alpha: true,
481:           powerPreference: 'high-performance',
482:           precision: 'mediump',
483:           failIfMajorPerformanceCaveat: false,
484:           preserveDrawingBuffer: false,
485:           depth: true,
486:           stencil: false,
487:           logarithmicDepthBuffer: false,
488:         }}
489:         dpr={[1, 1.5]}
490:         style={{ background: 'transparent' }}
491:         frameloop="always"
492:       >
493:         <Suspense fallback={null}>
494:           <ambientLight intensity={0.3} />
495:           <pointLight position={[10, 10, 10]} intensity={0.5} />
496: 
497:           <SimpleStars />
498: 
499:           <OrbitControls
500:             ref={controlsRef}
501:             enablePan={false}
502:             minDistance={cameraDistance * 0.4}
503:             maxDistance={cameraDistance * 2}
504:             enableDamping
505:             dampingFactor={0.05}
506:           />
507: 
508:           {isVisible && renderNodes.map((node, index) => {
509:             const isCenter = index === 0;
510:             const position = positions[index] 
511:               ? [positions[index].x, positions[index].y, positions[index].z] 
512:               : [0, 0, 0];
513:            
514:             return (
515:               <SphericalPointCloud
516:                 key={`${node.id}-${index}`}
517:                 nodeId={node.id}
518:                 node={node}
519:                 isCenter={isCenter}
520:                 sphereRefs={sphereRefs}
521:                 count={10000}
522:                 radius={sphereSize}
523:                 pointSize={0.05}
524:                 color={autoHoveredSphereId && isCenter ? config?.theme?.pointCloud?.inactiveColor || "black": config?.theme?.pointCloud?.color || "purple"}
525:                 hoverScale={1.4}
526:                 hoverColor={config?.theme?.pointCloud?.hoverColor || "purple"}
527:                 animate={true}
528:                 speed={node.id === autoHoveredSphereId ? 0: 20}
529:                 position={position}
530:                 isAutoHovered={node.id === autoHoveredSphereId}
531:               />
532:             );
533:           })}
534:         </Suspense>
535:       </Canvas>
536:     </div>
537:   );
538: };
````

## File: package.json
````json
 1: {
 2:   "name": "koryoon-ui",
 3:   "version": "0.1.3",
 4:   "description": "3D hierarchy visualization library — interactive sphere navigation",
 5:   "type": "module",
 6:   "main": "dist/koryoon.min.js",
 7:   "style": "dist/koryoon.css",
 8:   "files": [
 9:     "dist",
10:     "examples",
11:     "README.md"
12:   ],
13:   "exports": {
14:     ".": "./dist/koryoon.min.js",
15:     "./style": "./dist/koryoon.css"
16:   },
17:   "scripts": {
18:     "dev": "vite",
19:     "build": "vite build && node scripts/build-demo.js",
20:     "preview": "vite preview",
21:     "lint": "eslint",
22:     "prepublishOnly": "npm run build"
23:   },
24:   "keywords": [
25:     "3d",
26:     "visualization",
27:     "hierarchy",
28:     "three.js",
29:     "react-three-fiber",
30:     "sphere",
31:     "interactive"
32:   ],
33:   "license": "MIT",
34:   "repository": {
35:     "type": "git",
36:     "url": "https://github.com/veertoooz/KoryoonUI"
37:   },
38:   "homepage": "https://github.com/veertoooz/KoryoonUI#readme",
39:   "bugs": {
40:     "url": "https://github.com/veertoooz/KoryoonUI/issues"
41:   },
42:   "author": "veertoooz",
43:   "publishConfig": {
44:     "access": "public"
45:   },
46:   "dependencies": {
47:     "@react-spring/three": "^10.0.3",
48:     "@react-three/drei": "^10.7.7",
49:     "@react-three/fiber": "^9.4.2",
50:     "react": "19.2.3",
51:     "react-dom": "19.2.3",
52:     "repomix": "^1.11.1",
53:     "three": "^0.182.0"
54:   },
55:   "devDependencies": {
56:     "@eslint/js": "^9",
57:     "@types/node": "^20",
58:     "@types/react": "^19",
59:     "@types/react-dom": "^19",
60:     "@types/three": "^0.182.0",
61:     "eslint": "^9",
62:     "typescript": "^5",
63:     "typescript-eslint": "^8",
64:     "vite": "^6.0.0"
65:   }
66: }
````
