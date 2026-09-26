export function initMayurHero() {
  const section = document.getElementById('mayurHome');
  const hero = document.getElementById('mayurHero');

  const person = hero?.querySelector('.mayur-hero5__person');
  const name = hero?.querySelector('.mayur-hero5__name');
  const glow = hero?.querySelector('.mayur-hero5__glow');

  if (!section || !hero || !person || !name || !glow) return null;

  /* ---------------------------------------------------------
     ENTRANCE ANIMATION
  --------------------------------------------------------- */

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        section.classList.toggle(
          'is-mayur-visible',
          entry.isIntersecting
        );
      }
    },
    {
      threshold: 0.3,
    }
  );

  observer.observe(section);


  /* ---------------------------------------------------------
     SUBTLE CINEMATIC PARALLAX
  --------------------------------------------------------- */

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  let raf = null;

  const animate = () => {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    hero.style.setProperty('--hero-x', currentX.toFixed(3));
    hero.style.setProperty('--hero-y', currentY.toFixed(3));

    raf = requestAnimationFrame(animate);
  };


  /* Mouse movement */
  section.addEventListener(
    'pointermove',
    (event) => {
      const rect = section.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width;

      const y =
        (event.clientY - rect.top) / rect.height;

      targetX = (x - 0.5) * 2;
      targetY = (y - 0.5) * 2;
    },
    { passive: true }
  );


  /* Return everything to center */
  section.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
  });


  /* Start animation loop */
  animate();


  return {
    section,
    hero,
    observer,

    destroy() {
      observer.disconnect();

      if (raf) {
        cancelAnimationFrame(raf);
      }
    },
  };
}