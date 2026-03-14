import React from 'react';
import { Tool } from '../types';
import { Box, Move, Maximize, RotateCw, Play, Square, MousePointer2, Plus } from 'lucide-react';

interface RibbonProps {
  currentTool: Tool;
  setTool: (tool: Tool) => void;
  onAddPart: () => void;
}

export const Ribbon: React.FC<RibbonProps> = ({ currentTool, setTool, onAddPart }) => {
  return (
    <div className="h-24 bg-[#2d2d2d] border-b border-[#1b1b1b] flex flex-col select-none">
      {/* Tabs */}
      <div className="flex px-2 pt-1 gap-1">
        <div className="px-4 py-1 text-xs font-medium bg-[#3a3a3a] rounded-t-sm border-t border-x border-[#1b1b1b]">Home</div>
        <div className="px-4 py-1 text-xs font-medium text-gray-400 hover:text-white cursor-pointer">Model</div>
        <div className="px-4 py-1 text-xs font-medium text-gray-400 hover:text-white cursor-pointer">Avatar</div>
        <div className="px-4 py-1 text-xs font-medium text-gray-400 hover:text-white cursor-pointer">Test</div>
        <div className="px-4 py-1 text-xs font-medium text-gray-400 hover:text-white cursor-pointer">View</div>
      </div>

      {/* Toolbar */}
      <div className="flex-1 flex items-center px-4 gap-4 md:gap-6 overflow-x-auto no-scrollbar">
        {/* Tools Group */}
        <div className="flex items-center gap-1 h-full py-1">
          <ToolButton 
            active={currentTool === 'Select'} 
            onClick={() => setTool('Select')}
            icon={<MousePointer2 size={18} />}
            label="Select"
          />
          <ToolButton 
            active={currentTool === 'Move'} 
            onClick={() => setTool('Move')}
            icon={<Move size={18} />}
            label="Move"
          />
          <ToolButton 
            active={currentTool === 'Scale'} 
            onClick={() => setTool('Scale')}
            icon={<Maximize size={18} />}
            label="Scale"
          />
          <ToolButton 
            active={currentTool === 'Rotate'} 
            onClick={() => setTool('Rotate')}
            icon={<RotateCw size={18} />}
            label="Rotate"
          />
        </div>

        <div className="w-[1px] h-10 bg-[#1b1b1b]" />

        {/* Insert Group */}
        <div className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-[#3a3a3a] px-3 py-1 rounded" onClick={onAddPart}>
          <div className="relative">
            <Box size={24} className="text-blue-400" />
            <Plus size={12} className="absolute -bottom-1 -right-1 bg-green-500 rounded-full text-white" />
          </div>
          <span className="text-[10px] font-medium">Part</span>
        </div>

        <div className="w-[1px] h-10 bg-[#1b1b1b]" />

        {/* Play Group */}
        <div className="flex items-center gap-2">
           <div className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-[#3a3a3a] px-3 py-1 rounded">
            <Play size={24} className="text-blue-400 fill-blue-400" />
            <span className="text-[10px] font-medium">Play</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 opacity-50 cursor-not-allowed px-3 py-1 rounded">
            <Square size={24} className="text-red-400 fill-red-400" />
            <span className="text-[10px] font-medium">Stop</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <div 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 px-3 py-1 rounded cursor-pointer transition-colors ${active ? 'bg-[#4a4a4a] border border-blue-500' : 'hover:bg-[#3a3a3a]'}`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </div>
);
