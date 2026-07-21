import { useState } from 'react';

import './CommunityJoin.css';

const COMMUNITY_LINK = '#微信小店://风变AI社团小店/NA2zX795SJCaRkh';

export default function CommunityJoin() {
  const [copied, setCopied] = useState(false);

  const copyCommunityLink = async (event) => {
    if (!navigator.clipboard?.writeText) return;

    event.preventDefault();
    await navigator.clipboard.writeText(COMMUNITY_LINK);
    setCopied(true);
  };

  return (
    <section className="community-join" id="community" aria-labelledby="community-title">
      <div className="community-grid" aria-hidden="true" />
      <div className="community-glow community-glow--pink" aria-hidden="true" />
      <div className="community-glow community-glow--blue" aria-hidden="true" />

      <header className="community-header">
        <p>03 / JOIN THE CLUB</p>
        <span>IMAGE · SOUND · MOTION · COMMUNITY</span>
      </header>

      <div className="community-content">
        <div className="community-copy">
          <p className="community-kicker"><span aria-hidden="true">✦</span> 风变 × NANA</p>
          <h2 id="community-title">
            <span>视听艺术</span>
            <span>创作社团</span>
          </h2>
          <p className="community-intro">
            把图像、声音与运动汇入一个持续创作的共同体。课程之外，继续练习、分享，并完成属于你的作品。
          </p>
        </div>

        <article className="community-ticket">
          <div className="community-ticket-edge" aria-hidden="true">
            <span>ADMIT ONE</span>
            <span>2026</span>
          </div>

          <div className="community-ticket-body">
            <div className="community-ticket-meta">
              <span>FC × NANA</span>
              <span>MEMBER ACCESS</span>
            </div>

            <p className="community-ticket-number">NO. 03—∞</p>
            <h3>CREATE<br />TOGETHER.</h3>
            <p className="community-ticket-note">微信小店社团入口</p>

            <a className="community-action" href={COMMUNITY_LINK} onClick={copyCommunityLink}>
              <span>{copied ? '已复制，去微信打开' : '复制微信小店入口'}</span>
              <span aria-hidden="true">↗</span>
            </a>

            <p className="community-link-hint">点击复制口令 · 打开微信即可进入</p>
          </div>
        </article>
      </div>

      <footer className="community-footer">
        <span>SOULFUL POETIC</span>
        <span>MAKE · SHARE · GROW</span>
        <span>NANA AUDIOVISUAL ART CLUB</span>
      </footer>
    </section>
  );
}
