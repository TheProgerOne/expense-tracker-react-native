// ./src/modules/Category/components/PieChartComponent.tsx
import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { CategoryItem } from '../types/CategoryItem';
import { Text } from 'react-native';

interface PieChartComponentProps {
  data: CategoryItem[];
  width?: number;
  height?: number;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, width = 200, height = 200 }) => {
  const defaultData = [{
    key: '0',
    value: 100,
    svg: { fill: '#cccccc' },
  }];

  const hasData = data && data.length > 0;
  const totalExpenses = hasData ? data.reduce((total, item) => total + item.amount, 0) : 0;

  const pieData = hasData ? data.map(item => ({
    key: item.key.toString(),
    value: item.amount / totalExpenses * 100,
    svg: item.svg,
  })) : defaultData;

  return (
    <PieChart
      style={{ width, height }}
      data={pieData}
      outerRadius={'100%'}
    />
  );
};

export default React.memo(PieChartComponent);
