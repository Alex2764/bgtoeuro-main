import CurrencyConverter from '@/components/CurrencyConverter';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Coins } from 'lucide-react';

const Index = () => {
  return (
    <main className="min-h-screen bg-background pt-24 pb-8 px-4 sm:pt-32 md:pt-36 lg:pt-40 xl:pt-44 sm:pb-12">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg mx-auto">
        {/* Logo with Theme Toggle */}
        <div className="flex items-center justify-between gap-3 mb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
              <Coins className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ExchangeNow</span>
          </div>
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-border/50">
            <ThemeToggle />
          </div>
        </div>

        {/* Converter */}
        <CurrencyConverter />
      </div>
    </main>
  );
};

export default Index;
