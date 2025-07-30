import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function ShowcaseLink() {
  return (
    <Link href="/components/showcase" className="fixed top-4 right-4 z-50">
      <Button variant="outline" size="sm" className="gap-2">
        <Sparkles className="h-4 w-4" />
        Component Showcase
      </Button>
    </Link>
  );
}