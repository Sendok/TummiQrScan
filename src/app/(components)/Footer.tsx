export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ScanVerse. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          QR Scanning made easy.
        </p>
      </div>
    </footer>
  );
}
