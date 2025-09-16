
import React from 'react';
import { Zone, SensorReading, ZoneStatus } from '../types';
import { WaterDropIcon } from './icons/WaterDropIcon';
import HistoryChart from './HistoryChart';

interface CitizenViewProps {
  zone: Zone;
  history: SensorReading[];
}

const statusConfig = {
  [ZoneStatus.Safe]: {
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/50',
    title: 'Water is Safe',
    message: 'The water quality in your area is currently meeting all safety standards.',
  },
  [ZoneStatus.Warning]: {
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/50',
    title: 'Water Quality Warning',
    message: 'Some parameters are outside the normal range. Caution is advised. Check for official announcements.',
  },
  [ZoneStatus.Unsafe]: {
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/50',
    title: 'Water is Unsafe',
    message: 'High-risk contamination detected. Please avoid drinking tap water until further notice. Follow guidance from local authorities.',
  },
};


const CitizenView: React.FC<CitizenViewProps> = ({ zone, history }) => {
  const config = statusConfig[zone.status];
  const lastReading = history[history.length - 1];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className={`p-8 rounded-lg shadow-lg text-center ${config.bgColor}`}>
        <div className="flex justify-center mb-4">
          <WaterDropIcon className={`h-24 w-24 ${config.color}`} />
        </div>
        <h2 className={`text-4xl font-bold ${config.color}`}>{config.title}</h2>
        <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">for {zone.name}</p>
        <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-400">{config.message}</p>
        {zone.issues.length > 0 &&
            <div className="mt-4 text-sm text-yellow-800 dark:text-yellow-300">
                Detected issues: {zone.issues.join(', ')}
            </div>
        }
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-6">
          Last Updated: {zone.lastUpdated.toLocaleString()}
        </div>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">pH Level</p>
                <p className="text-2xl font-bold text-blue-500">{lastReading.ph.toFixed(2)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Turbidity</p>
                <p className="text-2xl font-bold text-teal-500">{lastReading.turbidity.toFixed(2)} <span className="text-sm">NTU</span></p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Lead</p>
                <p className="text-2xl font-bold text-gray-500">{lastReading.lead.toFixed(4)} <span className="text-sm">ppm</span></p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">E. Coli</p>
                <p className="text-2xl font-bold text-orange-500">{lastReading.eColi} <span className="text-sm">CFU</span></p>
            </div>
       </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Recent Water Quality Trends
          </h3>
          <div className="h-80">
              <HistoryChart data={history} />
          </div>
      </div>

       <div className="text-center pt-4">
          <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            Report an Issue
          </button>
       </div>
    </div>
  );
};

export default CitizenView;
