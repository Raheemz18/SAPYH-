import { cn } from '@/src/lib/utils';
import { Target } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'gold' | 'black' | 'white';
}

export default function Logo({ className, variant = 'gold' }: LogoProps) {
  const textColorClass = {
    gold: 'text-brand-black',
    black: 'text-brand-black',
    white: 'text-brand-white',
  }[variant];

  const subTextColorClass = {
    gold: 'text-brand-gold',
    black: 'text-brand-black',
    white: 'text-brand-white',
  }[variant];

  const racketColor = variant === 'white' ? 'white' : 'black';
  const detailColor = variant === 'white' ? 'black' : 'white';

  return (
    <div className={cn("flex items-center gap-4 leading-none group", className)}>
      {/* Logo Icon */}
      <div className="relative w-16 h-16 transition-transform group-hover:scale-105 duration-300">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="racketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={variant === 'white' ? '#ffffff' : '#1a1a1a'} />
              <stop offset="100%" stopColor={variant === 'white' ? '#e0e0e0' : '#000000'} />
            </linearGradient>
          </defs>
          
          {/* Padel Racket */}
          <g transform="rotate(15 50 50)">
            {/* Racket Frame/Rim */}
            <path 
              d="M50 8 C28 8 18 23 18 45 C18 64 33 78 50 78 C67 78 82 64 82 45 C82 23 72 8 50 8 Z" 
              fill={variant === 'white' ? '#d1d1d1' : '#333333'} 
            />
            
            {/* Racket Head Surface */}
            <path 
              d="M50 11 C31 11 21 25 21 45 C21 61 35 74 50 74 C65 74 79 61 79 45 C79 25 69 11 50 11 Z" 
              fill="url(#racketGradient)" 
            />

            {/* Racket Holes (Structured Grid) */}
            <g fill={detailColor} opacity="0.25">
              <circle cx="40" cy="28" r="1.3" /><circle cx="50" cy="28" r="1.3" /><circle cx="60" cy="28" r="1.3" />
              <circle cx="35" cy="37" r="1.3" /><circle cx="45" cy="37" r="1.3" /><circle cx="55" cy="37" r="1.3" /><circle cx="65" cy="37" r="1.3" />
              <circle cx="30" cy="46" r="1.3" /><circle cx="40" cy="46" r="1.3" /><circle cx="50" cy="46" r="1.3" /><circle cx="60" cy="46" r="1.3" /><circle cx="70" cy="46" r="1.3" />
              <circle cx="35" cy="55" r="1.3" /><circle cx="45" cy="55" r="1.3" /><circle cx="55" cy="55" r="1.3" /><circle cx="65" cy="55" r="1.3" />
              <circle cx="40" cy="64" r="1.3" /><circle cx="50" cy="64" r="1.3" /><circle cx="60" cy="64" r="1.3" />
            </g>

            {/* Racket Bridge/Throat (Modern Integrated Design) */}
            <path 
              d="M38 74 L50 58 L62 74 L58 85 L42 85 Z" 
              fill={variant === 'white' ? '#e0e0e0' : '#1a1a1a'} 
            />
            <path d="M44 74 L50 66 L56 74 Z" fill={detailColor} opacity="0.15" />

            {/* Racket Handle */}
            <rect x="45.5" y="85" width="9" height="28" fill={racketColor} rx="2" />
            
            {/* Grip Texture (More realistic wrap) */}
            <g stroke={detailColor} strokeWidth="1" opacity="0.25">
              <path d="M45.5 91 L54.5 88" />
              <path d="M45.5 97 L54.5 94" />
              <path d="M45.5 103 L54.5 100" />
              <path d="M45.5 109 L54.5 106" />
            </g>
          </g>

          {/* Padel Ball with SA Flag Pattern */}
          <g transform="translate(65, 65)">
            <circle r="15" fill="white" stroke="black" strokeWidth="0.5" />
            <clipPath id="ballClip">
              <circle r="15" />
            </clipPath>
            <g clipPath="url(#ballClip)">
              {/* Background Bands */}
              <rect x="-15" y="-15" width="30" height="15" fill="#E03C31" /> {/* Red */}
              <rect x="-15" y="0" width="30" height="15" fill="#001489" />   {/* Blue */}
              
              {/* White Border for Y-Shape */}
              <path d="M-15 -15 L2 0 L-15 15" fill="none" stroke="white" strokeWidth="6" />
              <line x1="-15" y1="0" x2="15" y2="0" stroke="white" strokeWidth="6" />
              
              {/* Green Y-Shape */}
              <path d="M-15 -15 L2 0 L-15 15" fill="none" stroke="#007749" strokeWidth="4" />
              <line x1="-15" y1="0" x2="15" y2="0" stroke="#007749" strokeWidth="4" />
              
              {/* Yellow Border for Triangle */}
              <path d="M-15 -15 L2 0 L-15 15 Z" fill="#FFB81C" />
              
              {/* Black Triangle */}
              <path d="M-15 -11 L-2 0 L-15 11 Z" fill="black" />
              
              {/* Ball Seam (Subtle) */}
              <circle r="15" fill="none" stroke="black" strokeWidth="0.5" opacity="0.2" />
            </g>
          </g>
        </svg>
      </div>

      {/* Text Part */}
      <div className="flex flex-col items-start font-sans">
        <span className={cn("text-2xl font-bold tracking-tight", textColorClass)}>
          SA
        </span>
        <span className={cn("text-4xl font-black tracking-tighter -mt-2", textColorClass)}>
          PADEL
        </span>
        <span className={cn("text-lg font-bold tracking-widest -mt-1", subTextColorClass)}>
          YOUTH HUB
        </span>
      </div>
    </div>
  );
}
