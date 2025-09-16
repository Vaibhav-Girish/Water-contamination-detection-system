
import { SensorReading, Zone } from '../types';
import { ZONES } from '../constants';

const createSafeReading = (): SensorReading => ({
  timestamp: new Date(),
  ph: 7.0 + (Math.random() - 0.5) * 0.5, // 6.75 - 7.25
  turbidity: 0.5 + Math.random() * 0.4, // 0.5 - 0.9
  lead: 0.005 + Math.random() * 0.005, // 0.005 - 0.01
  eColi: 0,
});

export const generateInitialData = (zones: Zone[]): Record<string, SensorReading[]> => {
  const history: Record<string, SensorReading[]> = {};
  zones.forEach(zone => {
    history[zone.id] = Array.from({ length: 100 }, () => createSafeReading());
  });
  return history;
};

export const generateNextReading = (lastReading: SensorReading): SensorReading => {
  const newReading: SensorReading = { ...lastReading, timestamp: new Date() };

  // Small random fluctuations
  newReading.ph += (Math.random() - 0.5) * 0.2;
  newReading.turbidity += (Math.random() - 0.5) * 0.1;
  newReading.lead += (Math.random() - 0.5) * 0.001;
  
  // Occasional spikes for anomalies
  if (Math.random() < 0.02) { // 2% chance of a spike event
    const spikeType = Math.floor(Math.random() * 4);
    switch (spikeType) {
      case 0: // pH spike
        newReading.ph = Math.random() > 0.5 ? 9.2 : 5.8;
        break;
      case 1: // Turbidity spike
        newReading.turbidity = 6.0 + Math.random();
        break;
      case 2: // Lead spike
        newReading.lead = 0.06 + Math.random() * 0.02;
        break;
      case 3: // E. Coli presence
        newReading.eColi = 1 + Math.floor(Math.random() * 5);
        break;
    }
  } else {
    // Gradual return to normal if value is anomalous
    if (newReading.ph > 8.5 || newReading.ph < 6.5) newReading.ph += (7.0 - newReading.ph) * 0.1;
    if (newReading.turbidity > 1.0) newReading.turbidity -= (newReading.turbidity - 0.8) * 0.1;
    if (newReading.lead > 0.015) newReading.lead -= (newReading.lead - 0.01) * 0.1;
    if (newReading.eColi > 0) newReading.eColi = Math.max(0, newReading.eColi - 1);
  }

  // Clamp values to realistic ranges
  newReading.ph = Math.max(0, Math.min(14, newReading.ph));
  newReading.turbidity = Math.max(0, newReading.turbidity);
  newReading.lead = Math.max(0, newReading.lead);
  newReading.eColi = Math.max(0, newReading.eColi);

  return newReading;
};
