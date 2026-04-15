import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface PadelBallProps {
  className?: string;
  size?: number;
}

export default function PadelBall({ className, size = 40 }: PadelBallProps) {
  return (
    <motion.div 
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      animate={{ 
        rotate: 360,
        y: [0, -10, 0]
      }}
      transition={{ 
        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <svg viewBox="0 0 30 30" className="w-full h-full drop-shadow-lg">
        <circle cx="15" cy="15" r="14.5" fill="white" stroke="black" strokeWidth="0.5" />
        <clipPath id="saBallClip">
          <circle cx="15" cy="15" r="14.5" />
        </clipPath>
        <g clipPath="url(#saBallClip)" transform="translate(15, 15)">
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
          <circle cx="0" cy="0" r="14.5" fill="none" stroke="black" strokeWidth="0.5" opacity="0.2" />
        </g>
      </svg>
    </motion.div>
  );
}
