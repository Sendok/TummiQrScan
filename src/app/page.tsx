"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';
import AdBanner from '@/app/(components)/AdBanner';
import ScanResultDialogContent from '@/app/(components)/ScanResultDialogContent';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { QrCode, ScanLine } from 'lucide-react';
import Image from 'next/image';

// Sample QR codes for simulation
const sampleQrValues = [
  "https://firebase.google.com/",
  "Product ID: XYZ12345",
  "WIFI:T:WPA;S:MySweetHome;P:P@$$wOrd;;",
  "BEGIN:VCARD\nVERSION:3.0\nN:Gump;Forrest\nFN:Forrest Gump\nORG:Bubba Gump Shrimp Co.\nTITLE:Shrimp Man\nTEL;TYPE=WORK,VOICE:(111) 555-1212\nTEL;TYPE=HOME,VOICE:(404) 555-1212\nADR;TYPE=WORK:;;100 Waters Edge;Baytown;LA;30314;United States of America\nEMAIL:forrestgump@example.com\nEND:VCARD",
  "GEO:40.7128,-74.0060"
];

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const [showScanResultDialog, setShowScanResultDialog] = useState(false);
  const [currentScannedValue, setCurrentScannedValue] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleScanButtonClick = () => {
    if (!isClient) return;
    
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * sampleQrValues.length);
      setCurrentScannedValue(sampleQrValues[randomIndex]);
      setShowScanResultDialog(true);
      setIsScanning(false);
    }, 1500); // 1.5 second simulated scan
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-8 pb-20 sm:py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold mb-6 text-primary-foreground">
            Ready to Scan?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Tap the button below to start scanning QR codes with your device.
          </p>

          <div className="relative aspect-square w-full max-w-xs mx-auto bg-card rounded-lg shadow-xl flex items-center justify-center overflow-hidden mb-8 p-4">
            {isScanning ? (
              <div className="flex flex-col items-center justify-center text-card-foreground">
                <ScanLine className="h-16 w-16 animate-pulse text-accent" />
                <p className="mt-4 text-lg font-semibold">Scanning...</p>
                <div className="absolute top-0 left-0 w-full h-1 bg-accent animate-scan-line"></div>
              </div>
            ) : (
              <Image 
                src="https://placehold.co/300x300.png?text=Camera+View" 
                alt="Camera View Placeholder" 
                width={300} 
                height={300}
                className="object-cover rounded"
                data-ai-hint="camera lens"
              />
            )}
          </div>
          
          <style jsx>{`
            .animate-scan-line {
              animation: scan 2s infinite linear;
            }
            @keyframes scan {
              0% { transform: translateY(0); }
              50% { transform: translateY(calc(100% - 4px)); } /* 4px is height of the line */
              100% { transform: translateY(0); }
            }
          `}</style>

          <Dialog open={showScanResultDialog} onOpenChange={setShowScanResultDialog}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-8 px-10 rounded-xl shadow-lg transition-transform hover:scale-105"
                onClick={handleScanButtonClick}
                disabled={isScanning}
              >
                <QrCode className="mr-3 h-7 w-7" />
                {isScanning ? 'Scanning...' : 'Tap to Scan QR Code'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-card text-card-foreground border-border shadow-2xl rounded-lg">
              {currentScannedValue && (
                <ScanResultDialogContent 
                  scannedValue={currentScannedValue} 
                  onClose={() => setShowScanResultDialog(false)} 
                />
              )}
            </DialogContent>
          </Dialog>
          
          <p className="mt-8 text-sm text-muted-foreground">
            Ensure your camera has permission and good lighting for best results.
          </p>
        </div>
        <AdBanner pageName="Scanner" />
      </main>
      <Footer />
    </div>
  );
}
