import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'gold' | 'black' | 'white';
}

export default function Logo({ className, variant = 'gold' }: LogoProps) {
  const logoUrl = "https://storage.googleapis.com/test-platform-static/user_content/input_file_0.png";
  
  return (
    <div className={cn("flex items-center group", className)}>
      <img 
        src={logoUrl} 
        alt="" 
        className="h-20 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Retry logic: if it fails, try setting the src again once
          const target = e.currentTarget;
          if (!target.dataset.retried) {
            target.dataset.retried = "true";
            target.src = logoUrl;
          } else {
            // If it still fails, hide it to avoid broken image icon or text fallback
            target.style.display = 'none';
          }
        }}
      />
    </div>
  );
}
