import React from 'react';
import { StudioObject } from '../types';
import { ChevronRight, ChevronDown, Box, Folder, User } from 'lucide-react';

interface ExplorerProps {
  objects: StudioObject[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const Explorer: React.FC<ExplorerProps> = ({ objects, selectedId, onSelect }) => {
  return (
    <div className="w-full h-full bg-[#2d2d2d] flex flex-col overflow-hidden shrink-0">
      <div className="px-3 py-2 bg-[#3a3a3a] text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-[#1b1b1b]">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto p-1">
        <div className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-[#3a3a3a] cursor-pointer rounded">
          <ChevronDown size={14} className="text-gray-500" />
          <Folder size={14} className="text-yellow-500" />
          <span>Workspace</span>
        </div>
        <div className="pl-4">
          {objects.map(obj => (
            <div 
              key={obj.id}
              onClick={() => onSelect(obj.id)}
              className={`flex items-center gap-1 px-2 py-1 text-xs cursor-pointer rounded ${selectedId === obj.id ? 'bg-blue-600 text-white' : 'hover:bg-[#3a3a3a]'}`}
            >
              <Box size={14} className={selectedId === obj.id ? 'text-white' : 'text-blue-400'} />
              <span>{obj.name}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-[#3a3a3a] cursor-pointer rounded mt-1">
          <ChevronRight size={14} className="text-gray-500" />
          <Folder size={14} className="text-yellow-500" />
          <span>Players</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-[#3a3a3a] cursor-pointer rounded">
          <ChevronRight size={14} className="text-gray-500" />
          <Folder size={14} className="text-yellow-500" />
          <span>Lighting</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-[#3a3a3a] cursor-pointer rounded">
          <ChevronRight size={14} className="text-gray-500" />
          <Folder size={14} className="text-yellow-500" />
          <span>ReplicatedStorage</span>
        </div>
      </div>
    </div>
  );
};
