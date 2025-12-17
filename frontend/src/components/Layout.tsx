import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { CartIcon } from './cart/CartIcon';
import { Toaster } from './ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold">Eric Tech</span>
          </Link>
          <nav className="flex items-center space-x-2">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <CartIcon />
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Toaster />
    </div>
  );
}

