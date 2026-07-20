import { useEffect, useRef, useState } from 'react';

import './WorksShowcase.css';

const PROFILE_URL = 'https://www.xiaohongshu.com/user/profile/550c7316d39ea2522bf6bbe2?xsec_token=ABT6NgZOHLDoQctZ595n6TEKQuRYIUcL3M68IWk43MxVs%3D&xsec_source=pc_search';
const PUBLIC_BASE = import.meta.env.BASE_URL;

const WORKS = [
  {
    title: '我的 Chinoiserie｜古山传情',
    likes: '6433',
    image: `${PUBLIC_BASE}works/01-chinoiserie.webp`,
    href: 'https://www.xiaohongshu.com/user/profile/550c7316d39ea2522bf6bbe2/697e40de0000000021028bdb?xsec_token=ABr3sSnfGjRR9wCQj55KioGJlVfO3WsHJ_yNw4fKlPwCg=&xsec_source=pc_user'
  },
  {
    title: '准备好，介入你的专属脑内视觉库了吗？',
    likes: '9401',
    image: `${PUBLIC_BASE}works/02-visual-library.webp`,
    href: 'https://www.xiaohongshu.com/user/profile/550c7316d39ea2522bf6bbe2/69cdf20c000000001a0246a1?xsec_token=ABr8J10OvSGoYx2fgmIniWctp0ZccJtf0WOI1iZ2KRY64=&xsec_source=pc_user'
  },
  {
    title: '80年代复古日漫风小尝试《街头猎人》',
    likes: '85',
    image: `${PUBLIC_BASE}works/03-street-hunter.webp`,
    href: 'https://www.xiaohongshu.com/user/profile/550c7316d39ea2522bf6bbe2/6925af61000000001b02553f?xsec_token=AB9J6c8tpiOFKModj1fbWyEl7l7I7xgPL8idfbJuAo43E=&xsec_source=pc_user'
  },
  {
    title: '以彝族为灵感的探索',
    likes: '2037',
    image: `${PUBLIC_BASE}works/04-yi-inspiration.webp`,
    href: 'https://www.xiaohongshu.com/user/profile/550c7316d39ea2522bf6bbe2/692430f7000000001e023f69?xsec_token=AB35girJqsqskcHd6YoPU5lkGrWghjBRqXAT76kvhjVxo=&xsec_source=pc_user'
  },
  {
    title: 'Sanctuary Codex 037｜技术与有机的视觉博弈',
    likes: '355',
    image: `${PUBLIC_BASE}works/05-sanctuary-037.webp`,
    href: 'https://www.xiaohongshu.com/user/profile/550c7316d39ea2522bf6bbe2/6920876b000000001f00c67f?xsec_token=AB050MUcqdDftDRFMf3yb72YCCg8GsTlGzKEwRHE1WjcY=&xsec_source=pc_user'
  },
  {
    title: '给我的星星们准备的星光大赏邀请函',
    likes: '44',
    image: `${PUBLIC_BASE}works/06-starlight-invitation.webp`,
    href: 'https://www.xiaohongshu.com/user/profile/550c7316d39ea2522bf6bbe2/69202dcd000000000d03e100?xsec_token=AB050MUcqdDftDRFMf3yb72UUYwNCgnRSU48PUCNOvcPQ=&xsec_source=pc_user'
  },
  {
    title: '以 Hmong 苗为灵感的探索',
    likes: '4682',
    image: `${PUBLIC_BASE}works/07-hmong-inspiration.webp`,
    href: 'https://www.xiaohongshu.com/user/profile/550c7316d39ea2522bf6bbe2/69176c730000000004029e04?xsec_token=ABZ2Iai_PXMylOdbKtA_xROk-HlrKpTwWHfiY3vpuKjXA=&xsec_source=pc_user'
  },
  {
    title: '腾讯视频获奖 AI 短片《同步失衡》',
    likes: '1205',
    image: `${PUBLIC_BASE}works/08-sync-imbalance.webp`,
    href: 'https://www.xiaohongshu.com/user/profile/550c7316d39ea2522bf6bbe2/690d6ea1000000000402b40f?xsec_token=ABtCe2A5ht5P9IpKCfIsZs9mDNYd7aIU7l9LE_y27AyXk=&xsec_source=pc_user'
  }
];

