import type { ScanData } from './types';

export const mockScans: ScanData[] = [
  {
    id: '1',
    qrValue: 'https://example.com/product/123',
    timestamp: new Date(Date.now() - 3600 * 1000 * 24 * 2), // 2 days ago
    location: { latitude: 34.0522, longitude: -118.2437 },
    notes: 'This is a sample product link. Checked availability.',
    labels: ['product', 'link', 'urgent'],
  },
  {
    id: '2',
    qrValue: 'WIFI:S:MyHomeNetwork;T:WPA;P:SuperSecretPassword;;',
    timestamp: new Date(Date.now() - 3600 * 1000 * 5), // 5 hours ago
    notes: 'Home Wi-Fi credentials. Do not share.',
    labels: ['wifi', 'credentials'],
  },
  {
    id: '3',
    qrValue: 'BEGIN:VCARD\nVERSION:3.0\nN:Doe;John\nFN:John Doe\nORG:Example Corp.\nTEL;TYPE=WORK,VOICE:(123) 456-7890\nEMAIL:john.doe@example.com\nEND:VCARD',
    timestamp: new Date(Date.now() - 3600 * 1000 * 24 * 7), // 7 days ago
    location: { latitude: 40.7128, longitude: -74.0060 },
    labels: ['contact', 'vcard'],
  },
  {
    id: '4',
    qrValue: 'GEO:37.7749,-122.4194',
    timestamp: new Date(Date.now() - 3600 * 1000 * 1), // 1 hour ago
    notes: 'Coordinates for meeting point.',
    labels: ['location', 'meeting'],
  },
];
