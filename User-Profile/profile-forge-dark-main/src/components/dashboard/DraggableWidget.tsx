import { useDrag, useDrop } from 'react-dnd';
import { Widget, Metric, ChartData, PieData, Activity } from '@/types/dashboard';
import { MetricWidget } from './widgets/MetricWidget';
import { ChartWidget } from './widgets/ChartWidget';
import { PieWidget } from './widgets/PieWidget';
import { ActivityWidget } from './widgets/ActivityWidget';

interface DraggableWidgetProps {
  widget: Widget;
  index: number;
  metrics: Metric[];
  chartData: ChartData[];
  pieData: PieData[];
  activities: Activity[];
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

export const DraggableWidget = ({
  widget,
  index,
  metrics,
  chartData,
  pieData,
  activities,
  onMove
}: DraggableWidgetProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'widget',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'widget',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
  });

  const renderWidget = () => {
    switch (widget.type) {
      case 'metric':
        const metric = metrics[index] || metrics[0];
        return <MetricWidget metric={metric} />;
      case 'chart':
        return <ChartWidget data={chartData} />;
      case 'pie':
        return <PieWidget data={pieData} />;
      case 'activity':
        return <ActivityWidget activities={activities} />;
      default:
        return (
          <div className="glass-card p-6 text-center">
            <p className="text-muted-foreground">Widget type not supported</p>
          </div>
        );
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`${isDragging ? 'opacity-50' : 'opacity-100'} transition-opacity cursor-move`}
    >
      {renderWidget()}
    </div>
  );
};