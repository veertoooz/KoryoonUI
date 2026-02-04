import { useRef, useMemo } from 'react';

const SimpleStars = () => {
  const pointsRef = useRef<any>(null);
  
  // Generate minimal stars
  const starPositions = useMemo(() => {
    const count = 1000; // Very low count for GeForce 210
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Simple sphere distribution
      const radius = 50 + Math.random() * 70;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[starPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        sizeAttenuation={true}
        color="#ffffff"
        transparent
        opacity={1}
        depthWrite={false}
      />
    </points>
  );
};

export default SimpleStars;
