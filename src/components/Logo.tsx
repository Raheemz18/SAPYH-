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

  return (
    <div className={cn("flex items-center gap-4 leading-none group", className)}>
      {/* Logo Icon */}
      <div className="relative w-16 h-16 transition-transform group-hover:scale-105 duration-300">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Padel Racket */}
          <g transform="rotate(-15 50 50)">
            {/* Racket Head (Tear-drop shape) */}
            <path 
              d="M35 10 C15 10 5 25 5 45 C5 60 15 75 35 75 C55 75 65 60 65 45 C65 25 55 10 35 10 Z" 
              fill="black" 
            />
            {/* Racket Holes (Structured Grid) */}
            <g fill="white" opacity="0.2">
              <circle cx="25" cy="25" r="1.2" /><circle cx="35" cy="25" r="1.2" /><circle cx="45" cy="25" r="1.2" />
              <circle cx="20" cy="35" r="1.2" /><circle cx="30" cy="35" r="1.2" /><circle cx="40" cy="35" r="1.2" /><circle cx="50" cy="35" r="1.2" />
              <circle cx="15" cy="45" r="1.2" /><circle cx="25" cy="45" r="1.2" /><circle cx="35" cy="45" r="1.2" /><circle cx="45" cy="45" r="1.2" /><circle cx="55" cy="45" r="1.2" />
              <circle cx="20" cy="55" r="1.2" /><circle cx="30" cy="55" r="1.2" /><circle cx="40" cy="55" r="1.2" /><circle cx="50" cy="55" r="1.2" />
              <circle cx="25" cy="65" r="1.2" /><circle cx="35" cy="65" r="1.2" /><circle cx="45" cy="65" r="1.2" />
            </g>
            {/* Racket Bridge/Throat (Modern V-shape) */}
            <path d="M25 75 L35 60 L45 75 L40 85 L30 85 Z" fill="black" />
            <path d="M30 75 L35 68 L40 75 Z" fill="white" opacity="0.1" />
            {/* Racket Handle */}
            <rect x="31" y="85" width="8" height="28" fill="black" rx="1.5" />
            {/* Grip Texture */}
            <g stroke="white" strokeWidth="0.8" opacity="0.2">
              <line x1="31" y1="92" x2="39" y2="89" />
              <line x1="31" y1="98" x2="39" y2="95" />
              <line x1="31" y1="104" x2="39" y2="101" />
              <line x1="31" y1="110" x2="39" y2="107" />
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
