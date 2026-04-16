import { motion } from 'motion/react';
import { Play, BookOpen, Lightbulb, Instagram } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export default function Training() {
  const { playPing } = useSound();
  const categories = [
    {
      title: 'The Basics',
      icon: BookOpen,
      tips: [
        'Racket Grip: Master the continental grip for maximum versatility.',
        'Positioning: Always return to the "home" position after a shot.',
        'Court Rules: Understanding the glass and fence interaction.',
      ]
    },
    {
      title: 'Pro Strategies',
      icon: Lightbulb,
      tips: [
        'Wall Defense: Use the glass to your advantage to slow down the game.',
        'The Perfect Lob: The most important defensive shot in padel.',
        'Communication: Always talk to your partner about court coverage.',
      ]
    }
  ];

  const videos = [
    { id: 'x_je7cePWq0', title: 'The Bandeja: Master the Shot' },
    { id: 'RYDynB38sNE', title: 'Padel Tips & Drills' },
    { id: 'ZLdvlY1IIyk', title: 'The Vibora: Power & Spin' },
    { id: 'P6wsvgqXz_A', title: 'Padel Strategy: Win More Points' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h4 className="font-accent text-2xl text-brand-gold uppercase tracking-[0.2em] mb-4">Level Up</h4>
          <h1 className="text-6xl md:text-8xl font-black italic mb-8 leading-none uppercase">TRAINING, TIPS <br /> & <span className="text-brand-gold">INSPO</span></h1>
          <div className="w-24 h-2 bg-brand-gold" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-video bg-brand-white/5 border border-brand-white/10 overflow-hidden"
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-black to-transparent pointer-events-none">
                  <p className="font-display font-black italic text-sm uppercase text-brand-gold">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            {categories.map((cat, i) => (
              <div key={i} className="bg-brand-white text-brand-black p-8 relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <cat.icon size={48} />
                </div>
                <h3 className="text-2xl font-black italic mb-6 uppercase border-b-2 border-brand-black pb-2">{cat.title}</h3>
                <ul className="space-y-4">
                  {cat.tips.map((tip, j) => (
                    <li key={j} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2 shrink-0" />
                      <p className="text-sm font-medium leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="bg-brand-gold text-brand-black p-8 italic">
              <h3 className="text-2xl font-black mb-4 uppercase">WANT MORE?</h3>
              <p className="mb-6 font-bold">Follow us on Instagram for daily tips, drills, and player stories.</p>
              <a 
                href="https://instagram.com/sapAdelyouthhub" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={playPing}
                className="flex items-center gap-2 font-display font-black text-lg border-b-2 border-brand-black pb-1 hover:text-brand-white hover:border-brand-white active:scale-95 transition-all w-fit"
              >
                <Instagram size={20} /> @sapAdelyouthhub
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
