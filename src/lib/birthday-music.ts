/** Start directly within a click gesture, including on browsers that block autoplay. */
export async function playBirthdayMusic(audio: Pick<HTMLAudioElement, 'play'> | null) {
  if (!audio) return false;
  try { await audio.play(); return true; } catch { return false; }
}