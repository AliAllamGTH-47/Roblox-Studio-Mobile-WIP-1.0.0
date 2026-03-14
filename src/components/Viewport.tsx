import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, TransformControls, ContactShadows, Sky, Stars } from '@react-three/drei';
import { StudioObject, Tool } from '../types';
import * as THREE from 'three';

interface ViewportProps {
  objects: StudioObject[];
  selectedId: string | null;
  tool: Tool;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, updates: Partial<StudioObject>) => void;
}

export const Viewport: React.FC<ViewportProps> = ({ objects, selectedId, tool, onSelect, onUpdate }) => {
  const selectedObject = objects.find(o => o.id === selectedId);
  const orbitControlsRef = useRef<any>(null);

  return (
    <div className="flex-1 relative bg-[#1b1b1b] min-w-0">
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">Loading 3D Engine...</div>}>
        <Canvas 
          shadows 
          camera={{ position: [20, 20, 20], fov: 45 }}
          gl={{ antialias: true, alpha: false, stencil: false }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor('#84a5ff');
            scene.fog = new THREE.FogExp2('#84a5ff', 0.001);
          }}
        >
          <Sky 
            distance={450000} 
            sunPosition={[100, 20, 100]} 
            inclination={0} 
            azimuth={0.25} 
          />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.7} />
          <pointLight position={[100, 100, 100]} intensity={1} castShadow />
          <directionalLight 
            position={[50, 100, 50]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
          />

          <Grid 
            infiniteGrid 
            fadeDistance={400} 
            fadeStrength={5} 
            sectionSize={10} 
            sectionColor="#ffffff" 
            cellColor="#ffffff" 
            cellSize={1}
            sectionThickness={1.5}
            cellThickness={0.8}
            position={[0, 0.01, 0]}
          />

          {objects.map(obj => (
            <Part 
              key={obj.id} 
              obj={obj} 
              isSelected={selectedId === obj.id}
              onSelect={() => onSelect(obj.id)}
              tool={tool}
              onUpdate={onUpdate}
              orbitControlsRef={orbitControlsRef}
            />
          ))}

          <OrbitControls 
            ref={orbitControlsRef}
            makeDefault 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 1.8} 
          />
          <ContactShadows opacity={0.4} scale={40} blur={2} far={4.5} />
        </Canvas>
      </Suspense>

      {/* Viewport Overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
        <div className="bg-[#2d2d2d]/80 backdrop-blur px-2 py-1 rounded text-[10px] font-mono border border-white/10 text-white">
          POS: {selectedObject ? `${selectedObject.position[0].toFixed(1)}, ${selectedObject.position[1].toFixed(1)}, ${selectedObject.position[2].toFixed(1)}` : '0, 0, 0'}
        </div>
        <div className="bg-[#2d2d2d]/80 backdrop-blur px-2 py-1 rounded text-[10px] font-mono border border-white/10 text-white">
          TOOL: {tool.toUpperCase()}
        </div>
      </div>
      
      {/* Help text */}
      <div className="absolute bottom-4 left-4 pointer-events-none opacity-50 text-[10px] text-white">
        Drag to rotate • Pinch to zoom • Tap object to select
      </div>
    </div>
  );
};

interface PartProps {
  obj: StudioObject;
  isSelected: boolean;
  onSelect: () => void;
  tool: Tool;
  onUpdate: (id: string, updates: Partial<StudioObject>) => void;
  orbitControlsRef: React.RefObject<any>;
}

const Part: React.FC<PartProps> = ({ obj, isSelected, onSelect, tool, onUpdate, orbitControlsRef }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const handleTransform = () => {
    if (!meshRef.current) return;
    
    const { position, rotation, scale } = meshRef.current;
    
    onUpdate(obj.id, {
      position: [position.x, position.y, position.z],
      rotation: [rotation.x, rotation.y, rotation.z],
      scale: [scale.x, scale.y, scale.z],
    });
  };

  const content = (
    <mesh 
      ref={meshRef}
      position={obj.position} 
      rotation={obj.rotation} 
      scale={obj.scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={obj.color} 
        metalness={0.1}
        roughness={0.5}
      />
      {isSelected && (
        <mesh scale={[1.02, 1.02, 1.02]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#3b82f6" wireframe />
        </mesh>
      )}
    </mesh>
  );

  if (isSelected && tool !== 'Select' && !obj.locked) {
    return (
      <TransformControls 
        object={meshRef.current || undefined}
        mode={tool.toLowerCase() as any}
        onMouseDown={() => {
          if (orbitControlsRef.current) orbitControlsRef.current.enabled = false;
        }}
        onMouseUp={() => {
          if (orbitControlsRef.current) orbitControlsRef.current.enabled = true;
          handleTransform();
        }}
      >
        {content}
      </TransformControls>
    );
  }

  return content;
};

