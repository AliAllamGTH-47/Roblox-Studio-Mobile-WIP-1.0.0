import React from 'react';
import { StudioObject } from '../types';

interface PropertiesProps {
  selectedObject: StudioObject | null;
  onUpdate: (id: string, updates: Partial<StudioObject>) => void;
}

export const Properties: React.FC<PropertiesProps> = ({ selectedObject, onUpdate }) => {
  if (!selectedObject) {
    return (
      <div className="w-full h-full bg-[#2d2d2d] flex flex-col shrink-0">
        <div className="px-3 py-2 bg-[#3a3a3a] text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-[#1b1b1b]">
          Properties
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-500 text-[10px] italic p-4 text-center">
          Select an object to view properties
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#2d2d2d] flex flex-col overflow-hidden shrink-0">
      <div className="px-3 py-2 bg-[#3a3a3a] text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-[#1b1b1b]">
        Properties - {selectedObject.name}
      </div>
      <div className="flex-1 overflow-y-auto">
        <PropertySection title="Appearance">
          <PropertyRow label="Name">
            <input 
              type="text" 
              value={selectedObject.name}
              onChange={(e) => onUpdate(selectedObject.id, { name: e.target.value })}
              className="w-full bg-[#1b1b1b] border border-[#3a3a3a] px-1 py-0.5 text-xs rounded outline-none focus:border-blue-500"
            />
          </PropertyRow>
          <PropertyRow label="Color">
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={selectedObject.color}
                onChange={(e) => onUpdate(selectedObject.id, { color: e.target.value })}
                className="w-6 h-6 bg-transparent border-none p-0 cursor-pointer"
              />
              <span className="text-[10px] text-gray-400">{selectedObject.color}</span>
            </div>
          </PropertyRow>
        </PropertySection>

        <PropertySection title="Data">
          <PropertyRow label="Locked">
            <input 
              type="checkbox" 
              checked={selectedObject.locked}
              onChange={(e) => onUpdate(selectedObject.id, { locked: e.target.checked })}
              className="rounded bg-[#1b1b1b]"
            />
          </PropertyRow>
        </PropertySection>

        <PropertySection title="Transform">
          <PropertyRow label="Position">
            <Vector3Input 
              values={selectedObject.position} 
              onChange={(v) => onUpdate(selectedObject.id, { position: v })}
            />
          </PropertyRow>
          <PropertyRow label="Size">
            <Vector3Input 
              values={selectedObject.scale} 
              onChange={(v) => onUpdate(selectedObject.id, { scale: v })}
            />
          </PropertyRow>
        </PropertySection>
      </div>
    </div>
  );
};

const PropertySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-2">
    <div className="bg-[#3a3a3a] px-2 py-0.5 text-[10px] font-bold text-gray-400 uppercase">{title}</div>
    <div className="divide-y divide-[#1b1b1b]">{children}</div>
  </div>
);

const PropertyRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex items-center px-2 py-1.5 hover:bg-[#333333]">
    <div className="w-24 text-[11px] text-gray-300 truncate">{label}</div>
    <div className="flex-1">{children}</div>
  </div>
);

const Vector3Input: React.FC<{ values: [number, number, number]; onChange: (v: [number, number, number]) => void }> = ({ values, onChange }) => {
  const handleChange = (index: number, val: string) => {
    const newValues = [...values] as [number, number, number];
    newValues[index] = parseFloat(val) || 0;
    onChange(newValues);
  };

  return (
    <div className="grid grid-cols-3 gap-1">
      {['X', 'Y', 'Z'].map((axis, i) => (
        <div key={axis} className="flex items-center gap-0.5">
          <span className="text-[9px] text-gray-500">{axis}</span>
          <input 
            type="number" 
            value={values[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-full bg-[#1b1b1b] border border-[#3a3a3a] px-0.5 py-0.5 text-[10px] rounded outline-none focus:border-blue-500"
          />
        </div>
      ))}
    </div>
  );
};
