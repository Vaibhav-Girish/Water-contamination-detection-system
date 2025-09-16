
import React, { useState, useEffect, useCallback } from 'react';
import { UserRole, SensorReading, Zone, Alert, ZoneStatus } from './types';
import { ZONES, SENSOR_THRESHOLDS } from './constants';
import { generateInitialData, generateNextReading } from './services/sensorService';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NotificationPopup from './components/NotificationPopup';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.Authority);
  const [zones, setZones] = useState<Zone[]>(ZONES);
  const [sensorHistory, setSensorHistory] = useState<Record<string, SensorReading[]>>(
    generateInitialData(ZONES)
  );
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [latestAlert, setLatestAlert] = useState<Alert | null>(null);

  const checkContamination = useCallback((reading: SensorReading): { status: ZoneStatus; issues: string[] } => {
    const issues: string[] = [];
    let highRiskCount = 0;
    let warningCount = 0;

    if (reading.ph < SENSOR_THRESHOLDS.ph.safe[0] || reading.ph > SENSOR_THRESHOLDS.ph.safe[1]) {
      if (reading.ph < SENSOR_THRESHOLDS.ph.unsafe[0] || reading.ph > SENSOR_THRESHOLDS.ph.unsafe[1]) {
        issues.push('Critical pH level');
        highRiskCount++;
      } else {
        issues.push('pH level warning');
        warningCount++;
      }
    }
    if (reading.turbidity > SENSOR_THRESHOLDS.turbidity.safe) {
      if (reading.turbidity > SENSOR_THRESHOLDS.turbidity.unsafe) {
        issues.push('Critical Turbidity');
        highRiskCount++;
      } else {
        issues.push('High Turbidity');
        warningCount++;
      }
    }
    if (reading.lead > SENSOR_THRESHOLDS.lead.safe) {
      if (reading.lead > SENSOR_THRESHOLDS.lead.unsafe) {
        issues.push('Critical Lead level');
        highRiskCount++;
      } else {
        issues.push('High Lead level');
        warningCount++;
      }
    }
    if (reading.eColi > SENSOR_THRESHOLDS.eColi.safe) {
      if (reading.eColi > SENSOR_THRESHOLDS.eColi.unsafe) {
        issues.push('Critical E. Coli presence');
        highRiskCount++;
      } else {
        issues.push('E. Coli presence');
        warningCount++;
      }
    }

    if (highRiskCount > 0) return { status: ZoneStatus.Unsafe, issues };
    if (warningCount > 0) return { status: ZoneStatus.Warning, issues };
    return { status: ZoneStatus.Safe, issues: [] };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSensorHistory = { ...sensorHistory };
      const updatedZones = [...zones];
      const newAlerts: Alert[] = [];

      for (const zone of updatedZones) {
        const lastReading = newSensorHistory[zone.id][newSensorHistory[zone.id].length - 1];
        const newReading = generateNextReading(lastReading);
        newSensorHistory[zone.id] = [...newSensorHistory[zone.id].slice(-99), newReading];

        const previousStatus = zone.status;
        const { status, issues } = checkContamination(newReading);
        zone.status = status;
        zone.issues = issues;
        zone.lastUpdated = newReading.timestamp;

        if (status === ZoneStatus.Unsafe && previousStatus !== ZoneStatus.Unsafe) {
          const alert: Alert = {
            id: `${zone.id}-${newReading.timestamp.getTime()}`,
            zoneId: zone.id,
            zoneName: zone.name,
            message: `High-risk contamination detected in ${zone.name}: ${issues.join(', ')}.`,
            timestamp: newReading.timestamp,
            severity: 'high',
          };
          newAlerts.push(alert);
        } else if (status === ZoneStatus.Warning && previousStatus === ZoneStatus.Safe) {
           const alert: Alert = {
            id: `${zone.id}-${newReading.timestamp.getTime()}`,
            zoneId: zone.id,
            zoneName: zone.name,
            message: `Water quality warning in ${zone.name}: ${issues.join(', ')}.`,
            timestamp: newReading.timestamp,
            severity: 'medium',
          };
          newAlerts.push(alert);
        }
      }

      setSensorHistory(newSensorHistory);
      setZones(updatedZones);

      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 50));
        // Show the most critical new alert as a popup
        const criticalAlert = newAlerts.find(a => a.severity === 'high') || newAlerts[0];
        setLatestAlert(criticalAlert);
      }
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorHistory, zones]);

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header
        userRole={userRole}
        onRoleChange={handleRoleChange}
        alertCount={alerts.filter(a => a.severity === 'high').length}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard
          userRole={userRole}
          zones={zones}
          sensorHistory={sensorHistory}
          alerts={alerts}
        />
      </main>
      {latestAlert && (
         <NotificationPopup
          alert={latestAlert}
          onClose={() => setLatestAlert(null)}
        />
      )}
    </div>
  );
};

export default App;
