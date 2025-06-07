"use client";

import type { ScanData } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Copy, ExternalLink, Clock, MapPin, FileText, Tags, Edit3, Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface ScanHistoryCardProps {
  scan: ScanData;
  onDelete: (id: string) => void; // Add onDelete prop
}

export default function ScanHistoryCard({ scan, onDelete }: ScanHistoryCardProps) {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopyToClipboard = () => {
    if (!isClient) return;
    navigator.clipboard.writeText(scan.qrValue)
      .then(() => {
        toast({ title: 'Copied to clipboard!', description: scan.qrValue.substring(0,30)+'...' });
      })
      .catch(err => {
        toast({ title: 'Failed to copy', description: err.message, variant: 'destructive' });
      });
  };

  const handleOpenInBrowser = () => {
    if (!isClient) return;
    if (scan.qrValue.startsWith('http://') || scan.qrValue.startsWith('https://')) {
      window.open(scan.qrValue, '_blank', 'noopener,noreferrer');
    } else {
      toast({ title: 'Not a valid URL', description: 'Cannot open this value in a browser.', variant: 'destructive' });
    }
  };
  
  const handleEdit = () => {
    // In a real app, this would open a modal or navigate to an edit page.
    toast({ title: 'Edit (Simulated)', description: `Editing scan: ${scan.qrValue.substring(0,20)}...` });
  };

  const handleDeleteConfirm = () => {
    onDelete(scan.id);
    toast({ title: 'Scan Deleted (Simulated)', description: `Scan ID: ${scan.id} removed.` });
  };


  return (
    <Card className="w-full bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-lg break-all leading-tight">
          {scan.qrValue.length > 70 ? `${scan.qrValue.substring(0, 70)}...` : scan.qrValue}
        </CardTitle>
        <CardDescription className="flex items-center text-xs pt-1">
          <Clock size={14} className="mr-1 flex-shrink-0" /> 
          {new Date(scan.timestamp).toLocaleString()}
          {scan.location && (
            <span className="ml-2 flex items-center">
              <MapPin size={14} className="mr-1 flex-shrink-0" /> 
              {scan.location.latitude.toFixed(2)}, {scan.location.longitude.toFixed(2)}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {scan.notes && (
          <div className="text-sm">
            <p className="font-semibold flex items-center gap-1 mb-1"><FileText size={16} /> Notes:</p>
            <p className="pl-1 text-muted-foreground bg-background/10 p-2 rounded">{scan.notes}</p>
          </div>
        )}
        {scan.labels && scan.labels.length > 0 && (
          <div>
            <p className="font-semibold flex items-center gap-1 mb-1"><Tags size={16} /> Labels:</p>
            <div className="flex flex-wrap gap-1 pl-1">
              {scan.labels.map(label => (
                <Badge key={label} variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/80">
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4">
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="text-xs">
            <Copy size={14} className="mr-1" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleOpenInBrowser} className="text-xs">
            <ExternalLink size={14} className="mr-1" /> Open
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="ghost" size="sm" onClick={handleEdit} className="text-xs text-muted-foreground hover:text-foreground">
            <Edit3 size={14} className="mr-1" /> Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive/80 hover:bg-destructive/10">
                <Trash2 size={14} className="mr-1" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card text-card-foreground border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-headline">Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the scan record.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
