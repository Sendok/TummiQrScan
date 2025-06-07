"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';
import AdBanner from '@/app/(components)/AdBanner';
import ScanHistoryCard from '@/app/(components)/ScanHistoryCard';
import { mockScans as initialMockScans } from '@/lib/mockData';
import type { ScanData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

export default function HistoryPage() {
  const [isClient, setIsClient] = useState(false);
  const [scans, setScans] = useState<ScanData[]>(initialMockScans);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLabel, setFilterLabel] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    setIsClient(true);
    // In a real app, fetch from Firestore here.
    // For now, we use mockScans loaded into state.
  }, []);

  const handleDeleteScan = (id: string) => {
    setScans(prevScans => prevScans.filter(scan => scan.id !== id));
  };

  const allLabels = useMemo(() => {
    const labelsSet = new Set<string>();
    scans.forEach(scan => scan.labels?.forEach(label => labelsSet.add(label)));
    return Array.from(labelsSet).sort();
  }, [scans]);

  const filteredAndSortedScans = useMemo(() => {
    let processedScans = scans;

    // Filter by search term (checks qrValue, notes, and labels)
    if (searchTerm) {
      processedScans = processedScans.filter(scan =>
        scan.qrValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scan.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scan.labels?.some(label => label.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by label
    if (filterLabel !== 'all') {
      processedScans = processedScans.filter(scan => scan.labels?.includes(filterLabel));
    }

    // Sort
    processedScans.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
    });

    return processedScans;
  }, [scans, searchTerm, filterLabel, sortOrder]);


  if (!isClient) {
    // Basic loading state or null for SSR/static generation
    return (
       <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h2 className="text-3xl font-headline font-bold mb-6 text-primary-foreground">Scan History</h2>
          <p>Loading history...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl sm:text-4xl font-headline font-bold mb-8 text-primary-foreground text-center sm:text-left">
          Scan History
        </h2>

        <div className="mb-6 p-4 bg-card/80 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search scans (value, notes, labels)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 focus:bg-background text-foreground"
            />
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Select value={filterLabel} onValueChange={setFilterLabel}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background/50 focus:bg-background text-foreground">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter by label" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="all">All Labels</SelectItem>
                {allLabels.map(label => (
                  <SelectItem key={label} value={label}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'newest' | 'oldest')}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background/50 focus:bg-background text-foreground">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredAndSortedScans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedScans.map(scan => (
              <ScanHistoryCard key={scan.id} scan={scan} onDelete={handleDeleteScan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-card/50 rounded-lg shadow">
            <p className="text-xl font-semibold text-muted-foreground">No scans found.</p>
            <p className="text-muted-foreground mt-2">Try adjusting your filters or scan some QR codes!</p>
          </div>
        )}
        <AdBanner pageName="History" />
      </main>
      <Footer />
    </div>
  );
}
