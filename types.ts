
export enum UserRole {
  Citizen = 'Citizen',
  Authority = 'Authority',
}

export enum ZoneStatus {
  Safe = 'Safe',
  Warning = 'Warning',
  Unsafe = 'Unsafe',
}

export interface SensorReading {
  timestamp: Date;
  ph: number; // 0-14, 7 is neutral
  turbidity: number; // NTU (Nephelometric Turbidity Units)
  lead: number; // ppm (parts per million)
  eColi: number; // CFU/100mL (Colony Forming Units)
}

export interface Zone {
  id: string;
  name: string;
  status: ZoneStatus;
  position: {
    gridColumnStart: number;
    gridRowStart: number;
  };
  lastUpdated: Date;
  issues: string[];
}

export interface Alert {
  id: string;
  zoneId: string;
  zoneName: string;
  message: string;
  timestamp: Date;
  severity: 'high' | 'medium' | 'low';
}
