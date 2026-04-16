import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Lock, Mail, Trophy } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/lib/firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { playPing } = useSound();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    playPing();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(err.message || 'An error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full diagonal-distress opacity-5 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-brand-white text-brand-black p-8 md:p-12 relative"
      >
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-gold z-[-1]" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-gold z-[-1]" />
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-brand-black mx-auto mb-6">
            <Trophy size={32} />
          </div>
          <h1 className="text-4xl font-black italic uppercase leading-none">PLAYER <span className="text-brand-gold">LOGIN</span></h1>
          <p className="text-brand-black/50 mt-4 font-bold uppercase tracking-tight">Access your ranking and profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-display font-black text-sm uppercase mb-2 italic">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/30" size={18} />
              <input 
                required
                type="email" 
                className="w-full bg-brand-black/5 border-2 border-brand-black/10 pl-12 pr-4 py-3 focus:border-brand-gold outline-none transition-colors"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block font-display font-black text-sm uppercase mb-2 italic">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/30" size={18} />
              <input 
                required
                type="password" 
                className="w-full bg-brand-black/5 border-2 border-brand-black/10 pl-12 pr-4 py-3 focus:border-brand-gold outline-none transition-colors"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 text-red-500 text-sm font-bold uppercase italic">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gold text-brand-black font-display font-black text-xl py-5 uppercase italic skew-x-[-6deg] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="skew-x-[6deg] flex items-center gap-2">
              {loading ? 'Logging In...' : 'Log In'} <ArrowRight size={20} />
            </span>
          </button>
          
          <div className="text-center space-y-4 pt-4">
            <p className="text-xs text-brand-black/40 font-medium uppercase tracking-widest">
              Don't have a profile yet? <br />
              <Link to="/select-type" className="text-brand-black font-black hover:text-brand-gold transition-colors">Register Here</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
