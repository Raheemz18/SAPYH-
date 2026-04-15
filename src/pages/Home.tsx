import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Target, Users, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PLAYER_FEATURES } from '@/src/constants';
import Logo from '@/src/components/Logo';
import { useSound } from '../hooks/useSound';

export default function Home() {
  const { playPing } = useSound();
  const latestPlayer = PLAYER_FEATURES.find(p => p.isLatest) || PLAYER_FEATURES[0];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/padel-tennis-action-hero/1920/1080" 
            alt="SA Padel Youth Action" 
            className="w-full h-full object-cover opacity-50 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
          <div className="absolute inset-0 diagonal-distress opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <Logo className="mb-8 scale-150 md:scale-[2]" />
            
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-none italic uppercase">
              Welcome to <br />
              <span className="text-brand-gold">SA PADEL YOUTH HUB</span> 🇿🇦
            </h1>
            <p className="text-xl md:text-2xl text-brand-white/90 max-w-3xl mx-auto mb-10 font-bold leading-relaxed">
              Your go-to space for everything padel youth in SA. Tournaments, events, updates & opportunities. <br />
              <span className="text-brand-gold">For the youth. For the game. For YOU! 🎾🔥</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/register" 
                onClick={playPing}
                className="group relative bg-brand-gold text-brand-black font-display font-black text-xl px-10 py-4 uppercase italic skew-x-[-12deg] hover:scale-105 transition-all"
              >
                <span className="skew-x-[12deg] flex items-center gap-2">
                  Register Player Profile <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/rankings" 
                onClick={playPing}
                className="font-accent text-2xl uppercase tracking-widest border-b-2 border-brand-gold/50 hover:border-brand-gold transition-colors pb-1"
              >
                View Rankings
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-gold/50"
        >
          <div className="w-1 h-12 bg-brand-gold/20 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-brand-gold animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-brand-white text-brand-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight italic">
              A NEW SPACE FOR THE <br />
              <span className="text-brand-gold bg-brand-black px-4 py-1 inline-block skew-x-[-6deg]">
                <span className="skew-x-[6deg] block">NEXT GEN</span>
              </span>
            </h2>
            <p className="text-xl text-brand-black/70 leading-relaxed mb-8">
              We are where the youth community connects, grows, and levels up. Discover tournament updates, find opportunities to play, and connect with a crew of passionate young players from across the country.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-1 bg-brand-gold" />
              <div className="w-12 h-1 bg-brand-black" />
              <div className="w-12 h-1 bg-brand-gold" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 border-2 border-brand-gold skew-x-[-3deg] z-0" />
            <img 
              src="https://picsum.photos/seed/padel-tennis-youth-sa/800/1200" 
              alt="Next Gen Padel Player" 
              className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, title: 'Tournaments & Events', desc: 'Get first access to youth-specific competitions and social mixers.' },
              { icon: Trophy, title: 'Play, Grow & Compete', desc: 'Match with players your age and skill level to elevate your game.' },
              { icon: Target, title: 'Tips & Inspo', desc: 'Learn from top coaches and the best youth players in the country.' },
              { icon: Users, title: 'Community', desc: 'Join a crew of passionate young players who share your hype for the sport.' },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 border border-brand-white/10 hover:border-brand-gold/50 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <benefit.icon size={80} />
                </div>
                <benefit.icon className="text-brand-gold mb-6" size={40} />
                <h3 className="text-2xl font-black mb-4 italic">{benefit.title}</h3>
                <p className="text-brand-white/60 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Player Spotlight Section */}
      <section className="py-24 bg-brand-white text-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h4 className="font-accent text-2xl text-brand-gold uppercase tracking-[0.2em] mb-2">Faces of the Future</h4>
              <h2 className="text-5xl md:text-7xl font-black italic">PLAYER SPOTLIGHT</h2>
            </div>
            <Link 
              to="/spotlights" 
              onClick={playPing}
              className="font-display font-black text-lg border-b-4 border-brand-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-all"
            >
              VIEW ALL SPOTLIGHTS
            </Link>
          </div>

          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-brand-black text-brand-white overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 aspect-[4/5] relative overflow-hidden">
                <img 
                  src={latestPlayer.image} 
                  alt={latestPlayer.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-brand-gold text-brand-black px-4 py-1 font-display font-black italic skew-x-[-12deg]">
                  <span className="skew-x-[12deg] block">LATEST FEATURE</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 border-t-4 md:border-t-0 md:border-l-4 border-brand-gold flex flex-col justify-center">
                <h3 className="text-4xl font-black italic mb-2 uppercase">{latestPlayer.name}</h3>
                <p className="text-brand-gold font-accent text-xl tracking-widest mb-6 uppercase">{latestPlayer.location} • {latestPlayer.category}</p>
                <div className="text-brand-white/70 whitespace-pre-line leading-relaxed mb-8">
                  {latestPlayer.writeup.split('\n\n')[0]}...
                </div>
                <Link 
                  to="/spotlights" 
                  onClick={playPing}
                  className="bg-brand-gold text-brand-black font-display font-black px-8 py-3 uppercase italic w-fit hover:scale-105 transition-transform"
                >
                  Read Full Story
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 diagonal-distress opacity-5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black italic mb-4">HOW IT WORKS</h2>
            <div className="w-24 h-2 bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Arrows for desktop */}
            <div className="hidden md:block absolute top-1/4 left-1/3 w-1/6 h-0.5 bg-brand-gold/30 clip-path-arrow" />
            <div className="hidden md:block absolute top-1/4 left-2/3 w-1/6 h-0.5 bg-brand-gold/30 clip-path-arrow" />

            {[
              { step: '01', title: 'SIGN UP', desc: 'Drop your details in our quick form to join the hub.' },
              { step: '02', title: 'GET CONNECTED', desc: 'Get the exclusive link to our WhatsApp community.' },
              { step: '03', title: 'HIT THE COURT', desc: 'Find games, enter tournaments, and start leveling up.' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="text-8xl font-black text-stroke-gold mb-6 group-hover:text-brand-gold transition-colors duration-500">
                  {item.step}
                </div>
                <h3 className="text-3xl font-black italic mb-4">{item.title}</h3>
                <p className="text-brand-white/60 max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-brand-gold text-brand-black relative overflow-hidden">
        <div className="absolute inset-0 diagonal-distress opacity-20" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-black mb-8 italic leading-none">
              FOR THE YOUTH. <br /> FOR THE GAME. <br /> <span className="text-brand-black">FOR YOU.</span>
            </h2>
            <p className="text-2xl mb-12 font-bold uppercase tracking-tight">
              Ready to take your game to the next level? The courts are waiting.
            </p>
            <Link 
              to="/register" 
              onClick={playPing}
              className="inline-block bg-brand-black text-brand-gold font-display font-black text-2xl px-12 py-6 uppercase italic skew-x-[-12deg] hover:scale-110 transition-all shadow-2xl"
            >
              <span className="skew-x-[12deg] block">Register Player Profile</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
