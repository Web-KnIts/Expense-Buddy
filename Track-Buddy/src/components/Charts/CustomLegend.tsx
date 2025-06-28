import React from 'react';
import type { LegendProps } from 'recharts';

const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {payload?.map((entry : any, index)  => {
        if(typeof(entry.value) === 'number')
        {
          entry.value = entry?.payload?.category;
        }
        return (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      )
      })}
    </div>
  );
};

export default CustomLegend;
