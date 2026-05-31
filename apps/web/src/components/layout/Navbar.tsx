import { BookOpen, Bot, Code2, Home, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', icon: Home, href: '#', active: true },
  { label: 'Learn', icon: BookOpen, href: '#learn', active: false },
  { label: 'Practice', icon: Code2, href: '#practice', active: false },
  { label: 'Track', icon: LineChart, href: '#track', active: false },
  { label: 'Assistant', icon: Bot, href: '#assistant', active: false },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <Code2 className="h-5 w-5 text-primary" />
          <span>DSA Studio</span>
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ label, icon: Icon, href, active }) => (
            <a
              key={label}
              href={href}
              className={cn(
                'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                active && 'bg-accent text-accent-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
