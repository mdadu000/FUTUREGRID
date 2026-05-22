import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Float, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useState, useEffect, useRef, useMemo } from "react";

function DataNetwork() {
  const group = useRef<THREE.Group>(null);
  
  // Generate a network of nodes representing 'Society/Agents'
  const [positionsArray, lineGeometry] = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const radius = 3.5; 
    for (let i = 0; i < 350; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      pts.push(new THREE.Vector3(x, y, z));
    }
    
    // Connect nodes that are close to each other
    const lines: THREE.Vector3[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.3) {
          lines.push(pts[i], pts[j]);
        }
      }
    }

    const posArray = new Float32Array(pts.length * 3);
    for (let i = 0; i < pts.length; i++) {
      posArray[i * 3] = pts[i].x;
      posArray[i * 3 + 1] = pts[i].y;
      posArray[i * 3 + 2] = pts[i].z;
    }

    const geo = new THREE.BufferGeometry().setFromPoints(lines);
    return [posArray, geo];
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} floatIntensity={1} rotationIntensity={0.5}>
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#00e5ff" transparent opacity={0.25} />
        </lineSegments>
        
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positionsArray.length / 3}
              array={positionsArray}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.06} color="#00e5ff" transparent opacity={0.8} sizeAttenuation />
        </points>

        {/* Central Core */}
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshBasicMaterial color="#02040a" />
        </mesh>
        
        {/* Core Aura / Wireframe */}
        <mesh>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial color="#9900ff" transparent opacity={0.1} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function MovingGrid() {
  const gridRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (gridRef.current) {
      // Moves the grid towards the camera to simulate forward motion into the 'Future Grid'
      gridRef.current.position.z = (state.clock.getElapsedTime() * 2) % 5;
    }
  });

  return (
    <group ref={gridRef}>
      <Grid 
        position={[0, -2.5, 0]} 
        args={[100, 100]} 
        cellSize={1} 
        cellThickness={1.2} 
        cellColor="#004455" 
        sectionSize={5} 
        sectionThickness={2} 
        sectionColor="#00e5ff" 
        fadeDistance={40} 
        fadeStrength={1.5} 
      />
    </group>
  );
}

export function ThreeBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 w-full h-full z-0 bg-[#02040a]" />;
  }

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-[#02040a] cursor-move overflow-hidden">
      <Canvas camera={{ position: [0, 1, 9], fov: 60 }} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#02040a']} />
        
        {/* Fog to blend the grid into the dark horizon */}
        <fog attach="fog" args={['#02040a', 5, 40]} />

        <ambientLight intensity={0.5} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
        <Sparkles count={300} size={1.5} scale={12} speed={0.4} color="#9900ff" opacity={0.5} />
        
        <DataNetwork />
        <MovingGrid />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3}
          dampingFactor={0.05}
        />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,4,10,0.9)_100%)]" />
    </div>
  );
}
