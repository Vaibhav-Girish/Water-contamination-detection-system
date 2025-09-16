
import React, { useState } from 'react';
import { UserRole, Zone, SensorReading, Alert } from '../types';
import AdminView from './AdminView';
import CitizenView from './CitizenView';

interface DashboardProps {
  userRole: UserRole;
  zones: Zone[];
  sensorHistory: Record<string, SensorReading[]>;
  alerts: Alert[];
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, zones, sensorHistory, alerts }) => {
  // In a real app, this would come from user profile or location services
  const [citizenZoneId] = useState<string>('zone-1'); 

  if (userRole === UserRole.Authority) {
    return (
      <AdminView zones={zones} sensorHistory={sensorHistory} alerts={alerts} />
    );
  }

  const citizenZone = zones.find(z => z.id === citizenZoneId);
  const citizenHistory = sensorHistory[citizenZoneId];

  return (
    <div className="container mx-auto">
      {citizenZone && citizenHistory ? (
        <CitizenView zone={citizenZone} history={citizenHistory} />
      ) : (
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold">Could not load data for your zone.</h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
