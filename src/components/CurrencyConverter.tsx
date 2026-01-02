import { useState, useEffect, useRef } from 'react';
import { ArrowUpDown, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

const currencies: Currency[] = [
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
];

// Exchange rates relative to EUR (approximate)
const ratesFromEUR: Record<string, number> = {
  EUR: 1,
  BGN: 1.95583, // Fixed rate
};

const convertCurrency = (amount: number, from: string, to: string): number => {
  if (from === to) return amount;
  const amountInEUR = amount / ratesFromEUR[from];
  return amountInEUR * ratesFromEUR[to];
};

const getExchangeRate = (from: string, to: string): number => {
  return ratesFromEUR[to] / ratesFromEUR[from];
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('BGN');
  const [isSwapping, setIsSwapping] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  
  const animationRef = useRef<number | null>(null);
  const prevValueRef = useRef<number>(0);

  // Calculate conversion
  const numAmount = parseFloat(amount) || 0;
  const convertedAmount = convertCurrency(numAmount, fromCurrency, toCurrency);

  // Animate the counter
  useEffect(() => {
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startValue = prevValueRef.current;
    const endValue = convertedAmount;
    const duration = 400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * eased;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        prevValueRef.current = endValue;
        animationRef.current = null;
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [convertedAmount]);

  // Update prevValueRef when animation completes
  useEffect(() => {
    prevValueRef.current = displayValue;
  }, [displayValue]);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setIsSwapping(false);
    }, 200);
  };

  const fromCurrencyData = currencies.find(c => c.code === fromCurrency)!;
  const toCurrencyData = currencies.find(c => c.code === toCurrency)!;
  const rate = getExchangeRate(fromCurrency, toCurrency);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="currency-card p-6 sm:p-8" variants={itemVariants}>
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Currency Converter
          </h1>
          <p className="text-muted-foreground text-sm">
            Fast & accurate exchange rates
          </p>
        </motion.div>

        {/* From Currency */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <div className="currency-input-wrapper p-4">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
              From
            </label>
            <div className="flex items-center gap-3">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="flex-shrink-0 bg-transparent text-foreground font-semibold text-lg cursor-pointer focus:outline-none appearance-none pr-6 bg-no-repeat bg-right"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")` }}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent text-right text-2xl sm:text-3xl font-mono font-bold text-foreground focus:outline-none placeholder:text-muted-foreground/50"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {fromCurrencyData.name}
            </p>
          </div>

          {/* Swap Button */}
          <motion.div
            className="flex justify-center -my-2 relative z-10"
            variants={itemVariants}
          >
            <button
              onClick={handleSwap}
              className={`swap-button ${isSwapping ? 'animate-swap' : ''}`}
              aria-label="Swap currencies"
            >
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </motion.div>

          {/* To Currency */}
          <motion.div className="currency-input-wrapper p-4" variants={itemVariants}>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
              To
            </label>
            <div className="flex items-center gap-3">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="flex-shrink-0 bg-transparent text-foreground font-semibold text-lg cursor-pointer focus:outline-none appearance-none pr-6 bg-no-repeat bg-right"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")` }}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code}
                  </option>
                ))}
              </select>
              <div className="w-full text-right">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
                  {displayValue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {toCurrencyData.name}
            </p>
          </motion.div>
        </motion.div>

        {/* Exchange Rate */}
        <motion.div className="mt-6 pt-6 border-t border-border" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div className="rate-badge">
              <TrendingUp className="w-4 h-4" />
              <span>
                1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Mid-market rate
            </span>
          </div>
        </motion.div>

        {/* Quick Amount Buttons */}
        <motion.div className="mt-6 flex flex-wrap gap-2 justify-center" variants={itemVariants}>
          {[5, 10, 50, 100, 500, 1000].map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount.toString())}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                parseFloat(amount) === quickAmount
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {quickAmount}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Info Note */}
      <motion.p
        className="text-center text-xs text-muted-foreground mt-4 px-4"
        variants={itemVariants}
      >
        Note: BGN is pegged to EUR at a fixed rate of 1.9558
      </motion.p>
    </motion.div>
  );
}