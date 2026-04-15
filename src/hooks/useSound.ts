import { useCallback } from 'react';

const PING_URL = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";

export function useSound() {
  const playPing = useCallback(() => {
    const audio = new Audio(PING_URL);
    audio.play().catch(e => console.error("Error playing sound:", e));
  }, []);

  return { playPing };
}
