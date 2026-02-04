// src/hooks/useSphereHierarchy.ts
import { useState, useCallback } from 'react';
import type { KoryoonNode, Hierarchy } from '../types';

export const useSphereHierarchy = (initialNodes: Hierarchy) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  
  // Navigate to a node
  const navigateTo = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    setHistory(prev => [...prev, nodeId]);
    
    // Update node visibility
    setNodes(prev => {
      const updated = { ...prev };
      
      // Hide all nodes first
      Object.keys(updated).forEach(id => {
        updated[id] = { ...updated[id] };
      });
      
      return updated;
    });
  }, []);
  
  // Go back in navigation
  const goBack = useCallback(() => {
    if (history.length > 1) {
      const previousPath = history.slice(0, -1);
      const previousNodeId = previousPath[previousPath.length - 1];
      
      setHistory(previousPath);
      setSelectedNodeId(previousNodeId);
    }
  }, [history]);
  
  // Toggle node expansion
  const toggleExpand = useCallback((nodeId: string) => {
    setNodes(prev => ({
      ...prev,
      [nodeId]: {
        ...prev[nodeId],
      }
    }));
  }, []);
  
  // Get current visible nodes for rendering
  const getVisibleNodes = useCallback((): KoryoonNode[] => {
    const selected = nodes[selectedNodeId];
    if (!selected) return [];
    
    const visible: KoryoonNode[] = [selected];
    
    // Always show children of selected node
    selected.childrenIds.forEach(childId => {
      const child = nodes[childId];
      if (child) {
        visible.push(child);
      }
    });
    
    return visible;
  }, [nodes, selectedNodeId]);
  
  // Get breadcrumb path
  const getBreadcrumb = useCallback((): KoryoonNode[] => {
    const path: KoryoonNode[] = [];
    let currentNode = nodes[selectedNodeId];
    
    while (currentNode) {
      path.unshift(currentNode);
      if (!currentNode.parentId) break;
      currentNode = nodes[currentNode.parentId];
    }
    
    return path;
  }, [nodes, selectedNodeId]);
  
  return {
    nodes,
    selectedNodeId,
    history,
    navigateTo,
    goBack,
    toggleExpand,
    getVisibleNodes,
    getBreadcrumb,
    setSelectedNodeId
  };
};
