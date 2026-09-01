import React from 'react';

interface BrandLogoProps {
  variant?: 'navbar' | 'full' | 'hero' | 'compact';
  theme?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'navbar',
  theme = 'light',
  className = '',
  showTagline = true,
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-[#111827]';
  const greenColor = isDark ? 'text-[#22C55E]' : 'text-[#16A34A]';
  const dividerColor = isDark ? 'bg-white/20' : 'bg-[#111827]/20';
  const taglineColor = isDark ? 'text-white/75' : 'text-[#111827]/70';

  if (variant === 'full' || variant === 'hero') {
    const isHero = variant === 'hero';
    return (
      <div className={`inline-flex flex-col items-center select-none text-center ${className}`}>
        {/* Devanagari 'मिलावट' with red strikethrough */}
        <div className="relative inline-block leading-none">
          <span 
            className={`font-black tracking-tight font-['Mukta','Noto_Sans_Devanagari','Poppins',sans-serif] ${textColor} ${
              isHero ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl'
            }`}
            style={{ fontWeight: 900 }}
          >
            मिलावट
          </span>
          {/* Red Strikethrough Slash */}
          <div 
            className="absolute left-[-4%] right-[-4%] top-[52%] h-[3px] sm:h-[4px] bg-[#E53935] rounded-full transform -rotate-[2deg] shadow-xs pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* English 'PROOF' in Rich Green */}
        <div className="mt-1 leading-none">
          <span 
            className={`font-black tracking-wider uppercase font-['Plus_Jakarta_Sans',sans-serif] ${greenColor} ${
              isHero ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl'
            }`}
            style={{ fontWeight: 900, letterSpacing: '0.08em' }}
          >
            PROOF
          </span>
        </div>

        {/* Divider & Tagline */}
        {showTagline && (
          <div className="w-full flex flex-col items-center mt-2.5">
            <div className={`w-20 sm:w-28 h-[1.5px] ${dividerColor} mb-1.5`} />
            <span 
              className={`font-bold uppercase tracking-[0.25em] font-['Plus_Jakarta_Sans',sans-serif] ${taglineColor} ${
                isHero ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'
              }`}
            >
              TEST BEFORE YOU TASTE
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
        <div className="relative inline-flex items-center leading-none">
          <span 
            className={`font-black text-sm font-['Mukta','Noto_Sans_Devanagari','Poppins',sans-serif] ${textColor}`}
            style={{ fontWeight: 900 }}
          >
            मिलावट
          </span>
          <div 
            className="absolute left-[-2%] right-[-2%] top-[52%] h-[2px] bg-[#E53935] rounded-full transform -rotate-[2deg]" 
            aria-hidden="true"
          />
        </div>
        <span 
          className={`font-black text-sm tracking-wide uppercase font-['Plus_Jakarta_Sans',sans-serif] ${greenColor}`}
          style={{ fontWeight: 900 }}
        >
          PROOF
        </span>
      </div>
    );
  }

  // Default: navbar format with optical alignment and clean spacing
  return (
    <div className={`inline-flex flex-col justify-center select-none group cursor-pointer ${className}`}>
      <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
        {/* Devanagari with red strikethrough */}
        <div className="relative inline-flex items-center">
          <span 
            className={`font-black text-xl sm:text-2xl tracking-tight font-['Mukta','Noto_Sans_Devanagari','Poppins',sans-serif] ${textColor}`}
            style={{ fontWeight: 900 }}
          >
            मिलावट
          </span>
          <div 
            className="absolute left-[-4%] right-[-4%] top-[52%] h-[2.5px] sm:h-[3px] bg-[#E53935] rounded-full transform -rotate-[2deg] shadow-2xs pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* PROOF in Bold Green */}
        <span 
          className={`font-black text-xl sm:text-2xl tracking-wider uppercase font-['Plus_Jakarta_Sans',sans-serif] ${greenColor}`}
          style={{ fontWeight: 900, letterSpacing: '0.04em' }}
        >
          PROOF
        </span>
      </div>

      {showTagline && (
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] whitespace-nowrap ${taglineColor}`}>
            TEST BEFORE YOU TASTE
          </span>
        </div>
      )}
    </div>
  );
};


