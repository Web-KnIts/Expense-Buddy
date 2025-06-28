import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

interface ChartData {
  name: string;
  amount: number;
}

interface CustomPieChartProps {
  data: ChartData[];
  label?: string;
  totalAmount?: string; 
  colors: string[];
  showTextAnchor: boolean;
  ToolTipType:"1"|"2";
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
  ToolTipType
}) => {

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
          {showTextAnchor && <Label
            position="center"
            content={() => {
              return (
                <>
                  {label && (
                    <text
                      x={"50%"}
                      y={"50%"}
                      dy={-10}
                      textAnchor="middle"
                      fill="#666"
                      fontSize="14px"
                    >
                      {label}
                    </text>
                  )}
                  <text
                    x={"50%"}
                    y={"50%"}
                    dy={15}
                    textAnchor="middle"
                    fill="#333"
                    fontSize="20px"
                    fontWeight="bold"
                  >
                    {totalAmount}
                  </text>
                </>
              );
            }}
          />}
        </Pie>
        <Tooltip content={(props) => <CustomToolTip {...props} type={ToolTipType} />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
