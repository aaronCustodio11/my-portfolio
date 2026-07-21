import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

export const Card = forwardRef(({ customClass, ...rest }, ref) => {
  const innerRef = useRef(null);

  const setRef = (el) => {
    innerRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  const handleMouseEnter = (e) => {
    gsap.to(innerRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    rest.onMouseEnter?.(e);
  };

  const handleMouseLeave = (e) => {
    gsap.to(innerRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    rest.onMouseLeave?.(e);
  };

  return (
    <div
      ref={setRef}
      {...rest}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] overflow-hidden ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
      style={{
        ...rest.style,
        cursor: 'pointer',
      }}
    />
  );
});
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onFrontChange,        // ← new: fires with the card index whenever front changes
  skewAmount = 6,
  easing = 'elastic',
  children,
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'power3.out',
          dropEase: 'power3.in',
          durDrop: 0.55,
          durMove: 0.65,
          durReturn: 0.55,
          promoteOverlap: 0.35,
          returnDelay: 0.15,
        }
      : {
          ease: 'power1.inOut',
          dropEase: 'power1.in',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const swapRef = useRef(null);
  const bringToFront = useRef(null);
  const onFrontChangeRef = useRef(onFrontChange);

  // Keep the callback ref fresh without restarting the effect
  useEffect(() => {
    onFrontChangeRef.current = onFrontChange;
  }, [onFrontChange]);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline({
        onComplete: () => {
          order.current = [...rest, front];
          onFrontChangeRef.current?.(rest[0]);
        },
      });
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.dropEase,
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
      tl.to(
        elFront,
        { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease },
        'return'
      );
    };

    const swapTo = (targetOrderIndex) => {
      if (order.current.length < 2) return;
      if (targetOrderIndex === 0) return;

      const newOrder = [...order.current];
      const [picked] = newOrder.splice(targetOrderIndex, 1);
      newOrder.unshift(picked);
      order.current = newOrder;

      const tl = gsap.timeline({
        onComplete: () => {
          clearInterval(intervalRef.current);
          intervalRef.current = window.setInterval(swapRef.current, delay);
          onFrontChangeRef.current?.(newOrder[0]);
        },
      });
      tlRef.current = tl;

      newOrder.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 0);
        tl.to(
          el,
          { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease },
          i * 0.08
        );
      });
    };

    swapRef.current = swap;
    bringToFront.current = swapTo;

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
            const orderIndex = order.current.indexOf(i);
            if (orderIndex > 0) {
              tlRef.current?.kill();
              clearInterval(intervalRef.current);
              bringToFront.current?.(orderIndex);
            }
          },
        })
      : child
  );

  return (
    <div
      ref={container}
      className="relative perspective-[900px] overflow-visible"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;