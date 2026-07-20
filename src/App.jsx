import { useEffect, useRef } from 'react';

import SoftAurora from './components/SoftAurora';
import CylinderCarousel from './components/CylinderCarousel';
import WorksShowcase from './components/WorksShowcase';

export default function App() {
  const landingRef = useRef(null);

  useEffect(() => {
    let frameId = 0;

    const updateParallax = () => {
      frameId = 0;
      const landing = landingRef.current;
      if (!landing) return;

      const rect = landing.getBoundingClientRect();
      const distance = Math.max(0, Math.min(window.innerHeight, -rect.top));
      const progress = distance / Math.max(1, window.innerHeight);

      landing.style.setProperty('--copy-parallax-y', `${(-distance * 0.24).toFixed(2)}px`);
      landing.style.setProperty('--card-parallax-y', `${(-distance * 0.1).toFixed(2)}px`);
      landing.style.setProperty('--chrome-parallax-y', `${(-distance * 0.16).toFixed(2)}px`);
      landing.style.setProperty('--aurora-parallax-y', `${(distance * 0.56).toFixed(2)}px`);
      landing.style.setProperty('--landing-opacity', String(1 - progress * 0.48));
      landing.style.setProperty('--scroll-arrow-opacity', String(Math.max(0, 1 - progress * 1.5)));
      landing.style.setProperty('--scroll-arrow-events', progress > 0.65 ? 'none' : 'auto');
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <main className="course-finder">
      <section ref={landingRef} className="landing-chapter">
        <div className="aurora-layer" aria-hidden="true">
          <SoftAurora
            speed={0.48}
            scale={1.7}
            brightness={0.92}
            color1="#ff2f95"
            color2="#5474ff"
            noiseFrequency={2.25}
            noiseAmplitude={0.92}
            bandHeight={0.47}
            bandSpread={1.45}
            octaveDecay={0.18}
            layerOffset={0.56}
            colorSpeed={0.72}
            mouseInfluence={0.16}
          />
        </div>

        <div className="atmosphere" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="parallax-chrome">
          <header className="topbar">
            <a className="brand-mark" href="#top" aria-label="NaNa home">
              <img src={`${import.meta.env.BASE_URL}brand/fengbian-horizontal-cn.png`} alt="风变" />
            </a>
            <p className="section-index">01 / FIND COURSES</p>
            <p className="location-mark">Soulful Poetic</p>
          </header>
        </div>

        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true">✦</span>
              Courses for image, sound &amp; motion
            </p>

            <h1>
              <span>NaNa</span>
              <span>Audiovisual</span>
              <span>Art Creation</span>
            </h1>

            <div className="hero-footer">
              <p className="intro">
                Explore the relationship between what you see and what you hear.
                Build your own art worlds.
              </p>
              <p className="scroll-cue">
                <span className="scroll-line" aria-hidden="true" />
                Scroll to discover
              </p>
            </div>
          </div>

          <div className="stage-guide">
            <CylinderCarousel />
            <span className="stage-cross stage-cross--top">+</span>
            <span className="stage-cross stage-cross--bottom">+</span>
            <p>WHEEL TO BROWSE / CLICK TO OPEN</p>
          </div>
        </section>

        <a className="page-scroll-arrow" href="#works" aria-label="Scroll to selected works">
          <span aria-hidden="true" />
        </a>

        <div className="footer-rule" aria-hidden="true">
          <span>VISUAL CULTURE</span>
          <span>CREATIVE TECHNOLOGY</span>
          <span>EXPERIMENTAL PRACTICE</span>
        </div>
      </section>

      <WorksShowcase />
    </main>
  );
}
