import { motion } from 'motion/react';
import { Instagram, ArrowRight, Quote } from 'lucide-react';
import { PLAYER_FEATURES } from '@/src/constants';
import { useSound } from '../hooks/useSound';

export default function Spotlights() {
  const { playPing } = useSound();
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h4 className="font-accent text-2xl text-brand-gold uppercase tracking-[0.2em] mb-4">Faces of the Future</h4>
          <h1 className="text-6xl md:text-8xl font-black italic mb-8 leading-none uppercase">PLAYER <br /> <span className="text-brand-gold">SPOTLIGHTS</span></h1>
          <div className="w-24 h-2 bg-brand-gold" />
          <p className="text-xl text-brand-white/60 mt-8 max-w-2xl">
            Celebrating the talent, heart, and determination of the next generation of SA Padel stars.
          </p>
        </header>

        <div className="space-y-32">
          {PLAYER_FEATURES.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
            >
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-4 border-2 border-brand-gold/30 skew-x-[-3deg] group-hover:border-brand-gold transition-colors" />
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={player.image} 
                    alt={player.name} 
                    className="w-full h-full object-cover transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {player.isLatest && (
                    <div className="absolute top-6 left-6 bg-brand-gold text-brand-black px-4 py-1 font-display font-black italic skew-x-[-12deg]">
                      <span className="skew-x-[12deg] block">LATEST FEATURE</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="mb-8">
                  <h2 className="text-4xl md:text-6xl font-black italic mb-2 uppercase leading-tight">{player.name}</h2>
                  <div className="flex items-center gap-4">
                    <p className="text-brand-gold font-accent text-2xl tracking-widest uppercase">{player.location} • {player.category}</p>
                    <div className="h-px flex-grow bg-brand-gold/20" />
                  </div>
                  <a 
                    href={`https://instagram.com/${player.handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-white/50 hover:text-brand-gold transition-colors mt-2 font-bold italic"
                  >
                    <Instagram size={18} /> {player.handle} ({player.age} yrs)
                  </a>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-6 -left-6 text-brand-gold/10" size={64} />
                  <div className="text-brand-white/80 text-lg leading-relaxed whitespace-pre-line italic">
                    {player.writeup}
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <div className="w-12 h-1 bg-brand-gold" />
                  <div className="w-12 h-1 bg-brand-white/20" />
                  <div className="w-12 h-1 bg-brand-gold" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nomination CTA */}
        <div className="mt-32 p-16 bg-brand-gold text-brand-black text-center relative overflow-hidden">
          <div className="absolute inset-0 diagonal-distress opacity-10" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-black italic mb-8 uppercase leading-none">WANT TO BE <br /> THE NEXT FEATURE?</h2>
            <p className="text-2xl font-bold mb-12 max-w-2xl mx-auto uppercase tracking-tight">
              We're always looking for players who show heart, skill, and determination on the court.
            </p>
            <button 
              onClick={playPing}
              className="bg-brand-black text-brand-gold font-display font-black text-2xl px-12 py-6 uppercase italic skew-x-[-12deg] hover:scale-110 active:scale-95 transition-all shadow-2xl"
            >
              <span className="skew-x-[12deg] block">Nominate a Player</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
