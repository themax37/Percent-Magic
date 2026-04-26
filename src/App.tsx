import React, { useState, useEffect } from 'react';
import { Sun, MoonStar, Sparkles, RefreshCcw } from 'lucide-react';

const AdPlaceholder = ({ width, height, className = "" }: { width: number, height: number, className?: string }) => {
  return (
    <div 
      className={`border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-900/50 max-w-full overflow-hidden ${className}`}
      style={{ width, height: height, minHeight: height }}
    >
      <span className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold mb-1">Advertisement</span>
      <div className="text-zinc-500 dark:text-zinc-600 text-sm">{width} x {height}</div>
    </div>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(false);

  // Formula 1: What is X% of Y?
  const [f1X, setF1X] = useState<string>('');
  const [f1Y, setF1Y] = useState<string>('');

  // Formula 2: X is what % of Y?
  const [f2X, setF2X] = useState<string>('');
  const [f2Y, setF2Y] = useState<string>('');

  // Formula 3: Growth & Decline (From X to Y)
  const [f3X, setF3X] = useState<string>('');
  const [f3Y, setF3Y] = useState<string>('');

  useEffect(() => {
    // Only apply class, assume we default to light if not set
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  const resetAll = () => {
    setF1X(''); setF1Y('');
    setF2X(''); setF2Y('');
    setF3X(''); setF3Y('');
  };

  const formatResult = (val: number) => {
    if (isNaN(val) || !isFinite(val)) return '—';
    return Number(val.toFixed(4)).toString();
  };

  // Calculations
  const f1Result = formatResult((parseFloat(f1X) / 100) * parseFloat(f1Y));
  const f2Result = formatResult((parseFloat(f2X) / parseFloat(f2Y)) * 100);
  
  const rawF3 = ((parseFloat(f3Y) - parseFloat(f3X)) / Math.abs(parseFloat(f3X))) * 100;
  const f3Result = formatResult(rawF3);

  const f3ColorClass = () => {
    if (isNaN(rawF3) || !isFinite(rawF3)) return 'text-zinc-300 dark:text-zinc-700';
    if (rawF3 > 0) return 'text-emerald-500 dark:text-emerald-400';
    if (rawF3 < 0) return 'text-rose-500 dark:text-rose-400';
    return 'text-zinc-400 dark:text-zinc-500';
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans selection:bg-indigo-500/30 transition-colors duration-300 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between mt-6 px-4 md:px-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            <Sparkles size={20} className="fill-white/20" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Percent Magic</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode} 
            className="w-14 h-7 bg-zinc-200 dark:bg-zinc-800 rounded-full p-1 flex items-center relative transition-colors shadow-inner"
            aria-label="Toggle dark mode"
          >
            <div className={`w-5 h-5 bg-white dark:bg-zinc-50 rounded-full shadow-sm transition-transform duration-300 absolute z-10 ${isDark ? 'translate-x-7' : 'translate-x-0'}`}></div>
            <div className="absolute left-1.5 opacity-50 text-zinc-500 dark:text-zinc-400 flex items-center">
              <MoonStar size={14} />
            </div>
            <div className="absolute right-1.5 opacity-50 text-zinc-500 dark:text-zinc-400 flex items-center">
              <Sun size={14} />
            </div>
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto w-full px-4 md:px-8 pt-10 pb-24 flex flex-col flex-grow">
        {/* Hero Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 md:mb-1">
            Numbers, <span className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">demystified.</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">A premium collection of simple, precise percentage calculators.</p>
        </header>

        {/* Top Ad */}
        <div className="flex justify-center mb-8">
          <AdPlaceholder width={728} height={90} className="hidden sm:flex" />
          <AdPlaceholder width={320} height={100} className="flex sm:hidden" />
        </div>

        {/* Action Bar */}
        <div className="flex justify-end mb-4 px-2">
          <button 
            onClick={resetAll}
            className="group flex flex-row items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 uppercase tracking-wider transition-colors"
          >
            <RefreshCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500 ease-out" />
            Reset all
          </button>
        </div>

        {/* Calculators Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow px-2">
          
          {/* Formula 1 */}
          <div className="md:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-xl flex flex-col md:flex-row items-center justify-between group gap-6">
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Formula 01
                </span>
                <h3 className="text-zinc-500 dark:text-zinc-400 font-medium">What is X% of Y?</h3>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                  <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold">Percentage (X)</label>
                  <input 
                    type="number" 
                    value={f1X}
                    onChange={e => setF1X(e.target.value)}
                    placeholder="X"
                    className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-3xl font-bold rounded-2xl px-4 py-2 w-full sm:w-32 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-900 dark:text-white transition-colors" 
                  />
                </div>
                
                <span className="text-2xl text-zinc-400 dark:text-zinc-700 mt-2 sm:mt-6 hidden sm:block">of</span>

                <div className="flex flex-col gap-1 w-full sm:w-auto">
                  <label className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold">Total (Y)</label>
                  <input 
                    type="number" 
                    value={f1Y}
                    onChange={e => setF1Y(e.target.value)}
                    placeholder="Y"
                    className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-3xl font-bold rounded-2xl px-4 py-2 w-full sm:w-48 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-900 dark:text-white transition-colors" 
                  />
                </div>
              </div>
            </div>
            
            <div className="hidden md:block h-24 w-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
            
            <div className="w-full md:w-auto md:pl-8 md:pr-4">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold block mb-1">Result</span>
              <div className={`text-6xl font-black tabular-nums transition-colors tracking-tight ${f1Result === '—' ? 'text-zinc-300 dark:text-zinc-800' : 'text-indigo-500 dark:text-indigo-400'}`}>
                {f1Result}
              </div>
            </div>
          </div>

          {/* Formula 2 */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Formula 02
              </span>
              <h3 className="text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap">Portion to Percent</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input 
                type="number" 
                value={f2X}
                onChange={e => setF2X(e.target.value)}
                placeholder="X"
                className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-2xl font-bold rounded-2xl px-4 py-2 outline-none focus:border-zinc-400 dark:focus:border-zinc-700 text-zinc-900 dark:text-white transition-colors w-full" 
              />
              <input 
                type="number" 
                value={f2Y}
                onChange={e => setF2Y(e.target.value)}
                placeholder="Y"
                className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-2xl font-bold rounded-2xl px-4 py-2 outline-none focus:border-zinc-400 dark:focus:border-zinc-700 text-zinc-900 dark:text-white transition-colors w-full" 
              />
            </div>

            <div className="mt-auto flex flex-wrap items-baseline gap-2">
              <span className="text-zinc-400 dark:text-zinc-500 text-sm">Result:</span>
              <span className={`text-4xl font-black tabular-nums tracking-tight ${f2Result === '—' ? 'text-zinc-300 dark:text-zinc-800' : 'text-zinc-900 dark:text-white'}`}>
                {f2Result !== '—' ? `${f2Result}%` : '—'}
              </span>
            </div>
          </div>

          {/* Formula 3 */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Formula 03
              </span>
              <h3 className="text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap">Growth / Decline</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input 
                type="number" 
                value={f3X}
                onChange={e => setF3X(e.target.value)}
                placeholder="From"
                className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-2xl font-bold rounded-2xl px-4 py-2 outline-none focus:border-zinc-400 dark:focus:border-zinc-700 text-zinc-900 dark:text-white transition-colors w-full" 
              />
              <input 
                type="number" 
                value={f3Y}
                onChange={e => setF3Y(e.target.value)}
                placeholder="To"
                className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-2xl font-bold rounded-2xl px-4 py-2 outline-none focus:border-zinc-400 dark:focus:border-zinc-700 text-zinc-900 dark:text-white transition-colors w-full" 
              />
            </div>

            <div className="mt-auto flex flex-wrap items-baseline gap-2">
              <span className="text-zinc-400 dark:text-zinc-500 text-sm">Change:</span>
              <span className={`text-4xl font-black tabular-nums tracking-tight ${f3Result === '—' ? 'text-zinc-300 dark:text-zinc-800' : f3ColorClass()}`}>
                {f3Result !== '—' && rawF3 > 0 ? '+' : ''}{f3Result}{f3Result !== '—' && '%'}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Ad */}
        <div className="flex justify-center mt-6">
          <AdPlaceholder width={970} height={250} className="hidden md:flex" />
          <AdPlaceholder width={728} height={90} className="hidden sm:flex md:hidden" />
          <AdPlaceholder width={320} height={250} className="flex sm:hidden" />
        </div>

      </main>
    </div>
  );
}

