// src/components/ScrambledText.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children,
}) => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector('p'), {
      type: 'chars',
      charsClass: 'inline-block will-change-transform',
    });

    split.chars.forEach(el => {
      gsap.set(el, { attr: { 'data-content': el.innerHTML } });
    });

    const handleMove = e => {
      split.chars.forEach(el => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const dx   = e.clientX - (left + width  / 2);
        const dy   = e.clientY - (top  + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(el, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text:  el.dataset.content || '',
              chars: scrambleChars,
              speed,
            },
            ease: 'none',
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={className} style={style}>
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;