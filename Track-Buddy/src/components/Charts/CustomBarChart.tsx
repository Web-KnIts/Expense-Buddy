import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts'
import CustomToolTip from './CustomToolTip';
import CustomLegend from './CustomLegend';

interface iCustomBarChart{
    data:{
        name:string;
        amount:number;
    }[]
}

const CustomBarChart = ({data}:iCustomBarChart) => {
    const getColor = (index : number)=>{
        return index % 2 == 0?"#875cf5":"#cfbefb"
    }
  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke='none'/>
                <XAxis dataKey={"month"}tick={{fontSize:12,fill:'#555'}}/>
                <YAxis tick={{fontSize:12,fill:'#555'}}/>
                <Tooltip content={<CustomToolTip type='2'/>}/>
                <Bar dataKey={"amount"} isAnimationActive fill='#FF8042' radius={[10,10,0,0]} activeBar={{r:8,fill:'yellow'}}>
                    {data.map((entry,index)=>(
                        <Cell key={index} fill={getColor(index)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart