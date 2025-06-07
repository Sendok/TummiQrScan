export interface ScanData {
  id: string;
  qrValue: string;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
  labels?: string[];
}
