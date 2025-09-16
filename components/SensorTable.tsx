
import React from 'react';
import { SENSOR_THRESHOLDS } from '../constants';

interface TableReading {
    zoneName: string;
    timestamp: Date;
    ph: number;
    turbidity: number;
    lead: number;
    eColi: number;
}

interface SensorTableProps {
  readings: TableReading[];
}

const getPhColor = (value: number) => {
  if (value < SENSOR_THRESHOLDS.ph.unsafe[0] || value > SENSOR_THRESHOLDS.ph.unsafe[1]) return 'text-red-500 font-bold';
  if (value < SENSOR_THRESHOLDS.ph.safe[0] || value > SENSOR_THRESHOLDS.ph.safe[1]) return 'text-yellow-500';
  return 'text-gray-300';
};
const getTurbidityColor = (value: number) => {
  if (value > SENSOR_THRESHOLDS.turbidity.unsafe) return 'text-red-500 font-bold';
  if (value > SENSOR_THRESHOLDS.turbidity.safe) return 'text-yellow-500';
  return 'text-gray-300';
};
const getLeadColor = (value: number) => {
  if (value > SENSOR_THRESHOLDS.lead.unsafe) return 'text-red-500 font-bold';
  if (value > SENSOR_THRESHOLDS.lead.safe) return 'text-yellow-500';
  return 'text-gray-300';
};
const getEColiColor = (value: number) => {
  if (value > SENSOR_THRESHOLDS.eColi.unsafe) return 'text-red-500 font-bold';
  if (value > SENSOR_THRESHOLDS.eColi.safe) return 'text-yellow-500';
  return 'text-gray-300';
};


const SensorTable: React.FC<SensorTableProps> = ({ readings }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Real-time Sensor Values</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Zone</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">pH</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Turbidity (NTU)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lead (ppm)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">E. Coli (CFU)</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {readings.map((reading, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{reading.zoneName}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getPhColor(reading.ph)}`}>{reading.ph.toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getTurbidityColor(reading.turbidity)}`}>{reading.turbidity.toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getLeadColor(reading.lead)}`}>{reading.lead.toFixed(4)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getEColiColor(reading.eColi)}`}>{reading.eColi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorTable;
