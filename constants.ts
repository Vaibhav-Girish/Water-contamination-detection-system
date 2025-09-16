
import { Zone, ZoneStatus } from './types';

export const ZONES: Zone[] = [
  { id: 'zone-1', name: 'North Downtown', status: ZoneStatus.Safe, position: { gridColumnStart: 2, gridRowStart: 2 }, lastUpdated: new Date(), issues: [] },
  { id: 'zone-2', name: 'East Park', status: ZoneStatus.Safe, position: { gridColumnStart: 4, gridRowStart: 2 }, lastUpdated: new Date(), issues: [] },
  { id: 'zone-3', name: 'Westside Industrial', status: ZoneStatus.Safe, position: { gridColumnStart: 1, gridRowStart: 3 }, lastUpdated: new Date(), issues: [] },
  { id: 'zone-4', name: 'South Suburbs', status: ZoneStatus.Safe, position: { gridColumnStart: 3, gridRowStart: 4 }, lastUpdated: new Date(), issues: [] },
  { id: 'zone-5', name: 'Central Reservoir', status: ZoneStatus.Safe, position: { gridColumnStart: 3, gridRowStart: 3 }, lastUpdated: new Date(), issues: [] },
];

export const SENSOR_THRESHOLDS = {
  ph: { safe: [6.5, 8.5], unsafe: [6.0, 9.0] },
  turbidity: { safe: 1.0, unsafe: 5.0 }, // NTU
  lead: { safe: 0.015, unsafe: 0.05 }, // ppm
  eColi: { safe: 0, unsafe: 1 }, // CFU/100mL
};
