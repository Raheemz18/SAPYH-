import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Trophy, Calendar, Users, Lock, AlertCircle, Plus, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

export default function OrganizerPortal() {
  const { user, profile, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (profile?.role !== 'organizer' && profile?.role !== 'admin') return <Navigate to="/" />;

  const isPending = profile?.status === 'pending';

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h4 className="font-accent text-2xl text-brand-gold uppercase tracking-[0.2em] mb-2">
              {isPending ? 'Viewer Portal' : 'Organizer Dashboard'}
            </h4>
            <h1 className="text-6xl md:text-8xl font-black italic leading-none uppercase">
              {isPending ? 'PENDING' : 'ORGANIZER'} <br /> <span className="text-brand-gold">PORTAL</span>
            </h1>
          </div>
          {!isPending && (
            <button className="bg-brand-gold text-brand-black font-display font-black px-8 py-4 uppercase italic skew-x-[-6deg] hover:scale-105 transition-transform flex items-center gap-2">
              <Plus size={20} /> Create Tournament
            </button>
          )}
        </div>

        {/* Pending Banner */}
        {isPending && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-gold text-brand-black p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 skew-x-[-3deg]"
          >
            <div className="skew-x-[3deg] flex items-center gap-4">
              <div className="bg-brand-black text-brand-gold p-2 rounded-full">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black italic uppercase leading-none mb-1">Pending Approval</h3>
                <p className="font-bold uppercase text-xs tracking-tight opacity-70">Organizer access will be granted after verification.</p>
              </div>
            </div>
            <div className="skew-x-[3deg] text-sm font-bold uppercase italic border-2 border-brand-black/20 px-4 py-2">
              Status: Under Review
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'Total Tournaments', value: '0', icon: Calendar },
            { label: 'Active Players', value: '0', icon: Users },
            { label: 'Sanctioned Points', value: '0', icon: Trophy },
          ].map((stat, i) => (
            <div key={i} className="bg-brand-white/5 border border-brand-white/10 p-8 relative overflow-hidden group">
              <stat.icon className="absolute top-4 right-4 text-brand-gold opacity-10 group-hover:opacity-20 transition-opacity" size={64} />
              <h4 className="text-brand-white/40 font-bold uppercase text-xs tracking-widest mb-2">{stat.label}</h4>
              <p className="text-5xl font-black italic text-brand-gold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Actions/Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-brand-white text-brand-black p-10 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-gold z-[-1]" />
              <h3 className="text-3xl font-black italic uppercase mb-8">Recent Tournaments</h3>
              
              <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-brand-black/10">
                <Calendar className="text-brand-black/10 mb-4" size={64} />
                <p className="font-bold uppercase tracking-tight text-brand-black/40">No tournaments created yet.</p>
                {!isPending && (
                  <button className="mt-6 text-brand-gold font-black uppercase italic hover:underline">
                    Create your first event
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Restrictions Card */}
            {isPending && (
              <div className="bg-brand-gold/10 border border-brand-gold/30 p-8">
                <h3 className="text-xl font-black italic uppercase mb-6 text-brand-gold">Viewer-Only Restrictions</h3>
                <ul className="space-y-4">
                  {[
                    { label: 'View tournaments and rankings', allowed: true },
                    { label: 'Create new tournaments', allowed: false },
                    { label: 'Edit organizer data', allowed: false },
                    { label: 'Submit match results', allowed: false },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {item.allowed ? (
                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      ) : (
                        <Lock size={18} className="text-red-500 shrink-0" />
                      )}
                      <span className={`text-sm font-bold uppercase tracking-tight ${item.allowed ? 'text-brand-white/80' : 'text-brand-white/40'}`}>
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-brand-white/5 border border-brand-white/10 p-8">
              <h3 className="text-xl font-black italic uppercase mb-6">Quick Resources</h3>
              <div className="space-y-4">
                <Link to="/rankings" className="flex items-center justify-between p-4 bg-brand-white/5 hover:bg-brand-gold hover:text-brand-black transition-all group">
                  <span className="font-bold uppercase text-sm">National Rankings</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/tournaments" className="flex items-center justify-between p-4 bg-brand-white/5 hover:bg-brand-gold hover:text-brand-black transition-all group">
                  <span className="font-bold uppercase text-sm">All Tournaments</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#" className="flex items-center justify-between p-4 bg-brand-white/5 hover:bg-brand-gold hover:text-brand-black transition-all group">
                  <span className="font-bold uppercase text-sm">Organizer Handbook</span>
                  <FileText size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
