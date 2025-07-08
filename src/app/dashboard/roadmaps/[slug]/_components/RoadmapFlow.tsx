"use client";

import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

import { RoadmapNode, Resource } from '@/lib/roadmap-data';
import CustomNode from './CustomNode';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const STATUS_CONFIG: { [key in RoadmapNode['status']]: { dot: string; label: string } } = {
  done: { dot: 'bg-green-500', label: 'Done' },
  in_progress: { dot: 'bg-red-500', label: 'In Progress' },
  skip: { dot: 'bg-yellow-500', label: 'Skip' },
  pending: { dot: 'bg-gray-300', label: 'Pending' }
};

const nodeTypes = {
  custom: CustomNode,
};

const RoadmapFlow = ({ nodes: initialNodesData }: { nodes: RoadmapNode[] }) => {
  const [nodes, setNodes] = useState<RoadmapNode[]>(initialNodesData);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  const flowNodes: Node<RoadmapNode>[] = useMemo(() => nodes.map((node, index) => {
    let position = { x: 250, y: index * 150 };
    if (node.id === 'git') {
      position = { x: 0, y: 4 * 150 };
    } else if (node.id === 'github') {
      position = { x: 500, y: 4 * 150 };
    } else if (node.id === 'npm') {
      position = { x: 250, y: 5 * 150 };
    } else if (node.id === 'react') {
      position = { x: 250, y: 6 * 150 };
    } else if (node.id === 'tailwind') {
      position = { x: 250, y: 7 * 150 };
    } else if (node.id === 'vitest') {
      position = { x: 250, y: 8 * 150 };
    }
    
    return {
      id: node.id,
      type: 'custom',
      position,
      data: node,
    };
  }), [nodes]);

  const edges: Edge[] = useMemo(() => [
    { id: 'e1-2', source: 'html', target: 'css', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e2-3', source: 'css', target: 'javascript', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e3-git', source: 'javascript', target: 'git', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e3-github', source: 'javascript', target: 'github', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e-git-npm', source: 'git', target: 'npm', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e-github-npm', source: 'github', target: 'npm', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e-npm-react', source: 'npm', target: 'react', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e-react-tailwind', source: 'react', target: 'tailwind', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e-tailwind-vitest', source: 'tailwind', target: 'vitest', animated: true, style: { stroke: '#9ca3af' } },
  ], []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node<RoadmapNode>) => {
    setSelectedNode(node.data);
  }, []);

  const handleStatusChange = (newStatus: RoadmapNode['status']) => {
    if (!selectedNode) return;
    const newNodes = nodes.map(n => 
        n.id === selectedNode.id ? { ...n, status: newStatus } : n
    );
    setNodes(newNodes);
    setSelectedNode(prev => prev ? { ...prev, status: newStatus } : null);
  };

  return (
    <div className="relative" style={{ height: '100vh', width: '100%' }}>
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 p-4 rounded-lg w-48 z-10">
        <h3 className="font-bold mb-2 text-gray-800">Legend</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className="flex items-center gap-2"><div className={cn("w-4 h-4 rounded-full", STATUS_CONFIG.done.dot)}></div> {STATUS_CONFIG.done.label}</li>
          <li className="flex items-center gap-2"><div className={cn("w-4 h-4 rounded-full", STATUS_CONFIG.in_progress.dot)}></div> {STATUS_CONFIG.in_progress.label}</li>
          <li className="flex items-center gap-2"><div className={cn("w-4 h-4 rounded-full", STATUS_CONFIG.skip.dot)}></div> {STATUS_CONFIG.skip.label}</li>
        </ul>
      </div>

       <ReactFlow
        nodes={flowNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        className="bg-gray-50"
        
        // --- Kumpulan Properti Baru Untuk Mengontrol Scroll ---
        zoomOnScroll={false}          // <-- Secara eksplisit nonaktifkan zoom biasa
        panOnScroll={false}           // <-- Secara eksplisit nonaktifkan geser (pan) dengan scroll
        zoomActivationKeyCode={'Control'} // <-- Tetap gunakan ini untuk zoom dengan CTRL
        panOnDrag={true}              // <-- Pastikan geser dengan klik-tahan tetap bisa
      >
        <Background />
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>

      <Dialog open={!!selectedNode} onOpenChange={(isOpen) => !isOpen && setSelectedNode(null)}>
        {/* ... isi dialog tidak berubah ... */}
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader className="flex flex-row justify-between items-start">
            <div>
              <DialogTitle className="text-3xl font-bold">{selectedNode?.title}</DialogTitle>
              <DialogDescription className="pt-2 text-base text-gray-600">{selectedNode?.description}</DialogDescription>
            </div>
            <Select value={selectedNode?.status} onValueChange={(value: RoadmapNode['status']) => handleStatusChange(value)}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Set status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="done">{STATUS_CONFIG.done.label}</SelectItem>
                <SelectItem value="in_progress">{STATUS_CONFIG.in_progress.label}</SelectItem>
                <SelectItem value="skip">{STATUS_CONFIG.skip.label}</SelectItem>
                <SelectItem value="pending">{STATUS_CONFIG.pending.label}</SelectItem>
              </SelectContent>
            </Select>
          </DialogHeader>
          <hr className="my-4" />
          {selectedNode?.resources && selectedNode.resources.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-4">Free Resource</h3>
              <div className="space-y-3">
                {selectedNode.resources.map((res: Resource, index: number) => (
                  <div key={index} className="flex items-center gap-4">
                    <Badge className={cn({ 'bg-green-600 hover:bg-green-700 text-white': res.type === 'Course', 'bg-yellow-500 hover:bg-yellow-600 text-white': res.type === 'Article', 'bg-red-600 hover:bg-red-700 text-white': res.type === 'Video', })}>{res.type}</Badge>
                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">{res.title}</a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoadmapFlow;