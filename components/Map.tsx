
import React from 'react';
import { Zone, ZoneStatus } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';
import { SensorIcon } from './icons/SensorIcon';

interface MapProps {
  zones: Zone[];
  onZoneSelect: (zone: Zone) => void;
  selectedZoneId?: string | null;
}

const statusClasses = {
  [ZoneStatus.Safe]: 'bg-green-500 border-green-700 text-white',
  [ZoneStatus.Warning]: 'bg-yellow-500 border-yellow-700 text-black',
  [ZoneStatus.Unsafe]: 'bg-red-500 border-red-700 text-white animate-pulse',
};

const Map: React.FC<MapProps> = ({ zones, onZoneSelect, selectedZoneId }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <MapPinIcon className="h-6 w-6 mr-2 text-blue-500"/>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Monitoring Zones</h3>
      </div>
      <div className="relative aspect-[16/9] bg-blue-100 dark:bg-gray-700 rounded-md p-2 border-2 border-blue-200 dark:border-gray-600">
        <div className="grid grid-cols-5 grid-rows-5 w-full h-full gap-1">
          {zones.map(zone => (
            <div
              key={zone.id}
              className="flex items-center justify-center"
              style={{
                gridColumnStart: zone.position.gridColumnStart,
                gridRowStart: zone.position.gridRowStart,
              }}
            >
              <button
                onClick={() => onZoneSelect(zone)}
                title={zone.name}
                className={`transform transition-transform duration-200 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 rounded-full ${selectedZoneId === zone.id ? 'scale-125 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800' : ''}`}
              >
                <SensorIcon className={`h-10 w-10 p-2 rounded-full border-2 ${statusClasses[zone.status]}`}/>
              </button>
            </div>
          ))}
        </div>
      </div>
       <div className="flex justify-end space-x-4 mt-4 text-xs">
          <div className="flex items-center"><span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>Safe</div>
          <div className="flex items-center"><span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>Warning</div>
          <div className="flex items-center"><span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>Unsafe</div>
      </div>
    </div>
  );
};

export default Map;
