import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Star, ArrowUp, Filter, UserPlus } from 'lucide-react';
import { RANKINGS } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

export default function Rankings() {
  const { playPing } = useSound();
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [ageFilter, setAgeFilter] = useState<'all' | 'u12' | 'u14' | 'u16' | 'u18'>('all');

  const filteredRankings = RANKINGS.filter(player => {
    const matchesGender = genderFilter === 'all' || player.gender === genderFilter;
    const matchesAge = ageFilter === 'all' || player.category === ageFilter;
    return matchesGender && matchesAge;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h4 className="font-accent text-2xl text-brand-gold uppercase tracking-[0.2em] mb-4">The Leaderboard</h4>
          <h1 className="text-6xl md:text-8xl font-black italic mb-8 leading-none uppercase">PLAYER <br /> <span className="text-brand-gold">RANKINGS</span></h1>
          <div className="w-24 h-2 bg-brand-gold" />
          <p className="text-xl text-brand-white/60 mt-8 max-w-2xl font-bold italic">
            Rankings are only valid for players who have registered via the website. <br />
            <span className="text-brand-gold uppercase">Current rankings have been reset for the new season.</span>
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-6 mb-12 bg-brand-white/5 p-6 border border-brand-white/10">
          <div className="flex items-center gap-3 text-brand-gold mr-4">
            <Filter size={20} />
            <span className="font-display font-black italic uppercase">Filters:</span>
          </div>
          
          <div className="flex gap-2">
            {['all', 'male', 'female'].map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      playPing();
                      setGenderFilter(g as any);
                    }}
                    className={cn(
                      "px-4 py-2 font-display font-black italic uppercase text-sm transition-all skew-x-[-6deg]",
                      genderFilter === g ? "bg-brand-gold text-brand-black" : "bg-brand-white/10 text-brand-white hover:bg-brand-white/20"
                    )}
                  >
                    <span className="skew-x-[6deg] block">{g}</span>
                  </button>
            ))}
          </div>

          <div className="flex gap-2">
            {['all', 'u12', 'u14', 'u16', 'u18'].map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      playPing();
                      setAgeFilter(a as any);
                    }}
                    className={cn(
                      "px-4 py-2 font-display font-black italic uppercase text-sm transition-all skew-x-[-6deg]",
                      ageFilter === a ? "bg-brand-gold text-brand-black" : "bg-brand-white/10 text-brand-white hover:bg-brand-white/20"
                    )}
                  >
                    <span className="skew-x-[6deg] block">{a}</span>
                  </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredRankings.length > 0 ? (
            <motion.div 
              key="rankings-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              {/* Top 3 Podium */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {filteredRankings.slice(0, 3).map((player, i) => (
                  <motion.div
                    key={player.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative p-8 border-4 ${i === 0 ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-white/10 bg-brand-white/5'} flex flex-col items-center text-center`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${i === 0 ? 'bg-brand-gold text-brand-black' : 'bg-brand-white/10 text-brand-white'}`}>
                      {i === 0 ? <Trophy size={32} /> : <Medal size={32} />}
                    </div>
                    <div className="absolute top-4 right-4 text-4xl font-black italic opacity-20">#{i + 1}</div>
                    <h3 className="text-2xl font-black italic mb-2 uppercase">{player.name}</h3>
                    <p className="text-brand-gold font-accent text-lg tracking-widest mb-4 uppercase">{player.category} • {player.gender}</p>
                    <div className="text-4xl font-black italic">{player.points} <span className="text-sm uppercase not-italic opacity-50">PTS</span></div>
                  </motion.div>
                ))}
              </div>

              {/* Full List */}
              <div className="lg:col-span-3 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-brand-gold/30">
                      <th className="py-6 px-4 font-display font-black italic uppercase text-brand-gold">Rank</th>
                      <th className="py-6 px-4 font-display font-black italic uppercase text-brand-gold">Player</th>
                      <th className="py-6 px-4 font-display font-black italic uppercase text-brand-gold">Category</th>
                      <th className="py-6 px-4 font-display font-black italic uppercase text-brand-gold text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRankings.map((player, i) => (
                      <motion.tr 
                        key={player.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-brand-white/10 hover:bg-brand-white/5 transition-colors group"
                      >
                        <td className="py-6 px-4">
                          <span className="text-2xl font-black italic group-hover:text-brand-gold transition-colors">#{i + 1}</span>
                        </td>
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-white/10 rounded-full flex items-center justify-center">
                              <Star size={16} className={i < 3 ? 'text-brand-gold' : 'text-brand-white/30'} />
                            </div>
                            <span className="text-xl font-bold uppercase tracking-tight">{player.name}</span>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <span className="font-accent text-lg uppercase tracking-widest opacity-60">{player.category} • {player.gender}</span>
                        </td>
                        <td className="py-6 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-2xl font-black italic">{player.points}</span>
                            <ArrowUp size={16} className="text-green-500" />
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center bg-brand-white/5 border border-dashed border-brand-white/20"
            >
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-gold">
                <UserPlus size={40} />
              </div>
              <h2 className="text-4xl font-black italic mb-4 uppercase">NO RANKINGS YET</h2>
              <p className="text-xl text-brand-white/50 max-w-lg mx-auto mb-10">
                Rankings are currently being reset for the new season. Register your profile to be included in the next update.
              </p>
              <Link 
                to="/register" 
                onClick={playPing}
                className="inline-flex items-center gap-3 bg-brand-gold text-brand-black font-display font-black px-10 py-4 uppercase italic skew-x-[-12deg] hover:scale-105 transition-transform"
              >
                <span className="skew-x-[12deg] block">Register Profile Now</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Box */}
        <div className="mt-24 p-12 bg-brand-white text-brand-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <h2 className="text-4xl font-black italic mb-6 uppercase">HOW RANKINGS WORK</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg leading-relaxed mb-6">
                The SA Padel Youth Hub ranking system is designed to reward both performance and participation. Players earn points based on their finishing position in sanctioned tournaments.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="w-2 h-2 bg-brand-gold mt-2 shrink-0" />
                  <p className="font-bold">Tournament Tier: Higher tier events award more points.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-2 h-2 bg-brand-gold mt-2 shrink-0" />
                  <p className="font-bold">Match Wins: Bonus points for every match won during an event.</p>
                </li>
              </ul>
            </div>
            <div className="bg-brand-black text-brand-white p-8 italic flex flex-col justify-center">
              <p className="text-xl font-black mb-4 uppercase text-brand-gold">NOT RANKED YET?</p>
              <p className="mb-8 opacity-70">Register your profile and enter your first tournament to start earning points.</p>
              <button 
                onClick={playPing}
                className="bg-brand-gold text-brand-black font-display font-black px-8 py-4 uppercase italic w-fit hover:scale-105 transition-transform"
              >
                Register Profile Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
