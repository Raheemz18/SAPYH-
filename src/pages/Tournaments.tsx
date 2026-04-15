import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Trophy, ArrowRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useSound } from '../hooks/useSound';

export default function Tournaments() {
  const { playPing } = useSound();
  const events = [
    {
      id: 1,
      title: 'Padel Promises SA',
      date: 'MAY 01-03',
      location: 'Johannesburg',
      format: 'Youth Divisions',
      status: 'Open for Entry',
      color: 'brand-gold'
    },
    {
      id: 2,
      title: 'SA Padel Youth Hub Fun Day',
      date: 'MAY 16',
      location: 'TBA',
      format: 'Social & Fun',
      status: 'Open for Entry',
      color: 'brand-white'
    },
    {
      id: 3,
      title: 'FIP Promises Lusaka',
      date: 'JUNE 04-07',
      location: 'Lusaka, Zambia',
      format: 'International Youth',
      status: 'Coming Soon',
      color: 'brand-gold'
    },
    {
      id: 4,
      title: 'Padel Promises SA FIP (Durban)',
      date: 'JUNE 25-28',
      location: 'Durban',
      format: 'FIP Promises',
      status: 'NOT CONFIRMED',
      color: 'brand-white'
    },
    {
      id: 5,
      title: 'FIP Promises Abidjan',
      date: 'JULY 02-05',
      location: 'Abidjan, Ivory Coast',
      format: 'International Youth',
      status: 'Coming Soon',
      color: 'brand-gold'
    },
    {
      id: 6,
      title: "SA Grand Junior's",
      date: 'JULY 17-19',
      location: 'Johannesburg',
      format: 'Junior Championship',
      status: 'Coming Soon',
      color: 'brand-white'
    },
    {
      id: 7,
      title: 'Smash Bash NXT Gen',
      date: 'JULY 24-26',
      location: 'TBA',
      format: 'Next Gen Tournament',
      status: 'Coming Soon',
      color: 'brand-gold'
    },
    {
      id: 8,
      title: 'Balwin FIP Promises',
      date: 'AUGUST 27-30',
      location: 'Johannesburg',
      format: 'FIP Promises',
      status: 'Coming Soon',
      color: 'brand-white'
    },
    {
      id: 9,
      title: "SA Grand Junior's",
      date: 'OCTOBER 09-11',
      location: 'Johannesburg',
      format: 'Junior Championship',
      status: 'Coming Soon',
      color: 'brand-gold'
    },
    {
      id: 10,
      title: 'Smash Bash NXT Gen',
      date: 'OCTOBER 23-25',
      location: 'TBA',
      format: 'Next Gen Tournament',
      status: 'Coming Soon',
      color: 'brand-white'
    }
  ];

  const [selectedMonth, setSelectedMonth] = useState('MAY');

  const monthData: Record<string, { days: number, events: number[] }> = {
    'MAY': { days: 31, events: [1, 2, 3, 16] },
    'JUNE': { days: 30, events: [4, 5, 6, 7, 25, 26, 27, 28] },
    'JULY': { days: 31, events: [2, 3, 4, 5, 17, 18, 19, 24, 25, 26] },
    'AUGUST': { days: 31, events: [27, 28, 29, 30] },
    'SEPTEMBER': { days: 30, events: [] },
    'OCTOBER': { days: 31, events: [9, 10, 11, 23, 24, 25] },
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h4 className="font-accent text-2xl text-brand-gold uppercase tracking-[0.2em] mb-4">The Circuit</h4>
          <h1 className="text-6xl md:text-8xl font-black italic mb-8 leading-none uppercase">UPCOMING <br /> <span className="text-brand-gold">OPPORTUNITIES</span></h1>
          <div className="w-24 h-2 bg-brand-gold" />
        </header>

        <div className="grid grid-cols-1 gap-8 mb-24">
          {events.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col md:flex-row bg-brand-white/5 border border-brand-white/10 hover:border-brand-gold/30 transition-all overflow-hidden"
            >
              {/* Date Banner */}
              <div className={`md:w-48 bg-${event.color === 'brand-gold' ? 'brand-gold' : 'brand-white'} text-brand-black p-8 flex flex-col items-center justify-center text-center shrink-0`}>
                <Calendar size={32} className="mb-2" />
                <span className="font-display font-black text-2xl italic leading-none">{event.date}</span>
              </div>

              {/* Event Info */}
              <div className="flex-1 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                  <h3 className="text-3xl font-black italic mb-4 uppercase group-hover:text-brand-gold transition-colors">{event.title}</h3>
                  <div className="flex flex-wrap gap-6 text-brand-white/60">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-brand-gold" />
                      <span className="text-sm font-medium uppercase tracking-wider">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-brand-gold" />
                      <span className="text-sm font-medium uppercase tracking-wider">{event.format}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                  <span className={`px-4 py-1 text-xs font-black uppercase tracking-widest border ${event.status === 'Open for Entry' ? 'border-brand-gold text-brand-gold' : event.status === 'NOT CONFIRMED' ? 'border-red-500 text-red-500' : 'border-brand-white/30 text-brand-white/30'}`}>
                    {event.status}
                  </span>
                  {event.status === 'Coming Soon' ? (
                    <button 
                      onClick={() => {
                        playPing();
                        alert('Keep an eye out on the WhatsApp group for further details!');
                      }}
                      className="w-full md:w-auto bg-brand-white text-brand-black font-display font-black px-8 py-3 uppercase italic hover:bg-brand-gold transition-colors flex items-center justify-center gap-2"
                    >
                      Notify Me <Bell size={18} />
                    </button>
                  ) : event.status === 'NOT CONFIRMED' ? (
                    <button 
                      disabled
                      className="w-full md:w-auto bg-brand-white/10 text-brand-white/30 font-display font-black px-8 py-3 uppercase italic cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      TBA <ArrowRight size={18} />
                    </button>
                  ) : (
                    <a 
                      href="https://uno.padelfip.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playPing}
                      className="w-full md:w-auto bg-brand-white text-brand-black font-display font-black px-8 py-3 uppercase italic hover:bg-brand-gold transition-colors flex items-center justify-center gap-2"
                    >
                      Enter Now <ArrowRight size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Calendar View */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-black italic uppercase">CALENDAR VIEW</h2>
              <div className="h-px w-24 bg-brand-gold/20" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {Object.keys(monthData).map(month => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={cn(
                    "px-4 py-2 font-display font-black italic uppercase text-sm transition-all skew-x-[-6deg]",
                    selectedMonth === month ? "bg-brand-gold text-brand-black" : "bg-brand-white/10 text-brand-white hover:bg-brand-white/20"
                  )}
                >
                  <span className="skew-x-[6deg] block">{month}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-brand-white/5 border border-brand-white/10 p-8">
            <div className="grid grid-cols-7 gap-4 mb-8">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div key={day} className="text-center font-accent text-brand-gold tracking-widest text-sm">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: monthData[selectedMonth].days }).map((_, i) => {
                const day = i + 1;
                const hasEvent = monthData[selectedMonth].events.includes(day);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square border border-brand-white/5 p-2 flex flex-col justify-between transition-colors",
                      hasEvent ? "bg-brand-gold/10 border-brand-gold/30" : "hover:bg-brand-white/5"
                    )}
                  >
                    <span className={cn("text-lg font-black italic", hasEvent ? "text-brand-gold" : "opacity-30")}>{day}</span>
                    {hasEvent && <div className="w-full h-1 bg-brand-gold" />}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 flex gap-8 items-center text-sm font-bold uppercase tracking-tight">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-brand-gold" />
                <span>Tournament / Event</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-brand-white/20" />
                <span>Available Date</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <div className="bg-brand-gold text-brand-black p-12 relative overflow-hidden text-brand-black">
          <div className="absolute inset-0 diagonal-distress opacity-20" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl font-black italic mb-6 uppercase">DON'T SEE AN EVENT IN YOUR AREA?</h2>
            <p className="text-xl font-bold mb-8 leading-relaxed">
              Join the WhatsApp group to organize local casual matches and social mixers with players near you.
            </p>
            <Link 
              to="/register" 
              onClick={playPing}
              className="inline-flex items-center gap-3 bg-brand-black text-brand-gold font-display font-black px-10 py-4 uppercase italic hover:scale-105 transition-transform"
            >
              Register to Join <ArrowRight size={20} />
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
            <Trophy size={300} />
          </div>
        </div>
      </div>
    </div>
  );
}
