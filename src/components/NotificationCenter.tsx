import { useState, useRef, useEffect } from 'react';
import { Bell, Trophy, Target, Info, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, Notification } from '@/src/context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '@/src/lib/firebase';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

export default function NotificationCenter() {
  const { user, notifications } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = async (notificationId: string) => {
    if (!user) return;
    const path = `users/${user.uid}/notifications/${notificationId}`;
    try {
      await updateDoc(doc(db, 'users', user.uid, 'notifications', notificationId), {
        read: true
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;
    const unread = notifications.filter(n => !n.read);
    for (const n of unread) {
      await markAsRead(n.id);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'tournament': return <Target className="text-brand-gold" size={18} />;
      case 'ranking': return <Trophy className="text-brand-gold" size={18} />;
      default: return <Info className="text-brand-gold" size={18} />;
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-brand-white hover:text-brand-gold transition-colors"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-brand-gold text-brand-black text-[10px] font-black flex items-center justify-center rounded-full border-2 border-brand-black">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-80 md:w-96 bg-brand-white text-brand-black shadow-2xl z-[100] border-t-4 border-brand-gold"
          >
            <div className="p-4 border-b border-brand-black/10 flex justify-between items-center">
              <h3 className="font-display font-black italic uppercase tracking-tight">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-[10px] font-black uppercase tracking-widest text-brand-black/40 hover:text-brand-gold transition-colors"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell className="mx-auto mb-4 text-brand-black/10" size={48} />
                  <p className="text-sm font-bold uppercase tracking-tight text-brand-black/40">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-brand-black/5">
                  {notifications.map((n) => (
                    <div 
                      key={n.id}
                      className={cn(
                        "p-4 transition-colors relative group",
                        !n.read ? "bg-brand-gold/5" : "hover:bg-brand-black/5"
                      )}
                    >
                      <div className="flex gap-4">
                        <div className="shrink-0 mt-1">
                          {getIcon(n.type)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-black italic uppercase text-sm leading-none">{n.title}</h4>
                            {!n.read && (
                              <button 
                                onClick={() => markAsRead(n.id)}
                                className="text-brand-gold hover:scale-110 transition-transform"
                                title="Mark as read"
                              >
                                <Check size={14} />
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-brand-black/70 leading-relaxed mb-2">{n.message}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-brand-black/30 font-bold uppercase tracking-widest">
                              {n.createdAt?.toDate ? n.createdAt.toDate().toLocaleDateString() : 'Just now'}
                            </span>
                            {n.link && (
                              <Link 
                                to={n.link}
                                onClick={() => {
                                  setIsOpen(false);
                                  markAsRead(n.id);
                                }}
                                className="text-[10px] font-black text-brand-gold uppercase tracking-widest hover:underline"
                              >
                                View Details
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 bg-brand-black text-center">
              <p className="text-[10px] text-brand-white/40 font-bold uppercase tracking-widest">
                SA Padel Youth Hub Alerts
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
