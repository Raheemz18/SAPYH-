import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Instagram, Phone, Upload, Trophy } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSound } from '../hooks/useSound';

export default function Register() {
  const { playPing } = useSound();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    contactNumber: '',
    province: '',
    country: 'South Africa',
    gender: '',
    ageCategories: [] as string[],
    parentGuardianId: '',
    playerId: '',
    birthCertificate: null as File | null
  });

  const handleAgeCategoryChange = (category: string) => {
    setFormData(prev => {
      const current = prev.ageCategories;
      if (current.includes(category)) {
        return { ...prev, ageCategories: current.filter(c => c !== category) };
      }
      if (current.length < 2) {
        return { ...prev, ageCategories: [...current, category] };
      }
      return prev;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    playPing();
    if (formData.ageCategories.length === 0) {
      alert('Please select at least one age category.');
      return;
    }
    // In a real app, you'd send this to a backend/form service
    console.log('Form submitted:', formData);
    setSubmitted(true);
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
          <h1 className="text-5xl font-black italic mb-6 uppercase">REGISTRATION COMPLETE!</h1>
          <p className="text-xl mb-10 text-brand-black/70">
            Welcome to the SA Padel Youth Hub ranking system. Your profile is now active.
          </p>
          
          <div className="bg-brand-black text-brand-white p-8 mb-10 skew-x-[-3deg]">
            <div className="skew-x-[3deg]">
              <h2 className="text-2xl font-black italic mb-4 text-brand-gold uppercase">STAY UPDATED</h2>
              <p className="mb-6 opacity-80">Join our WhatsApp group for real-time tournament updates and ranking shifts.</p>
              <a 
                href="https://chat.whatsapp.com/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-gold text-brand-black font-display font-black px-8 py-4 uppercase italic hover:scale-105 transition-transform"
              >
                <Phone size={20} />
                Join WhatsApp Group
              </a>
            </div>
          </div>
          
          <p className="text-sm text-brand-black/50">
            Follow us on Instagram <span className="font-bold">@sapAdelyouthhub</span> for daily tips and features.
          </p>
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
          <h4 className="font-accent text-2xl text-brand-gold uppercase tracking-[0.2em] mb-4">Player Profile</h4>
          <h1 className="text-6xl md:text-8xl font-black italic mb-8 leading-none">REGISTER <br /> <span className="text-brand-gold">PROFILE</span></h1>
          <p className="text-xl text-brand-white/70 mb-12 leading-relaxed max-w-lg">
            Create your official player profile to enter the SA Padel Youth Hub ranking system. Sign up is completely free.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                <Trophy size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black italic mb-1 uppercase">Official Ranking</h3>
                <p className="text-brand-white/50">Earn points at sanctioned events and climb the national leaderboard.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                <ArrowRight size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black italic mb-1 uppercase">Player Features</h3>
                <p className="text-brand-white/50">Stand a chance to be featured as a "Face of the Future" on our hub.</p>
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
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Name</label>
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
              <label className="block font-display font-black text-sm uppercase mb-2 italic">Email Address</label>
              <input 
                required
                type="email" 
                className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Contact Number</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="082 123 4567"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Province</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="e.g. Gauteng"
                  value={formData.province}
                  onChange={(e) => setFormData({...formData, province: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Country</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Gender</label>
                <select 
                  required
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-display font-black text-sm uppercase mb-2 italic">Age Categories (Max 2)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['u12', 'u14', 'u16', 'u18'].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      onClick={() => handleAgeCategoryChange(cat)}
                      className={cn(
                        "w-6 h-6 border-2 flex items-center justify-center transition-colors",
                        formData.ageCategories.includes(cat) 
                          ? "bg-brand-gold border-brand-gold" 
                          : "border-brand-black/10 group-hover:border-brand-gold"
                      )}
                    >
                      {formData.ageCategories.includes(cat) && <CheckCircle2 size={14} className="text-brand-black" />}
                    </div>
                    <span className="font-bold uppercase text-sm">{cat.replace('u', 'Under ')}</span>
                  </label>
                ))}
              </div>
              <p className="text-[10px] text-brand-black/40 mt-2 uppercase font-bold tracking-widest">Select up to 2 categories if you compete in multiple divisions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Parent/Guardian ID</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="ID Number"
                  value={formData.parentGuardianId}
                  onChange={(e) => setFormData({...formData, parentGuardianId: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-display font-black text-sm uppercase mb-2 italic">Player ID Number</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-black/5 border-2 border-brand-black/10 px-4 py-3 focus:border-brand-gold outline-none transition-colors"
                  placeholder="Player ID"
                  value={formData.playerId}
                  onChange={(e) => setFormData({...formData, playerId: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block font-display font-black text-sm uppercase mb-2 italic">Birth Certificate</label>
              <div className="relative border-2 border-dashed border-brand-black/20 p-6 text-center hover:border-brand-gold transition-colors cursor-pointer mb-4">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    setFormData({...formData, birthCertificate: e.target.files?.[0] || null});
                  }}
                />
                <Upload className="mx-auto mb-2 text-brand-black/30" size={24} />
                <p className="text-sm font-bold uppercase tracking-tight">
                  {formData.birthCertificate ? formData.birthCertificate.name : 'Upload Copy of Birth Certificate'}
                </p>
                <p className="text-xs text-brand-black/40 mt-1">PDF, JPG or PNG (Max 5MB)</p>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-gold text-brand-black font-display font-black text-xl py-5 uppercase italic skew-x-[-6deg] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 mt-8"
            >
              <span className="skew-x-[6deg] flex items-center gap-2">
                Register Profile <ArrowRight size={20} />
              </span>
            </button>
            
            <p className="text-center text-xs text-brand-black/40 font-medium uppercase tracking-widest">
              Registration is 100% free.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
