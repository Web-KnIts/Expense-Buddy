import React from 'react';
import { addThousandsSeparator } from '../../services/helper';

const CustomToolTip: React.FC<any> = ({ active, payload, type }) => {
  if (!active || !payload || payload.length === 0) return null;
  var item;
  switch(type){
    case "1":
       item = payload[0] ;
       break;
    case "2":
      item = payload[0].payload ;
      item.value = payload[0].payload.amount
      item.name = payload[0].payload.category
      item.payload = {
        fill:payload[0].fill
      }
      break;
  }
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
      <p className="text-xs font-semibold mb-1" style={{ color: item?.payload.fill || item.fill }}>{item?.name}</p>
      <p className="text-sm text-gray-600">
        Amount{' '}:
        <span className="text-sm font-medium text-gray-900 ml-2">₹ {addThousandsSeparator(item?.value || 0)}</span>
      </p>
    </div>
  );
};

export default CustomToolTip;
