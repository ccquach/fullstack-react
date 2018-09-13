import React from 'react';
import { PieChart, Pie, Cell, Text } from 'recharts';

const COLORS = ['#2ecc71', '#e74c3c'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <Text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </Text>
  );
};

const SurveyChart = ({ data }) => {
  return (
    <PieChart width={100} height={100}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        startAngle={90}
        endAngle={-270}
        outerRadius="100%"
        label={renderCustomizedLabel}
        labelLine={false}
      >
        {data.map((item, idx) => (
          <Cell key={item.name} fill={COLORS[idx]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default SurveyChart;
