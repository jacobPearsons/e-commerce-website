import React, { useState, useCallback, memo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings } from 'lucide-react';
import DraggableWidget from './DraggableWidget';
import Button from '../ui/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Widget {
  id: string;
  type: 'metric' | 'chart' | 'list' | 'custom';
  title: string;
  component: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  order: number;
}

interface WidgetGridProps {
  widgets: Widget[];
  onWidgetOrderChange?: (widgets: Widget[]) => void;
  onAddWidget?: () => void;
  editable?: boolean;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({
  widgets: initialWidgets,
  onWidgetOrderChange,
  onAddWidget,
  editable = true,
}) => {
  const [widgets, setWidgets] = useLocalStorage('dashboard-widgets', initialWidgets);
  const [isEditMode, setIsEditMode] = useState(false);

  const moveWidget = useCallback((dragIndex: number, dropIndex: number) => {
    const updatedWidgets = [...widgets];
    const [removed] = updatedWidgets.splice(dragIndex, 1);
    updatedWidgets.splice(dropIndex, 0, removed);
    
    // Update order property
    const reorderedWidgets = updatedWidgets.map((widget, index) => ({
      ...widget,
      order: index,
    }));

    setWidgets(reorderedWidgets);
    onWidgetOrderChange?.(reorderedWidgets);
  }, [widgets, setWidgets, onWidgetOrderChange]);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1';
      case 'medium':
        return 'col-span-2 row-span-1';
      case 'large':
        return 'col-span-2 row-span-2';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {/* Header */}
        {editable && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Dashboard Widgets
            </h2>
            <div className="flex space-x-2">
              <Button
                variant={isEditMode ? 'primary' : 'outline'}
                size="sm"
                icon={Settings}
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? 'Done' : 'Edit'}
              </Button>
              {onAddWidget && (
                <Button
                  variant="outline"
                  size="sm"
                  icon={Plus}
                  onClick={onAddWidget}
                >
                  Add Widget
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Edit Mode Notice */}
        <AnimatePresence>
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            >
              <p className="text-sm text-blue-700 dark:text-blue-300">
                🎯 Edit Mode: Drag widgets to reorder them. Changes are saved automatically.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Widget Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min"
        >
          {widgets
            .sort((a, b) => a.order - b.order)
            .map((widget, index) => (
              <motion.div
                key={widget.id}
                variants={item}
                className={getSizeClasses(widget.size)}
              >
                {isEditMode ? (
                  <DraggableWidget
                    id={widget.id}
                    type={widget.type}
                    index={index}
                    onMove={moveWidget}
                  >
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        {widget.title}
                      </h3>
                      <div className="opacity-75">
                        {widget.component}
                      </div>
                    </div>
                  </DraggableWidget>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {widget.component}
                  </motion.div>
                )}
              </motion.div>
            ))}

          {/* Add Widget Placeholder */}
          {isEditMode && onAddWidget && (
            <motion.div
              variants={item}
              className="col-span-1 row-span-1"
            >
              <motion.button
                onClick={onAddWidget}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-colors"
              >
                <Plus size={24} className="mb-2" />
                <span className="text-sm font-medium">Add Widget</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Empty State */}
        {widgets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Settings size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No widgets configured
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Add your first widget to get started with your personalized dashboard.
            </p>
            {onAddWidget && (
              <Button variant="primary" icon={Plus} onClick={onAddWidget}>
                Add Your First Widget
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </DndProvider>
  );
};

export default memo(WidgetGrid);