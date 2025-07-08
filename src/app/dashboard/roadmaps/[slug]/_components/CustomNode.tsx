"use client";
import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow'; // Impor NodeProps untuk tipe data
import { cn } from '@/lib/utils';
import { RoadmapNode } from '@/lib/roadmap-data';

// Skema warna yang sama seperti sebelumnya
const STATUS_CONFIG: { [key in RoadmapNode['status']]: { node: string } } = {
  done: { node: 'bg-green-100 text-green-800 border-green-400' },
  in_progress: { node: 'bg-red-100 text-red-800 border-red-400' },
  skip: { node: 'bg-yellow-100 text-yellow-800 border-yellow-400' },
  pending: { node: 'bg-blue-100 text-blue-800 border-blue-400' }
};

// Komponen custom node kita, sekarang menggunakan NodeProps<RoadmapNode>
function CustomNode({ data }: NodeProps<RoadmapNode>) {
  return (
    <div className={cn(
      "w-48 text-center p-3 rounded-lg border-2 shadow-md font-sans", // Menambahkan font-sans
      STATUS_CONFIG[data.status].node
    )}>
      {/* Handle adalah titik koneksi untuk garis (edges). React Flow menggunakannya secara internal. */}
      <Handle type="target" position={Position.Top} className="!bg-gray-400 !w-2 !h-2" />
      <div className="font-bold">{data.title}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400 !w-2 !h-2" />
    </div>
  );
}

export default React.memo(CustomNode); // Gunakan React.memo untuk optimasi