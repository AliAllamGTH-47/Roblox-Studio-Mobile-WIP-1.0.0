import * as THREE from 'three';

export type Tool = 'Select' | 'Move' | 'Scale' | 'Rotate';

export interface StudioObject {
  id: string;
  name: string;
  type: 'Part' | 'SpawnLocation' | 'Folder';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  visible: boolean;
  locked: boolean;
  children?: StudioObject[];
}

export interface StudioState {
  objects: StudioObject[];
  selectedId: string | null;
  tool: Tool;
}
