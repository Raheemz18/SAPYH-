import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { User, Users, Trophy, ArrowRight } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export default function UserTypeSelection() {
  const navigate = useNavigate();
  const { playPing } = useSound();

  const userTypes = [
    {
      id: 'player',
      title: 'Player',
      description: 'Register as a youth player to track your rankings and enter tournaments.',
      icon: User,
      color: 'bg-brand-gold',
      route: '/register'
    },
    {
      id: 'parent',
      title: 'Parent',
      description: 'Create an account to track your child\'s progress and stay updated.',
      icon: Users,
      color: 'bg-brand-white',
      route: '/register/parent'
    },
    {
      id: 'organizer',
      title: 'Tournament Organizer',
      description: 'Apply to host and manage official SA Padel Youth Hub events.',
      icon: Trophy,
      color: 'bg-brand-gold',
      route: '/register/organizer'
    }
  ];

  const handleSelection = (route: string) => {
    playPing();
    navigate(route);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full diagonal-distress opacity-5 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h4 className="font-accent text-2xl text-brand-gold uppercase tracking-[0.2em] mb-4">Welcome to the Hub</h4>
        <h1 className="text-6xl md:text-8xl font-black italic mb-6 leading-none uppercase">WHO ARE <span className="text-brand-gold">YOU?</span></h1>
        <p className="text-xl text-brand-white/60 max-w-2xl mx-auto font-bold uppercase tracking-tight">
          Select your profile type to get started with SA Padel Youth Hub.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full relative z-10">
        {userTypes.map((type, i) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleSelection(type.route)}
            className="group cursor-pointer"
          >
            <div className="bg-brand-white text-brand-black p-10 h-full flex flex-col relative overflow-hidden transition-transform hover:-translate-y-2">
              <div className={`absolute top-0 left-0 w-full h-2 ${type.color}`} />
              
              <div className="mb-8">
                <div className={`w-16 h-16 ${type.color === 'bg-brand-gold' ? 'bg-brand-gold text-brand-black' : 'bg-brand-black text-brand-white'} flex items-center justify-center rounded-sm mb-6`}>
                  <type.icon size={32} />
                </div>
                <h3 className="text-3xl font-black italic uppercase mb-4">{type.title}</h3>
                <p className="text-brand-black/60 font-medium leading-relaxed">
                  {type.description}
                </p>
              </div>

              <div className="mt-auto flex items-center gap-2 font-display font-black uppercase italic text-brand-black group-hover:text-brand-gold transition-colors">
                Select Option <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-brand-white/30 text-xs font-bold uppercase tracking-[0.3em]"
      >
        SA Padel Youth Hub • Official Portal Selection
      </motion.p>
    </div>
  );
}
