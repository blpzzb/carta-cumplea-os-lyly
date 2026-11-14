import { describe, it, expect, vi } from 'vitest';
import { playBirthdayMusic } from '@/lib/birthday-music';

describe('Birthday letter music', () => {
  it('starts the song when opening the letter', async () => {
    const audio = { play: vi.fn().mockResolvedValue(undefined) };
    const result = playBirthdayMusic(audio);
    expect(audio.play).toHaveBeenCalledTimes(1);
    expect(await result).toBe(true);
  });
  it('allows another attempt if playback was blocked', async () => {
    expect(await playBirthdayMusic({ play: vi.fn().mockRejectedValue(new Error('blocked')) })).toBe(false);
  });
});