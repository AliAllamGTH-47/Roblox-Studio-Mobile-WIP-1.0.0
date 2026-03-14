/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Ribbon } from './components/Ribbon';
import { Explorer } from './components/Explorer';
import { Properties } from './components/Properties';
import { Viewport } from './components/Viewport';
import { StudioObject, Tool } from './types';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Attempt to lock orientation to landscape if supported
    const screenAny = screen as any;
    if (screenAny.orientation && screenAny.orientation.lock) {
      screenAny.orientation.lock('landscape').catch(() => {
        // Silently fail if not supported or requires fullscreen
      });
    }
  }, []);

  const [objects, setObjects] = useState<StudioObject[]>([
    {
      id: 'baseplate',
      name: 'Baseplate',
      type: 'Part',
      position: [0, -0.5, 0],
      rotation: [0, 0, 0],
      scale: [2048, 1, 2048],
      color: '#636266', // Medium Stone Grey
      visible: true,
      locked: true,
    }
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>('Select');

  const handleAddPart = () => {
    const newPart: StudioObject = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Part ${objects.length}`,
      type: 'Part',
      position: [0, 2, 0],
      rotation: [0, 0, 0],
      scale: [4, 1, 2],
      color: '#a3a2a5',
      visible: true,
      locked: false,
    };
    setObjects([...objects, newPart]);
    setSelectedId(newPart.id);
  };

  const handleUpdateObject = (id: string, updates: Partial<StudioObject>) => {
    setObjects(objects.map(obj => obj.id === id ? { ...obj, ...updates } : obj));
  };

  const selectedObject = objects.find(o => o.id === selectedId) || null;

  return (
    <div className="h-full flex flex-col font-sans overflow-hidden">
      <Ribbon 
        currentTool={tool} 
        setTool={setTool} 
        onAddPart={handleAddPart} 
      />
      
      <div className="flex-1 flex flex-row overflow-hidden relative">
        <div className="flex flex-col w-64 border-r border-[#2d2d2d] overflow-hidden shrink-0">
          <Explorer 
            objects={objects} 
            selectedId={selectedId} 
            onSelect={setSelectedId} 
          />
        </div>
        
        <div className="flex-1 relative min-w-0">
          <Viewport 
            objects={objects} 
            selectedId={selectedId} 
            tool={tool}
            onSelect={setSelectedId}
            onUpdate={handleUpdateObject}
          />
        </div>
        
        <div className="flex flex-col w-64 border-l border-[#2d2d2d] overflow-hidden shrink-0">
          <Properties 
            selectedObject={selectedObject} 
            onUpdate={handleUpdateObject} 
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#1b1b1b] border-t border-[#2d2d2d] flex items-center px-3 gap-4 text-[10px] text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Studio Ready</span>
        </div>
        <div className="flex-1" />
        <div>Objects: {objects.length}</div>
        <div>FPS: 60</div>
      </div>
    </div>
  );
}

