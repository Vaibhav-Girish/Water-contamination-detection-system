
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SensorReading } from '../types';

interface HistoryChartProps {
  data: SensorReading[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  const chartData = data.map(reading => ({
    time: new Date(reading.timestamp).toLocaleTimeString(),
    pH: reading.ph,
    Turbidity: reading.turbidity,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
        <XAxis dataKey="time" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
        <YAxis yAxisId="left" tick={{ fill: '#60A5FA', fontSize: 12 }} />
        <YAxis yAxisId="right" orientation="right" tick={{ fill: '#2DD4BF', fontSize: 12 }}/>
        <Tooltip
          contentStyle={{ 
            backgroundColor: 'rgba(31, 41, 55, 0.8)', // bg-gray-800 with opacity
            border: '1px solid #4B5563', // border-gray-600
            borderRadius: '0.5rem' // rounded-lg
          }}
          labelStyle={{ color: '#F9FAFB' }} // text-gray-50
        />
        <Legend wrapperStyle={{fontSize: "12px"}}/>
        <Line yAxisId="left" type="monotone" dataKey="pH" stroke="#60A5FA" strokeWidth={2} dot={false} />
        <Line yAxisId="right" type="monotone" dataKey="Turbidity" stroke="#2DD4BF" strokeWidth={2} dot={false}/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
