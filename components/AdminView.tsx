
import React, { useState } from 'react';
import { Zone, SensorReading, Alert } from '../types';
import Map from './Map';
import SensorTable from './SensorTable';
import AlertsFeed from './AlertsFeed';
import AiInsights from './AiInsights';
import HistoryChart from './HistoryChart';

interface AdminViewProps {
  zones: Zone[];
  sensorHistory: Record<string, SensorReading[]>;
  alerts: Alert[];
}

const AdminView: React.FC<AdminViewProps> = ({ zones, sensorHistory, alerts }) => {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(zones[0] || null);

  const handleZoneSelect = (zone: Zone) => {
    setSelectedZone(zone);
  };

  const latestReadings = zones.map(zone => {
      const history = sensorHistory[zone.id];
      return {
          zoneName: zone.name,
          ...history[history.length -1]
      };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Map zones={zones} onZoneSelect={handleZoneSelect} selectedZoneId={selectedZone?.id} />
        <SensorTable readings={latestReadings} />
      </div>

      <div className="lg:col-span-1 space-y-6">
         {selectedZone && sensorHistory[selectedZone.id] && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    Historical Data for {selectedZone.name}
                </h3>
                <div className="h-64">
                    <HistoryChart data={sensorHistory[selectedZone.id]} />
                </div>
            </div>
         )}
        <AiInsights zone={selectedZone} history={selectedZone ? sensorHistory[selectedZone.id] : []}/>
        <AlertsFeed alerts={alerts} />
      </div>
    </div>
  );
};

export default AdminView;
