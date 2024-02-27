// ./src/modules/Category/components/PieChartComponent.tsx
import React, { useMemo } from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text as SVGText } from 'react-native-svg';
import { CategoryItem } from '../types/CategoryItem';

interface PieChartComponentProps {
  data: CategoryItem[];
  width?: number;
  height?: number;
  labelFontSize?: number;
}

const calculateLabelPositions = (index: number, dataLength: number, radius: number) => {
  const angle = (index / dataLength) * 2 * Math.PI - Math.PI / 2;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
};

const Labels = ({ data, radius }: { data: { key: string; value: number; svg: { fill: string } }[]; radius: number }) => {
  return data.map((slice, index) => {
    const position = calculateLabelPositions(index, data.length, radius);
    return (
      <SVGText
        key={`label-${slice.key}`}
        x={position.x}
        y={position.y}
        fill={'black'}
        textAnchor={'middle'}
        alignmentBaseline={'middle'}
        fontSize={16}
      >
        {`${slice.value.toFixed(0)}%`}
      </SVGText>
    );
  });
};

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  width = 200,
  height = 200,
  labelFontSize = 16,
}) => {
  const totalExpenses = useMemo(() => data.reduce((total, item) => total + item.amount, 0), [data]);
  const pieData = useMemo(() => data.map((item, index) => ({
    key: index.toString(),
    value: item.amount / totalExpenses * 100,
    svg: { fill: item.svg.fill },
  })), [data, totalExpenses]);

  const radius = Math.min(width, height) / 2;

  return (
    <PieChart
      style={{ width, height }}
      data={pieData}
      innerRadius={'70%'}
      outerRadius={'100%'}
      padAngle={0.03}
    >
      <Labels data={pieData} radius={radius * 0.8} />
    </PieChart>
  );
};

export default React.memo(PieChartComponent);

