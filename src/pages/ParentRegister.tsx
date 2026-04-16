import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Lock, Mail, User as UserIcon, Users } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, OperationType, handleFirestoreError } from '@/src/lib/firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function ParentRegister() {
  const { playPing } = useSound();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    parentName: '',
    parentSurname: '',
    childName: '',
    childSurname: '',
    email: '',
    username: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    playPing();
    setError(null);

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      // 1. Create Auth User
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // 2. Create Firestore Profile
      const userProfile = {
        uid: user.uid,
        role: 'parent',
        parentName: formData.parentName,
        parentSurname: formData.parentSurname,
        childName: formData.childName,
        childSurname: formData.childSurname,
        email: formData.email,
        username: formData.username,
        createdAt: serverTimestamp(),
      };

      const path = `users/${user.uid}`;
      try {
        await setDoc(doc(db, 'users', user.uid), userProfile);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try logging in instead.');
      } else {
        setError(err.message || 'An error occurred during registration.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-brand-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-brand-white text-brand-black p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-4 bg-brand-gold" />
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center text-brand-black">
              <CheckCircle2 size={48} />
            </div>
          </div>
          <h1 className="text-5xl font-black italic mb-6 uppercase leading-none">ACCOUNT <br /><span className="text-brand-gold">CREATED!</span></h1>
          <p className="text-xl mb-10 text-brand-black/70 font-bold">
            Your account has been successfully created. You can now log in to view player rankings, tournament updates, and all official SA Padel Youth Hub information.
          </p>
          
          <button 
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-3 bg-brand-black text-brand-gold font-display font-black px-10 py-5 uppercase italic skew-x-[-6deg] hover:scale-105 transition-transform"
          >
            <span className="skew-x-[6deg] flex items-center gap-2">
              Go to Login <ArrowRight size={20} />
            </span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full diagonal-distress opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h4 className="font-accent text-2xl text-brand-gold uppercase tracking-[0.2em] mb-4">Parent Portal</h4>
          <h1 className="text-6xl md:text-8xl font-black italic mb-8 leading-none">PARENT <br /> <span className="text-brand-gold">ACCESS</span></h1>
          <p className="text-xl text-brand-white/70 mb-12 leading-relaxed max-w-lg">
            Create a parent account to track your child's progress, view official rankings, and stay updated with the latest tournament news.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black italic mb-1 uppercase">Track Progress</h3>
                <p className="text-brand-white/50">Monitor your child's ranking shifts and tournament performance in real-time.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black italic mb-1 uppercase">Official Updates</h3>
                <p className="text-brand-white/50">Receive direct announcements and tournament invitations for your region.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-white text-brand-black p-8 md:p-12 relative"
        >
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-gold z-[-1]" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-gold z-[-1]" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Parent Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="First Name"
                  value={formData.parentName}
                  onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Parent Surname</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="Last Name"
                  value={formData.parentSurname}
                  onChange={(e) => setFormData({...formData, parentSurname: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Child's Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="First Name"
                  value={formData.childName}
                  onChange={(e) => setFormData({...formData, childName: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Child's Surname</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="Last Name"
                  value={formData.childSurname}
                  onChange={(e) => setFormData({...formData, childSurname: e.target.value})}
                />
              </div>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Create Username</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/30" size={18} />
                  <input 
                    required
                    type="text" 
                    className="w-full bg-brand-black/5 border-2 border-brand-black/10 pl-12 pr-4 py-3 focus:border-brand-gold outline-none transition-colors"
                    placeholder="username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Create Password</label>
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
                {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={20} />
              </span>
            </button>
            
            <p className="text-center text-xs text-brand-black/40 font-medium uppercase tracking-widest">
              Already have an account? <Link to="/login" className="text-brand-black font-black hover:text-brand-gold transition-colors">Log In Here</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
