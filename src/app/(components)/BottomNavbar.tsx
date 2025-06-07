"use client";

import Link from 'next/link';
import { QrCode, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 sm:hidden flex justify-around items-center z-50">
      <Button
        variant="ghost"
        asChild
        className={cn(
          "flex-1 flex flex-col items-center h-auto py-2 text-muted-foreground hover:text-primary",
          pathname === '/' && "text-primary"
        )}
      >
        <Link href="/">
          <QrCode className="h-6 w-6 mb-1" />
          <span className="text-xs">Scanner</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        asChild
        className={cn(
          "flex-1 flex flex-col items-center h-auto py-2 text-muted-foreground hover:text-primary",
          pathname === '/history' && "text-primary"
        )}
      >
        <Link href="/history">
          <History className="h-6 w-6 mb-1" />
          <span className="text-xs">History</span>
        </Link>
      </Button>
    </nav>
  );
}
