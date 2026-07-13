import SoftAurora from './components/SoftAurora';
import CylinderCarousel, { COURSE_COUNT } from './components/CylinderCarousel';

export default function App() {
  return (
    <main className="course-finder">
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

      <header className="topbar">
        <a className="brand-mark" href="#top" aria-label="NaNa home">
          <span className="brand-orbit" aria-hidden="true" />
          NANA
        </a>
        <p className="section-index">01 / FIND COURSES</p>
        <p className="location-mark">SHANGHAI / CN</p>
      </header>

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
          <span className="stage-number">01—{String(COURSE_COUNT).padStart(2, '0')}</span>
          <span className="stage-cross stage-cross--top">+</span>
          <span className="stage-cross stage-cross--bottom">+</span>
          <p>WHEEL TO BROWSE / CLICK TO OPEN</p>
        </div>
      </section>

      <div className="footer-rule" aria-hidden="true">
        <span>VISUAL CULTURE</span>
        <span>CREATIVE TECHNOLOGY</span>
        <span>EXPERIMENTAL PRACTICE</span>
      </div>
    </main>
  );
}
