import { Megaphone } from 'lucide-react';

interface AdBannerProps {
  pageName: string;
}

export default function AdBanner({ pageName }: AdBannerProps) {
  return (
    <div className="my-6 p-4 bg-accent/20 border border-accent/50 rounded-lg text-center text-foreground">
      <div className="flex items-center justify-center gap-2">
        <Megaphone className="h-6 w-6 text-accent" />
        <p className="font-semibold">Advertisement Area</p>
      </div>
      <p className="text-sm mt-1">
        A banner ad would be displayed here on the {pageName} page.
      </p>
    </div>
  );
}
