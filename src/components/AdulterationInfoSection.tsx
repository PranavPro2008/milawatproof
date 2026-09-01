import React from 'react';
import { ShieldAlert, FlaskConical, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const AdulterationInfoSection: React.FC = () => {
  const cards = [
    {
      title: 'Milk (Doodh)',
      icon: '🥛',
      adulterants: 'Detergent, Fertilizer Urea & Chemical Preservatives',
      hazard: 'Severe stomach irritation, kidney stress & ulcers',
      reactionColor: 'Crimson Red',
      reactionBg: 'bg-red-50 text-red-700 border-red-200',
      dotColor: 'bg-red-600',
      pureReaction: 'Stays pale green / clear',
    },
    {
      title: 'Paneer & Khoya',
      icon: '🧀',
      adulterants: 'Industrial Starch, Maida & Bleached Vegetable Oils',
      hazard: 'Gut inflammation, empty starch displacing protein',
      reactionColor: 'Indigo Blue',
      reactionBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      dotColor: 'bg-indigo-600',
      pureReaction: 'Stays translucent amber',
    },
    {
      title: 'Desi Ghee',
      icon: '🧈',
      adulterants: 'Vanaspati (Hydrogenated Fat) & Palm Stearin',
      hazard: 'Dangerous trans-fats, arterial blockages & high LDL',
      reactionColor: 'Raspberry Red',
      reactionBg: 'bg-rose-50 text-rose-700 border-rose-200',
      dotColor: 'bg-rose-600',
      pureReaction: 'Bottom layer stays clear gold',
    }
  ];

  return (
    <section id="adulteration-info-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#111827]/10 p-5 sm:p-8 shadow-xs space-y-6">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-[#E53935] px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Why Test at Home?</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111827] tracking-tight">
            How Chemical Solutions Expose Hidden Adulterants
          </h2>
          <p className="text-xs sm:text-sm text-[#111827]/70">
            Boiling and smell cannot detect modern synthetic chemicals. Milawat Proof reagents bind instantly with adulterants to produce clear color changes.
          </p>
        </div>

        {/* 3 Clean Scannable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-[#111827]/10 flex flex-col justify-between space-y-3.5"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 pb-2 border-b border-[#111827]/10">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-extrabold text-sm sm:text-base text-[#111827]">
                    {item.title}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#111827]/60 block tracking-wider">
                    Common Adulterants:
                  </span>
                  <p className="text-xs font-semibold text-[#111827] mt-0.5">
                    {item.adulterants}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#E53935] block tracking-wider">
                    Health Risk:
                  </span>
                  <p className="text-xs text-[#111827]/75 mt-0.5">
                    {item.hazard}
                  </p>
                </div>
              </div>

              {/* Color Reaction Result Badge */}
              <div className="pt-2 border-t border-[#111827]/10 space-y-1.5">
                <div className={`p-2 rounded-lg border flex items-center justify-between text-xs font-bold ${item.reactionBg}`}>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${item.dotColor} shrink-0`} />
                    <span>Adulterated:</span>
                  </div>
                  <span>Turns {item.reactionColor}</span>
                </div>
                <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span>Pure: {item.pureReaction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Strip */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF8F5] p-3.5 sm:p-4 rounded-xl border border-[#111827]/10">
          <div className="flex items-center gap-2 text-xs font-medium text-[#111827]">
            <FlaskConical className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>Ready-to-use testing vials • Results in 45–60 seconds • Safe for home use</span>
          </div>
          <a
            href="#products-section"
            className="inline-flex items-center gap-1.5 bg-[#111827] hover:bg-[#111827]/90 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Order Solution Kits</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
