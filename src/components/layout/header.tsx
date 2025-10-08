import { Gift } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-6">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-foreground">
            <Gift className="w-8 h-8 text-primary" />
            <span className="font-headline">Diwali Delights</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
