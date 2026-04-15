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
            {/* Racket Head */}
            <path 
              d="M35 15 C15 15 5 30 5 50 C5 70 15 85 35 85 L35 85 C55 85 65 70 65 50 C65 30 55 15 35 15 Z" 
              fill="black" 
            />
            {/* Racket Holes */}
            <g fill="white" opacity="0.2">
              <circle cx="25" cy="35" r="1.5" /><circle cx="35" cy="35" r="1.5" /><circle cx="45" cy="35" r="1.5" />
              <circle cx="20" cy="45" r="1.5" /><circle cx="30" cy="45" r="1.5" /><circle cx="40" cy="45" r="1.5" /><circle cx="50" cy="45" r="1.5" />
              <circle cx="20" cy="55" r="1.5" /><circle cx="30" cy="55" r="1.5" /><circle cx="40" cy="55" r="1.5" /><circle cx="50" cy="55" r="1.5" />
              <circle cx="25" cy="65" r="1.5" /><circle cx="35" cy="65" r="1.5" /><circle cx="45" cy="65" r="1.5" />
            </g>
            {/* Racket Throat */}
            <path d="M30 85 L40 85 L35 75 Z" fill="white" opacity="0.1" />
            {/* Racket Handle */}
            <rect x="32" y="85" width="6" height="25" fill="black" rx="1" />
            {/* Grip Lines */}
            <g stroke="white" strokeWidth="0.5" opacity="0.3">
              <line x1="32" y1="90" x2="38" y2="88" />
              <line x1="32" y1="95" x2="38" y2="93" />
              <line x1="32" y1="100" x2="38" y2="98" />
              <line x1="32" y1="105" x2="38" y2="103" />
            </g>
          </g>

          {/* Padel Ball with SA Flag Pattern */}
          <g transform="translate(65, 65)">
            <circle r="15" fill="white" stroke="black" strokeWidth="0.5" />
            <clipPath id="ballClip">
              <circle r="15" />
            </clipPath>
            <g clipPath="url(#ballClip)">
              {/* Red Top */}
              <rect x="-15" y="-15" width="30" height="15" fill="#E03C31" />
              {/* Blue Bottom */}
              <rect x="-15" y="0" width="30" height="15" fill="#001489" />
              {/* Green Y-Shape */}
              <path d="M-15 -5 L-5 -5 L15 15 L15 30 L-15 30 Z" fill="#007749" transform="rotate(-45 0 0)" />
              <path d="M-15 5 L-5 5 L15 -15 L15 -30 L-15 -30 Z" fill="#007749" transform="rotate(45 0 0)" />
              <rect x="-15" y="-3" width="30" height="6" fill="#007749" />
              {/* Black Triangle */}
              <path d="M-15 -15 L0 0 L-15 15 Z" fill="black" />
              {/* Yellow Border for Triangle */}
              <path d="M-15 -15 L0 0 L-15 15" fill="none" stroke="#FFB81C" strokeWidth="2" />
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
