import { BookMarked, BookOpen, Bot, Code2, Home, LineChart, LogIn, LogOut, Menu, Upload, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { AuthDialog } from '@/components/auth/AuthDialog';

const navItems = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Learn', icon: BookOpen, to: '/learn' },
  { label: 'Practice', icon: Code2, to: '/practice' },
  { label: 'Track', icon: LineChart, to: '/track' },
  { label: 'Revision', icon: BookMarked, to: '/revision' },
  { label: 'Import', icon: Upload, to: '/import' },
  { label: 'Assistant', icon: Bot, to: '/assistant' },
] as const;

export function Navbar() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
            aria-label="DSA Studio home"
          >
            <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
            <span>DSA Studio</span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map(({ label, icon: Icon, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isActive && 'bg-accent text-accent-foreground',
                  )
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="hidden text-sm text-muted-foreground sm:inline">{user.username}</span>
                <Button variant="ghost" size="sm" onClick={clearAuth} aria-label={`Log out ${user.username}`}>
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only sm:ml-1">Logout</span>
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setAuthOpen(true)}>
                <LogIn className="h-4 w-4" aria-hidden="true" />
                <span className="ml-1">Sign in</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              aria-label="Close menu overlay"
              onClick={() => setMobileOpen(false)}
            />
            <nav
              id="mobile-nav"
              className="absolute left-0 right-0 top-14 z-50 border-b bg-background p-4 shadow-lg md:hidden"
              aria-label="Mobile navigation"
            >
              <ul className="space-y-1">
                {navItems.map(({ label, icon: Icon, to }) => (
                  <li key={label}>
                    <NavLink
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent',
                          isActive && 'bg-accent text-accent-foreground',
                        )
                      }
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </header>
    </>
  );
}
