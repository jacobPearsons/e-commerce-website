import { Widget } from '../../types/dashboard';
import { DraggableWidget } from '../dashboard/DraggableWidget';

interface WidgetsGridProps {
  widgets: Widget[];
  metrics: any[];
  chartData: any[];
  pieData: any[];
  activities: any[];
  onMoveWidget: (dragIndex: number, hoverIndex: number) => void;
}

export const WidgetsGrid = ({
  widgets,
  metrics,
  chartData,
  pieData,
  activities,
  onMoveWidget
}: WidgetsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {widgets.map((widget, index) => (
        <div
          key={widget.id}
          className={getWidgetSizeClass(widget.size)}
        >
          <DraggableWidget
            widget={widget}
            index={index}
            metrics={metrics}
            chartData={chartData}
            pieData={pieData}
            activities={activities}
            onMove={onMoveWidget}
          />
        </div>
      ))}
    </div>
  );
};

const getWidgetSizeClass = (size: Widget['size']) => {
  switch (size) {
    case 'lg':
      return 'md:col-span-2 lg:col-span-4';
    case 'md':
      return 'md:col-span-1 lg:col-span-2';
    case 'sm':
    default:
      return 'md:col-span-1 lg:col-span-1';
  }
};