import Link from 'next/link';
import { ScanLine, History, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-background text-primary shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ScanLine className="h-8 w-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-headline font-bold">ScanVerse</h1>
        </Link>
        <nav className="hidden sm:flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              <QrCode className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Scanner</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/history" className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              <History className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>History</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
