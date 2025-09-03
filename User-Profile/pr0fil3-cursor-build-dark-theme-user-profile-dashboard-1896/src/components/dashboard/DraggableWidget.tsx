import React, { memo } from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import Card from '../ui/Card';

interface DraggableWidgetProps {
  id: string;
  type: string;
  children: React.ReactNode;
  onMove?: (dragIndex: number, dropIndex: number) => void;
  index: number;
  className?: string;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  type,
  children,
  index,
  className = '',
}) => {
  const [{ isDragging }, dragPreview] = useDrag({
    type: 'widget',
    item: { id, index, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <motion.div
      ref={(el) => {
        dragPreview(el); // 👈 call connector
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isDragging ? 0.5 : 1,
        scale: isDragging ? 0.95 : 1,
      }}
      transition={{ duration: 0.2 }}
      className={`relative group ${className}`}
    >
      <Card
        glass
        className={`transition-all duration-200 ${isDragging ? 'shadow-2xl ring-2 ring-primary-500' : 'hover:shadow-lg'
          }`}
      >
        {/* Drag Handle */}
        <div
          ref={(el) => {
            dragPreview(el); // 👈 call connector
          }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <GripVertical size={16} className="text-gray-400" />
        </div>

        {/* Widget Content */}
        <div className="relative">
          {children}
        </div>
      </Card>
    </motion.div>

  );
};

export default memo(DraggableWidget);
