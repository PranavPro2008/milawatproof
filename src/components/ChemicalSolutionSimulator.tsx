import React, { useState } from 'react';
import { FlaskConical, AlertTriangle, CheckCircle2, RefreshCw, Sparkles, ShieldCheck, ArrowRight, Droplets, Info } from 'lucide-react';
import { ProductCategory } from '../types';

interface ChemicalSolutionSimulatorProps {
  onSelectCategoryFilter?: (cat: ProductCategory) => void;
}

export const ChemicalSolutionSimulator: React.FC<ChemicalSolutionSimulatorProps> = ({
  onSelectCategoryFilter
}) => {
  const [selectedProduct, setSelectedProduct] = useState<'milk' | 'paneer' | 'ghee'>('milk');
  const [sampleType, setSampleType] = useState<'pure' | 'adulterated'>('adulterated');
  const [isReacting, setIsReacting] = useState(false);
  const [hasTested, setHasTested] = useState(true);

  const testScenarios = {
    milk: {
      name: 'Milk',
      icon: '🥛',
      solutionName: 'Surfactant-Reactive Solution',
      adulterants: 'Detergent, Urea & Synthetic Foam',
      pure: {
        colorLabel: 'Pale Green / Clear',
        liquidBg: 'bg-emerald-400',
        textColor: 'text-emerald-800',
        border: 'border-emerald-500',
        glow: 'shadow-emerald-200 shadow-lg',
        status: '100% PURE MILK',
        explanation: 'Solution remains pale green with zero color shift. Pure natural milk.',
        reactionTime: '30-45 Seconds'
      },
      adulterated: {
        colorLabel: 'Crimson Red',
        liquidBg: 'bg-red-600',
        textColor: 'text-red-700',
        border: 'border-red-600',
        glow: 'shadow-red-300 shadow-lg',
        status: 'ADULTERATION DETECTED',
        explanation: 'Solution shifts into deep crimson red when detergent or urea reacts with chromo-reagent.',
        reactionTime: '45 Seconds'
      }
    },
    paneer: {
      name: 'Paneer',
      icon: '🧀',
      solutionName: 'Iodo-Chromo Solution',
      adulterants: 'Industrial Starch & Refined Flour',
      pure: {
        colorLabel: 'Golden Amber',
        liquidBg: 'bg-amber-400',
        textColor: 'text-amber-800',
        border: 'border-amber-500',
        glow: 'shadow-amber-200 shadow-lg',
        status: '100% PURE PANEER',
        explanation: 'Solution remains clear golden amber, verifying real dairy curd proteins.',
        reactionTime: '60 Seconds'
      },
      adulterated: {
        colorLabel: 'Indigo Blue',
        liquidBg: 'bg-indigo-700',
        textColor: 'text-indigo-800',
        border: 'border-indigo-600',
        glow: 'shadow-indigo-300 shadow-lg',
        status: 'STARCH / SYNTHETIC FILLERS FOUND',
        explanation: 'Solution transforms to deep indigo blue upon reacting with starch or flour texturizers.',
        reactionTime: '60 Seconds'
      }
    },
    ghee: {
      name: 'Desi Ghee',
      icon: '🧈',
      solutionName: 'Baudouin Reagent Solution',
      adulterants: 'Vanaspati & Refined Palm Stearin',
      pure: {
        colorLabel: 'Clear Gold (No Red Layer)',
        liquidBg: 'bg-yellow-300',
        textColor: 'text-yellow-800',
        border: 'border-yellow-400',
        glow: 'shadow-yellow-200 shadow-lg',
        status: '100% PURE DESI GHEE',
        explanation: 'The lower solution layer stays completely clear underneath floating ghee.',
        reactionTime: '90 Seconds'
      },
      adulterated: {
        colorLabel: 'Raspberry Red Layer',
        liquidBg: 'bg-rose-600',
        textColor: 'text-rose-700',
        border: 'border-rose-600',
        glow: 'shadow-rose-300 shadow-lg',
        status: 'VANASPATI DETECTED',
        explanation: 'Acid-furfural reagent reacts with vanaspati to form an intense red bottom layer.',
        reactionTime: '90 Seconds'
      }
    }
  };

  const currentScenario = testScenarios[selectedProduct];
  const activeResult = sampleType === 'pure' ? currentScenario.pure : currentScenario.adulterated;

  const handleTriggerTest = (type: 'pure' | 'adulterated') => {
    setSampleType(type);
    setIsReacting(true);
    setTimeout(() => {
      setIsReacting(false);
      setHasTested(true);
    }, 600);
  };

  const handleProductChange = (prod: 'milk' | 'paneer' | 'ghee') => {
    setSelectedProduct(prod);
    setIsReacting(true);
    setTimeout(() => {
      setIsReacting(false);
    }, 500);
  };

  return (
    <section id="chemical-solution-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Anchor for simulator-section alias */}
      <div id="simulator-section" className="sr-only"></div>
      <div className="bg-[#FAF8F5] rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-[#111827]/10 shadow-sm relative overflow-hidden">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#E53935]/10 border border-[#E53935]/20 text-[#E53935] px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
            <FlaskConical className="w-3.5 h-3.5 shrink-0" />
            <span>Chemical Solution Color-Change Technology</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight leading-snug">
            Put Your Product in the Solution — Watch the Color Shift
          </h2>
          <p className="text-xs sm:text-sm text-[#111827]/75 mt-1.5 sm:mt-2 leading-relaxed">
            No complex steps or lab equipment. Every Milawat Proof kit comes with pre-filled, non-toxic chemical solution vials. Simply add your dairy sample and get an immediate, unmistakable color change.
          </p>
        </div>

        {/* Interactive Testing Simulator Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-[#111827]/10 shadow-xs">
          
          {/* Controls: Choose Product & Sample State */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            {/* Step 1: Select Dairy Category */}
            <div>
              <label className="text-[11px] sm:text-xs font-bold uppercase text-[#111827]/60 tracking-wider block mb-2">
                1. Select Food Product to Put in Solution:
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {(['milk', 'paneer', 'ghee'] as const).map(cat => (
                  <button
                    key={cat}
                    id={`sim-cat-${cat}`}
                    onClick={() => handleProductChange(cat)}
                    className={`p-2 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      selectedProduct === cat
                        ? 'bg-[#111827] text-white border-[#111827] shadow-md font-bold'
                        : 'bg-[#FAF8F5] text-[#111827] border-[#111827]/10 hover:bg-[#F4EFE6]'
                    }`}
                  >
                    <span className="text-lg sm:text-xl">
                      {cat === 'milk' ? '🥛' : cat === 'paneer' ? '🧀' : '🧈'}
                    </span>
                    <span className="text-[11px] sm:text-xs capitalize font-semibold leading-tight">
                      {cat === 'milk' ? 'Fresh Milk' : cat === 'paneer' ? 'Paneer / Khoya' : 'Desi Ghee'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Sample Purity State */}
            <div>
              <label className="text-[11px] sm:text-xs font-bold uppercase text-[#111827]/60 tracking-wider block mb-2">
                2. Choose What You Are Putting into the Vial:
              </label>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  id="sim-pure-btn"
                  onClick={() => handleTriggerTest('pure')}
                  className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all ${
                    sampleType === 'pure'
                      ? 'bg-emerald-50 border-[#16A34A] ring-2 ring-[#16A34A]/20 shadow-xs'
                      : 'bg-[#FAF8F5] border-[#111827]/10 hover:bg-[#F4EFE6]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      Pure Sample
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#111827]/70 leading-tight">
                    Natural 100% farm pure {currentScenario.name.toLowerCase()}
                  </p>
                </button>

                <button
                  id="sim-adulterated-btn"
                  onClick={() => handleTriggerTest('adulterated')}
                  className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all ${
                    sampleType === 'adulterated'
                      ? 'bg-red-50 border-[#E53935] ring-2 ring-[#E53935]/20 shadow-xs'
                      : 'bg-[#FAF8F5] border-[#111827]/10 hover:bg-[#F4EFE6]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#E53935] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      Adulterated Sample
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#E53935]"></span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#111827]/70 leading-tight">
                    With {currentScenario.adulterants.split(',')[0]}
                  </p>
                </button>
              </div>
            </div>

            {/* Solution Info Pill */}
            <div className="p-2.5 sm:p-3 bg-[#FAF8F5] rounded-xl border border-[#111827]/10 text-xs flex items-start gap-2 sm:gap-2.5">
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#111827]/60 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#111827] block text-[11px] sm:text-xs">
                  Chemical Solution Reagent:
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#111827]/80">
                  {currentScenario.solutionName} (Pre-filled calibrated vial)
                </span>
              </div>
            </div>

            {onSelectCategoryFilter && (
              <button
                onClick={() => onSelectCategoryFilter(selectedProduct as ProductCategory)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#111827] hover:bg-[#111827]/90 text-white py-2.5 sm:py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
              >
                <span>View {currentScenario.name} Chemical Solution Kit</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

          </div>

          {/* Visual Chemical Solution Vial & Color Change Display */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#111827]/10 flex flex-col items-center">
            
            <div className="w-full flex flex-wrap items-center justify-between gap-1.5 border-b border-[#111827]/10 pb-2.5 sm:pb-3 mb-4 sm:mb-5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg">{currentScenario.icon}</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#111827] uppercase tracking-wider">
                  Chemical Solution Reaction Chamber
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="retrigger-sim-btn"
                  onClick={() => handleTriggerTest(sampleType)}
                  title="Re-run chemical reaction animation"
                  className="text-[10px] sm:text-[11px] font-bold text-[#111827] hover:text-[#E53935] flex items-center gap-1 bg-white hover:bg-[#F4EFE6] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-[#111827]/10 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isReacting ? 'animate-spin text-[#E53935]' : ''}`} />
                  <span>{isReacting ? 'Reacting...' : 'Re-test Sample'}</span>
                </button>
                <span className="text-[10px] sm:text-[11px] font-semibold bg-white text-[#111827] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-[#111827]/10">
                  {activeResult.reactionTime}
                </span>
              </div>
            </div>

            {/* Test Tube Graphic with Reactive Liquid */}
            <div className="relative py-2 sm:py-4 flex flex-col items-center justify-center">
              
              {/* Dropper putting product into vial */}
              <button 
                onClick={() => handleTriggerTest(sampleType)}
                className="flex flex-col items-center mb-2 cursor-pointer group focus:outline-none"
                title="Click to add sample drops and trigger reaction"
              >
                <div className="flex items-center gap-1.5 bg-white group-hover:bg-[#F4EFE6] border border-[#111827]/15 px-2.5 sm:px-3 py-1 rounded-full shadow-xs text-[11px] sm:text-xs font-bold text-[#111827] transition-colors">
                  <Droplets className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E53935] ${isReacting ? 'animate-bounce' : ''}`} />
                  <span>Adding {currentScenario.name} into Solution</span>
                </div>
                <div className={`w-1.5 h-2.5 bg-blue-400 rounded-full my-0.5 transition-all ${isReacting ? 'translate-y-2 opacity-0' : 'opacity-100'}`}></div>
              </button>

              {/* Chemical Test Tube Vessel */}
              <div className="w-24 sm:w-32 h-56 sm:h-72 border-4 border-slate-700/80 rounded-b-full bg-white/70 backdrop-blur-xs relative overflow-hidden flex flex-col justify-end p-2 shadow-inner">
                
                {/* Measurement marks */}
                <div className="absolute top-4 sm:top-6 left-1.5 sm:left-2 right-1.5 sm:right-2 flex flex-col gap-3 sm:gap-4 text-[8px] sm:text-[9px] font-mono text-slate-400 select-none pointer-events-none">
                  <div className="w-4 border-t border-slate-300"> 10ml</div>
                  <div className="w-5 sm:w-6 border-t border-slate-400"> 8ml</div>
                  <div className="w-4 border-t border-slate-300"> 6ml</div>
                  <div className="w-5 sm:w-6 border-t border-slate-400"> 4ml</div>
                  <div className="w-4 border-t border-slate-300"> 2ml</div>
                </div>

                {/* Animated Chemical Liquid */}
                <div 
                  className={`w-full rounded-b-[36px] sm:rounded-b-[40px] transition-all duration-700 ease-out flex flex-col items-center justify-center relative overflow-hidden ${
                    isReacting ? 'h-20 sm:h-24 bg-slate-300 animate-pulse' : `h-36 sm:h-44 ${activeResult.liquidBg} ${activeResult.glow}`
                  }`}
                >
                  {/* Liquid surface wave / meniscus */}
                  <div className="absolute top-0 inset-x-0 h-2.5 sm:h-3 bg-white/30 rounded-full blur-[1px]"></div>
                  
                  {/* Floating reaction particles/bubbles */}
                  <div className="space-y-0.5 sm:space-y-1 text-center text-white/90">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider block drop-shadow-xs px-1">
                      {isReacting ? 'Reacting...' : sampleType === 'pure' ? 'Clear / Pure' : 'Color Shift!'}
                    </span>
                    <span className="text-[8px] sm:text-[9px] opacity-80 block drop-shadow-xs truncate max-w-[90px]">
                      {activeResult.colorLabel.split('/')[0]}
                    </span>
                  </div>
                </div>

              </div>

              {/* Vial Cap Stand */}
              <div className="w-32 sm:w-36 h-2.5 sm:h-3 bg-slate-800 rounded-full mt-1 shadow-md"></div>
            </div>

            {/* Reaction Outcome Badge & Explanation */}
            <div className={`mt-4 sm:mt-5 w-full p-3 sm:p-4 rounded-xl border transition-all ${
              sampleType === 'pure'
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 sm:gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 ${sampleType === 'pure' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  <span className="font-extrabold text-[11px] sm:text-xs tracking-wide text-[#111827]">
                    SOLUTION TURNS: <span className={sampleType === 'pure' ? 'text-emerald-700' : 'text-red-700'}>{activeResult.colorLabel}</span>
                  </span>
                </div>
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 rounded self-start xs:self-auto ${
                  sampleType === 'pure' ? 'bg-emerald-200/60 text-emerald-900' : 'bg-red-200/60 text-red-900'
                }`}>
                  {activeResult.status}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#111827]/80 leading-relaxed">
                {activeResult.explanation}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
