"use client";

import type { ScanData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, ExternalLink, Save, FileText, Tags, MapPin } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface ScanResultDialogContentProps {
  scannedValue: string;
  onClose: () => void;
}

export default function ScanResultDialogContent({ scannedValue, onClose }: ScanResultDialogContentProps) {
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [labels, setLabels] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulate fetching location
    if (navigator.geolocation) {
      const success = (position: GeolocationPosition) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      };
      const error = () => {
        console.warn("Could not get location. User might have denied permission or feature not available.");
      };
      // Randomly decide whether to ask for location to simulate optional nature
      if (Math.random() > 0.5) {
        navigator.geolocation.getCurrentPosition(success, error, { timeout: 5000 });
      }
    }
  }, []);


  const handleSave = () => {
    const newScan: Omit<ScanData, 'id' | 'timestamp'> = {
      qrValue: scannedValue,
      notes: notes || undefined,
      labels: labels ? labels.split(',').map(l => l.trim()).filter(l => l) : undefined,
      location: latitude && longitude ? { latitude, longitude } : undefined,
    };
    // In a real app, this would be saved to Firestore.
    console.log('Saving scan (simulated):', { ...newScan, timestamp: new Date(), id: Date.now().toString() });
    toast({
      title: 'Scan Saved (Simulated)',
      description: `QR: ${scannedValue.substring(0,30)}...`,
      variant: 'default',
    });
    onClose();
  };

  const handleCopyToClipboard = () => {
    if (!isClient) return;
    navigator.clipboard.writeText(scannedValue)
      .then(() => {
        toast({ title: 'Copied to clipboard!', description: scannedValue.substring(0,30)+'...' });
      })
      .catch(err => {
        toast({ title: 'Failed to copy', description: err.message, variant: 'destructive' });
      });
  };

  const handleOpenInBrowser = () => {
    if (!isClient) return;
    // Basic check if it's a URL. More robust validation would be needed.
    if (scannedValue.startsWith('http://') || scannedValue.startsWith('https://')) {
      window.open(scannedValue, '_blank', 'noopener,noreferrer');
    } else {
      toast({ title: 'Not a valid URL', description: 'Cannot open this value in a browser.', variant: 'destructive' });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-headline flex items-center gap-2"><QrCodeIcon className="h-6 w-6 text-primary" /> Scan Result</DialogTitle>
        <DialogDescription className="break-all bg-muted/50 p-3 rounded-md max-h-24 overflow-y-auto">
          {scannedValue}
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="notes" className="flex items-center gap-1"><FileText size={16}/> Notes (Optional)</Label>
          <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add any relevant notes..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="labels" className="flex items-center gap-1"><Tags size={16}/> Labels (Optional, comma-separated)</Label>
          <Input id="labels" value={labels} onChange={(e) => setLabels(e.target.value)} placeholder="e.g., work, personal, important" />
        </div>
        {isClient && latitude && longitude && (
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin size={16} /> Location captured: {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </div>
        )}
      </div>

      <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyToClipboard} className="w-full sm:w-auto">
            <Copy size={16} className="mr-2" /> Copy
          </Button>
          <Button variant="outline" onClick={handleOpenInBrowser} className="w-full sm:w-auto">
            <ExternalLink size={16} className="mr-2" /> Open
          </Button>
        </div>
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save size={16} className="mr-2" /> Save Scan
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}

// Custom QrCode icon as it's not directly in lucide-react in this shape easily.
// Using a generic one for now or placeholder. A real QrCode icon would be better.
// For now, using a placeholder SVG or a similar lucide icon.
const QrCodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
    <line x1="14" y1="14" x2="14" y2="17.5"></line>
    <line x1="14" y1="21" x2="17.5" y2="21"></line>
    <line x1="17.5" y1="14" x2="21" y2="14"></line>
    <line x1="21" y1="17.5" x2="21" y2="21"></line>
  </svg>
);