export default function WorksShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const scrollFrameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const nextIndex = (index + WORKS.length) % WORKS.length;
    const track = trackRef.current;
    const card = track?.querySelector(`[data-work-index="${nextIndex}"]`);
    if (!track || !card) return;

    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left, behavior: 'smooth' });
    setActiveIndex(nextIndex);
  };

  useEffect(() => () => cancelAnimationFrame(scrollFrameRef.current), []);

  useEffect(() => {
    let frameId = 0;

    const updateParallax = () => {
      frameId = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const distance = Math.max(0, Math.min(window.innerHeight, window.innerHeight - rect.top));
      const progress = distance / Math.max(1, window.innerHeight);

      section.style.setProperty('--works-title-y', `${(-progress * 112).toFixed(2)}px`);
      section.style.setProperty('--works-copy-y', `${(-progress * 62).toFixed(2)}px`);
      section.style.setProperty('--works-carousel-y', `${(-progress * 28).toFixed(2)}px`);
      section.style.setProperty('--works-glow-y', `${(progress * 24).toFixed(2)}px`);
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

  const updateActiveCard = () => {
    const track = trackRef.current;
    if (!track) return;

    cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = requestAnimationFrame(() => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearestIndex = 0;
      let nearestDistance = Infinity;

      track.querySelectorAll('[data-work-index]').forEach((card) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(center - cardCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = Number(card.dataset.workIndex);
        }
      });

      setActiveIndex(nearestIndex);
    });
  };

  const handlePointerDown = (event) => {
    const track = trackRef.current;
    if (!track) return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
      moved: false
    };
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag.active) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;
    track.scrollLeft = drag.scrollLeft - distance;
  };

  const handlePointerUp = (event) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;

    dragRef.current.active = false;
    track.releasePointerCapture(event.pointerId);
    updateActiveCard();
  };

  return (
    <section ref={sectionRef} className="works-showcase" id="works" aria-labelledby="works-title">
      <div className="works-divider" aria-hidden="true">
        <div className="works-divider-track">
          <span>SELECTED WORKS · SOULFUL POETIC · VISUAL ARCHIVE · </span>
          <span>SELECTED WORKS · SOULFUL POETIC · VISUAL ARCHIVE · </span>
        </div>
        <span className="works-divider-pulse" />
      </div>
      <div className="works-atmosphere" aria-hidden="true" />

      <header className="works-heading">
        <div>
          <p className="works-kicker">02 / SELECTED WORKS · RED NOTEBOOK</p>
          <h2 id="works-title"><span>Soulful</span><span>Poetic</span></h2>
        </div>

        <div className="works-profile-copy">
          <span className="works-stamp" aria-hidden="true">NANA<br />ARCHIVE</span>
          <p>Capturing souls with syllables.<br />Commercial film · MV · Concept design</p>
          <a href={PROFILE_URL} target="_blank" rel="noreferrer">
            View Xiaohongshu profile <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <div className="works-carousel">
        <div className="works-controls">
          <p>Drag to browse / click to open</p>
          <div>
            <button type="button" onClick={() => scrollToIndex(activeIndex - 1)} aria-label="Previous work">←</button>
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(WORKS.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => scrollToIndex(activeIndex + 1)} aria-label="Next work">→</button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="works-track"
          onScroll={updateActiveCard}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDragStart={(event) => event.preventDefault()}
        >
          <span className="works-track-spacer" aria-hidden="true" />
          {WORKS.map((work, index) => (
            <a
              key={work.href}
              className={`work-card${index === activeIndex ? ' work-card--active' : ''}`}
              data-work-index={index}
              draggable="false"
              href={work.href}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                if (dragRef.current.moved) {
                  event.preventDefault();
                  dragRef.current.moved = false;
                }
              }}
            >
              <span className="work-card-index">No. {String(index + 1).padStart(2, '0')}</span>
              <span className="work-card-image">
                <img src={work.image} alt={work.title} draggable="false" />
              </span>
              <span className="work-card-caption">
                <strong>{work.title}</strong>
                <small>{work.likes} likes &amp; saves <span aria-hidden="true">↗</span></small>
              </span>
            </a>
          ))}
          <span className="works-track-spacer" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
