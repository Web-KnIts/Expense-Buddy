import moment from "moment";
import type { iExpense, iIncome } from "../pages/types";

export const getInitals = (name : string)=>{
    if(!name) return "";
    const words = name.split(" ");
    let initals = "";
    for(var i = 0;i<Math.min(words.length,2);i++)
    {
        initals+=words[i][0];
    }
    return initals.toUpperCase();
} 


export const addThousandsSeparator = (value : number)=>{
    if(value == null || isNaN(value)) return "";
    const [integerPart,fractionalPart] = value.toString().split(".");
    const formattedInteger = integerPart.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    return fractionalPart ? `${formattedInteger}.${fractionalPart}`: formattedInteger;
}

export const prepareBarChartData = <T extends iIncome | iExpense>(
  data: T[]
): { category: string; amount: number }[] => {
  const res =  data.map((item) => {
    const category =
      'category' in item ? item.category : 'source' in item ? item.source : 'Unknown';
    return {
      category,
      amount: item.amount,
    };
  });
  return res;
};

export const prepareIncomeData = (data: iIncome[]) => {
  const sortedData =  [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const chartData = sortedData.map((item)=>({
    month:moment(item?.date).format('MMMM DD'),
    amount:item?.amount,
    source:item?.source
  }))
  return chartData;
};

export const prepareLineChartData = (data:iExpense[])=>{
  const sortedData =  [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const chartData = sortedData.map((item)=>({
    month:moment(item?.date).format('MMMM DD'),
    amount:item?.amount,
    category:item?.category
  }))
  return chartData;
}