import React, { useRef, useMemo } from 'react';
import { Points, PointMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { KoryoonNode } from '../types';

interface SphericalPointCloudProps {
    count?: number;
    radius?: number;
    pointSize?: number;
    color?: string;
    animate?: boolean;
    speed?: number;
    noise?: boolean;
    noiseScale?: number;
    distribution?: 'uniform' | 'fibonacci' | 'random';
    opacity?: number;
    node: KoryoonNode;
    transparent?: boolean;
    isCenter?: boolean;
    hoverScale?: number;
    hoverDuration?: number;
    hoverColor?: string;
    isAutoHovered?: boolean;
    nodeId?: string;
    sphereRefs?: React.MutableRefObject<Map<string, THREE.Points>>;
    [key: string]: any;
}

const SphericalPointCloud: React.FC<SphericalPointCloudProps> = ({
    count = 10000,
    radius = 5,
    isCenter = false,
    pointSize = 0.05,
    node,
    isVisible = true,
    color = 'purple',
    animate = true,
    speed = 1,
    noise = true,
    noiseScale = 0.5,
    distribution = 'uniform',
    opacity = 1,
    transparent = true,
    hoverScale = 1.2,
    hoverDuration = 0.3,
    hoverColor = 'white',
    isAutoHovered = false,
    nodeId,
    sphereRefs,
    ...props
}) => {
    const pointsRef = useRef<THREE.Points>(null);

    // Register this sphere with parent's ref map and add radius property
    React.useEffect(() => {
        if (pointsRef.current && nodeId && sphereRefs) {
            // Add radius property to the mesh for raycasting
            (pointsRef.current as any).radius = radius;
            sphereRefs.current.set(nodeId, pointsRef.current);
            return () => {
                sphereRefs.current.delete(nodeId);
            };
        }
    }, [nodeId, sphereRefs, radius]);

    const scale = isAutoHovered ? hoverScale : 1;
    const materialColor = isAutoHovered ? (hoverColor || color) : color;
    const materialSize = isAutoHovered ? pointSize * 1.3 : pointSize;

    // Generate spherical point positions
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            let x: number, y: number, z: number;

            switch (distribution) {
                case 'fibonacci': {
                    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
                    const offset = 2 / count;
                    const yPos = 1 - (i * offset) - (offset / 2);
                    const radiusAtY = Math.sqrt(1 - yPos * yPos);
                    const phi = i * goldenAngle;

                    x = Math.cos(phi) * radiusAtY;
                    y = yPos;
                    z = Math.sin(phi) * radiusAtY;
                    break;
                }

                case 'random': {
                    const theta = 2 * Math.PI * Math.random();
                    const phiRandom = Math.acos(2 * Math.random() - 1);
                    const r = radius * Math.cbrt(Math.random());

                    x = r * Math.sin(phiRandom) * Math.cos(theta);
                    y = r * Math.sin(phiRandom) * Math.sin(theta);
                    z = r * Math.cos(phiRandom);
                    break;
                }

                case 'uniform':
                default: {
                    const u = Math.random();
                    const v = Math.random();
                    const thetaUniform = 2 * Math.PI * u;
                    const phiUniform = Math.acos(2 * v - 1);

                    x = radius * Math.sin(phiUniform) * Math.cos(thetaUniform);
                    y = radius * Math.sin(phiUniform) * Math.sin(thetaUniform);
                    z = radius * Math.cos(phiUniform);
                    break;
                }
            }

            if (noise) {
                const noiseX = (Math.random() - 0.5) * noiseScale;
                const noiseY = (Math.random() - 0.5) * noiseScale;
                const noiseZ = (Math.random() - 0.5) * noiseScale;

                positions[i * 3] = x + noiseX;
                positions[i * 3 + 1] = y + noiseY;
                positions[i * 3 + 2] = z + noiseZ;
            } else {
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
            }
        }

        return positions;
    }, [count, radius, distribution, noise, noiseScale]);

    // Rotation animation
    useFrame((state) => {
        if (animate && pointsRef.current) {
            pointsRef.current.rotation.y += 0.001 * speed;
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });
 
    return (
        <group>
            <Points
                ref={pointsRef}
                positions={positions}
                scale={scale}
                {...props}
            >
                <PointMaterial
                    transparent={transparent}
                    color={materialColor}
                    size={materialSize}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={color === 'black' ? 0 : opacity}
                    blending={THREE.AdditiveBlending}
                />
                {/* Text label */}
                <Html
                    position={[0, 0, 0]}
                    center
                    distanceFactor={10}
                    style={{
                        pointerEvents: 'none',
                        transition: 'all 0.3s ease',
                        opacity: isVisible ? 1 : 0,
                        letterSpacing: '1.5vw',
                        position: 'relative',
                        textAlign: 'center',
                        padding: '2.5vw',
                        zIndex: 9999,
                    }}
                >
                    <div
                      style={{
                        opacity: isCenter && isAutoHovered !== isCenter ? 0 : 1,
                        transition: 'all 0.3s',
                      }}
                    >
                        <div
                          style={{
                            fontWeight: isAutoHovered ? 700 : 400,
                            color: '#fff',
                            fontSize: isAutoHovered ? (isCenter ? '4vw' : '10vw') : '4vw',
                            transition: 'all 0.3s',
                          }}
                        >
                          {node.name}
                        </div>
                    </div>
                </Html>
            </Points>
        </group>
    );
};

export default SphericalPointCloud;
