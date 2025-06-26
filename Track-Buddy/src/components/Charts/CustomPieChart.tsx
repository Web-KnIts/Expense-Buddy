import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import CustomToolTip from './CustomToolTip';
import CustomLegend from './CustomLegend';

interface ChartData {
  name: string;
  amount: number;
}

interface CustomPieChartProps {
  data: ChartData[];
  label?: string; // Optional fallback label
  totalAmount?: string; // Optional fallback total
  colors: string[];
  showTextAnchor: boolean;
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor
}) => {
  // // Display the first or largest entry in center
  // const mainEntry = data.reduce((max, entry) =>
  //   entry.amount > max.amount ? entry : max, data[0]);

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomToolTip />} />
        <Legend content={<CustomLegend />} />
        {(
          <>
            <text
              x="50%"
              y="50%"
              dy={-10}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={15}
              textAnchor="middle"
              fill="#333"
              fontSize="20px"
              fontWeight="bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
