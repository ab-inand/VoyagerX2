'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function InteractiveGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { camera } = useThree();
  
  // Load textures with error handling
  const [earthTexture, bumpMap, specularMap] = useTexture([
    '/earth-texture.jpg',
    '/earth-bump.jpg',
    '/earth-specular.jpg'
  ]);

  // Configure textures
  useEffect(() => {
    earthTexture.wrapS = earthTexture.wrapT = THREE.RepeatWrapping;
    earthTexture.repeat.set(1, 1);
    earthTexture.encoding = THREE.sRGBEncoding;

    bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(1, 1);

    specularMap.wrapS = specularMap.wrapT = THREE.RepeatWrapping;
    specularMap.repeat.set(1, 1);
  }, [earthTexture, bumpMap, specularMap]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
    }

    // Zoom effect based on scroll
    const targetScale = 1.5 + (scrollProgress * 1); // Scale from 1.5 to 2.5
    const targetZ = 5 - (scrollProgress * 2); // Move from z=5 to z=3
    
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    if (globeRef.current) {
      globeRef.current.scale.setScalar(targetScale);
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.scale.setScalar(targetScale * 1.013); // Keep atmosphere proportional
    }
  });

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        castShadow
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.4}
        minDistance={3}
        maxDistance={7}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
      
      {/* Earth Globe */}
      <mesh ref={globeRef} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpMap}
          bumpScale={0.1}
          specularMap={specularMap}
          specular={new THREE.Color('#ffffff')}
          shininess={15}
          emissive={new THREE.Color('#000000')}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner Atmosphere Glow */}
      <mesh ref={atmosphereRef} scale={[1.52, 1.52, 1.52]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#4ca6ff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
          shininess={100}
          emissive="#4ca6ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Outer Atmosphere Glow */}
      <mesh scale={[1.55, 1.55, 1.55]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#88ccff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          shininess={50}
          emissive="#88ccff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Subtle Grid Lines */}
      <mesh rotation={[0, 0, Math.PI / 2]} scale={[1.5, 1.5, 1.5]}>
        <torusGeometry args={[1, 0.005, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.5, 1.5, 1.5]}>
        <torusGeometry args={[1, 0.005, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
    </>
  );
} 