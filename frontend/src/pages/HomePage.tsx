import { Link } from 'react-router-dom';
import { ArrowRight, Package, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-6 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          Welcome to Eric Tech
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Your Premium E-commerce
          <br />
          <span className="text-primary">Shopping Destination</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover amazing products with seamless shopping experience. Browse, add to cart, and checkout with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="text-base">
            <Link to="/products">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base">
            <Link to="/cart">
              <ShoppingCart className="mr-2 h-5 w-5" />
              View Cart
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Wide Selection</CardTitle>
            <CardDescription>Browse our extensive product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Explore a diverse range of high-quality products across multiple categories.
            </p>
            <Link to="/products">
              <Button className="w-full">View Products</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Easy Shopping</CardTitle>
            <CardDescription>Seamless cart and checkout experience</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add items to your cart, manage quantities, and complete your purchase effortlessly.
            </p>
            <Link to="/cart">
              <Button variant="outline" className="w-full">
                Go to Cart
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Premium Quality</CardTitle>
            <CardDescription>Top-rated products and service</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              We ensure the highest quality standards for all our products and services.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

