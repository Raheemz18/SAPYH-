import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Lock, Mail, Phone, Building2, User as UserIcon } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, OperationType, handleFirestoreError } from '@/src/lib/firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function OrganizerRegister() {
  const { playPing } = useSound();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    organizationName: '',
    phoneNumber: '',
    email: '',
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

      // 2. Create Firestore Profile (Pending Approval)
      const userProfile = {
        uid: user.uid,
        role: 'organizer',
        name: `${formData.name} ${formData.surname}`,
        organizationName: formData.organizationName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        status: 'pending',
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
          <h1 className="text-5xl font-black italic mb-6 uppercase leading-none">APPLICATION <br /><span className="text-brand-gold">SUBMITTED!</span></h1>
          <div className="space-y-6 text-xl mb-10 text-brand-black/70 font-bold leading-relaxed">
            <p>
              Thank you for your interest in becoming a Tournament Organizer with SA Padel Youth Hub. Your application is currently under review.
            </p>
            <p className="text-brand-gold bg-brand-black p-4 skew-x-[-3deg]">
              <span className="skew-x-[3deg] block">
                You will receive a formal phone call or WhatsApp message directly from an official SA Padel Youth Hub administrator to verify and complete your registration.
              </span>
            </p>
            <p className="text-sm opacity-60 italic">
              Please note: Your organizer account will only be activated after manual approval and confirmation.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/organizer-portal')}
            className="inline-flex items-center gap-3 bg-brand-black text-brand-gold font-display font-black px-10 py-5 uppercase italic skew-x-[-6deg] hover:scale-105 transition-transform"
          >
            <span className="skew-x-[6deg] flex items-center gap-2">
              Enter Viewer Portal <ArrowRight size={20} />
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
          <h4 className="font-accent text-2xl text-brand-gold uppercase tracking-[0.2em] mb-4">Organizer Portal</h4>
          <h1 className="text-6xl md:text-8xl font-black italic mb-8 leading-none">BECOME AN <br /> <span className="text-brand-gold">ORGANIZER</span></h1>
          <p className="text-xl text-brand-white/70 mb-12 leading-relaxed max-w-lg">
            Apply to host official SA Padel Youth Hub tournaments. Gain access to player data, ranking submissions, and event management tools.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black italic mb-1 uppercase">Event Management</h3>
                <p className="text-brand-white/50">Create and manage tournaments with official SA Padel Youth Hub sanctioning.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black italic mb-1 uppercase">Manual Verification</h3>
                <p className="text-brand-white/50">Every organizer is manually verified to ensure the highest quality of events.</p>
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
                <label className="block font-display font-black text-sm uppercase mb-2 italic">First Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="First Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Surname</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="Last Name"
                  value={formData.surname}
                  onChange={(e) => setFormData({...formData, surname: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block font-display font-black text-sm uppercase mb-2 italic">Organization Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/30" size={18} />
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 pl-12 pr-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="e.g. Cape Town Padel Club"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/30" size={18} />
                  <input 
                    required
                    type="tel" 
                    className="w-full bg-brand-black/5 border-2 border-brand-black/10 pl-12 pr-4 py-3 focus:border-brand-gold outline-none transition-colors"
                    placeholder="082 123 4567"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
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
                {loading ? 'Submitting Application...' : 'Submit Application'} <ArrowRight size={20} />
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
