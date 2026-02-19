import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ServerCubeProps {
  activeSection: string;
}

function ServerCube({ activeSection }: ServerCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const targetColor = useMemo(() => {
    switch (activeSection) {
      case 'hero': return new THREE.Color('#00f0ff');
      case 'get': return new THREE.Color('#00f0ff');
      case 'post': return new THREE.Color('#22c55e');
      case 'put': return new THREE.Color('#eab308');
      case 'delete': return new THREE.Color('#ef4444');
      case 'status-200': return new THREE.Color('#22c55e');
      case 'status-400': return new THREE.Color('#eab308');
      case 'status-404': return new THREE.Color('#f97316');
      case 'status-500': return new THREE.Color('#ef4444');
      case 'frontend': return new THREE.Color('#00f0ff');
      case 'state': return new THREE.Color('#a855f7');
      case 'backend': return new THREE.Color('#00f0ff');
      default: return new THREE.Color('#00f0ff');
    }
  }, [activeSection]);

  const targetScale = useMemo(() => {
    switch (activeSection) {
      case 'delete': return 0.6;
      case 'post': return 1.3;
      default: return 1;
    }
  }, [activeSection]);

  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !edgesRef.current) return;
    
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    
    const currentScale = meshRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 2);
    meshRef.current.scale.setScalar(newScale);
    edgesRef.current.scale.setScalar(newScale);

    const mat = edgesRef.current.material as THREE.LineBasicMaterial;
    mat.color.lerp(targetColor, delta * 3);

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      const pMat = particlesRef.current.material as THREE.PointsMaterial;
      pMat.color.lerp(targetColor, delta * 3);
    }
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(1.8, 1.8, 1.8), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        <mesh ref={meshRef} geometry={geometry}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.2}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color="#0a1628"
            transmissionSampler={false}
          />
        </mesh>
        <lineSegments ref={edgesRef} geometry={edgesGeo}>
          <lineBasicMaterial color="#00f0ff" linewidth={2} transparent opacity={0.8} />
        </lineSegments>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particles, 3]}
              count={particles.length / 3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            color="#00f0ff"
            transparent
            opacity={0.6}
            sizeAttenuation
          />
        </points>
      </group>
    </Float>
  );
}

interface Scene3DProps {
  activeSection: string;
}

const Scene3D = ({ activeSection }: Scene3DProps) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#a855f7" />
        <ServerCube activeSection={activeSection} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default Scene3D;
