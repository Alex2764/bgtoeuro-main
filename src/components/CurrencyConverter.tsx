import { useState, useEffect } from 'react';
import { ArrowUpDown, TrendingUp } from 'lucide-react';

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
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    const numAmount = parseFloat(amount) || 0;
    setConvertedAmount(convertCurrency(numAmount, fromCurrency, toCurrency));
  }, [amount, fromCurrency, toCurrency]);

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

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="currency-card p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Currency Converter
          </h1>
          <p className="text-muted-foreground text-sm">
            Fast & accurate exchange rates
          </p>
        </div>

        {/* From Currency */}
        <div className="space-y-6">
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
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={handleSwap}
              className={`swap-button ${isSwapping ? 'animate-swap' : ''}`}
              aria-label="Swap currencies"
            >
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </div>

          {/* To Currency */}
          <div className="currency-input-wrapper p-4">
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
                <span className="text-2xl sm:text-3xl font-mono font-bold text-foreground animate-fade-in">
                  {convertedAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 5,
                    maximumFractionDigits: 5,
                  })}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {toCurrencyData.name}
            </p>
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="rate-badge">
              <TrendingUp className="w-4 h-4 text-currency-gold" />
              <span>
                1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Mid-market rate
            </span>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
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
        </div>
      </div>

      {/* Info Note */}
      <p className="text-center text-xs text-muted-foreground mt-4 px-4">
        Note: BGN is pegged to EUR at a fixed rate of 1.9558
      </p>
    </div>
  );
}
