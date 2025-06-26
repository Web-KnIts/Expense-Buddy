import React from 'react';
import type { TooltipProps } from 'recharts';
import { addThousandsSeparator } from '../../services/helper';

const CustomToolTip: React.FC<TooltipProps<any, any>> = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div className="bg-blue-500/20 shadow-md rounded-lg p-2 border border-gray-300">
      <p className="text-xs font-semibold mb-1" style={{color:item.payload.fill}}>{item.name}</p>
      <p className="text-sm text-gray-600">
        Amount{' '}:
        <span className="text-sm font-medium text-gray-900 ml-2">₹.{addThousandsSeparator(item.value)}</span>
      </p>
    </div>
  );
};

export default CustomToolTip;
