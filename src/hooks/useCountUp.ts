import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

type UseCountUpOptions = {
  to: number | string;
  duration?: number;
  ease?: string;
};

export function useCountUp({
  to,
  duration = 2,
  ease = 'power1.out',
}: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        textContent: to,
        duration,
        ease,
        snap: { textContent: 1 }, // округление до целого
      });
    }
  }, [to, duration, ease]);

  return ref;
}
