import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const ink = '#f5f2ec';
const black = '#050505';
const font = 'Arial, "PingFang SC", "Microsoft YaHei", sans-serif';
const mono = '"SFMono-Regular", "Roboto Mono", monospace';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};

const loopVisibility = (frame, duration) =>
  Math.min(
    interpolate(frame, [0, 14], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)}),
    interpolate(frame, [duration - 14, duration - 1], [1, 0], {
      ...clamp,
      easing: Easing.in(Easing.cubic),
    }),
  );

const Grain = () => (
  <AbsoluteFill
    style={{
      opacity: 0.1,
      mixBlendMode: 'soft-light',
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 160 160\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
    }}
  />
);

const Title = ({index, title, accent}) => (
  <div
    style={{
      position: 'absolute',
      zIndex: 20,
      left: 66,
      top: 50,
      width: 560,
      display: 'flex',
      flexDirection: 'column',
      gap: 54,
    }}
  >
    <div style={{color: accent, fontFamily: mono, fontSize: 16, fontWeight: 700, letterSpacing: '0.15em'}}>
      {index} / NANA·MOTION
    </div>
    <div
      style={{
        whiteSpace: 'pre-line',
        fontSize: title.length > 12 ? 68 : 82,
        fontWeight: 900,
        letterSpacing: '-0.065em',
        lineHeight: 0.98,
        textShadow: '0 8px 34px rgba(0,0,0,.8)',
      }}
    >
      {title}
    </div>
  </div>
);

const ShotVisual = ({t, accent}) => {
  const active = Math.floor(t * 3) % 3;
  const words = ['远', '中', '近'];
  return (
    <>
      <div style={{position: 'absolute', right: 48, top: 105, width: 700, height: 600}}>
        {[0, 1, 2, 3].map((i) => {
          const pulse = 1 + Math.sin(t * Math.PI * 2 + i * 0.7) * 0.08;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 350,
                top: 300,
                width: 540 - i * 108,
                height: 338 - i * 68,
                translate: `-50% -50%`,
                scale: `${pulse}`,
                rotate: `${Math.sin(t * Math.PI * 2 + i) * (5 + i * 2)}deg`,
                border: `${i === active ? 4 : 1}px solid ${i === active ? accent : 'rgba(255,255,255,.25)'}`,
                boxShadow: i === active ? `0 0 30px ${accent}66` : 'none',
              }}
            />
          );
        })}
        <div style={{position: 'absolute', left: 345, top: 295, width: 12, height: 12, borderRadius: '50%', background: accent, boxShadow: `0 0 28px ${accent}`}} />
        <div style={{position: 'absolute', left: 350, top: 90, width: 1, height: 420, background: 'linear-gradient(transparent, rgba(255,255,255,.35), transparent)'}} />
        <div style={{position: 'absolute', left: 135, top: 300, width: 430, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)'}} />
      </div>
      <div style={{position: 'absolute', left: 74, bottom: 58, display: 'flex', gap: 28}}>
        {words.map((word, i) => (
          <span key={word} style={{fontSize: i === active ? 76 : 44, fontWeight: 900, color: i === active ? accent : 'rgba(255,255,255,.22)', translate: `0 ${i === active ? -12 : 0}px`}}>{word}</span>
        ))}
      </div>
    </>
  );
};

const LensVisual = ({t, accent}) => {
  const values = ['24', '50', '85'];
  const active = Math.floor(t * 3) % 3;
  const sweep = t * 360;
  return (
    <div style={{position: 'absolute', right: 45, top: 82, width: 720, height: 650}}>
      <svg width="720" height="650" viewBox="0 0 720 650">
        <defs>
          <radialGradient id="lens-glass">
            <stop stopColor="rgba(255,255,255,.9)" />
            <stop offset=".08" stopColor={accent} stopOpacity=".46" />
            <stop offset=".55" stopColor="#5669ff" stopOpacity=".18" />
            <stop offset="1" stopColor="#050505" />
          </radialGradient>
          <filter id="lens-glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {Array.from({length: 17}, (_, i) => {
          const a = (i / 16 - 0.5) * 1.65;
          return <line key={i} x1="70" y1={325 + Math.sin(a) * 255} x2="360" y2="325" stroke="rgba(255,255,255,.11)" />;
        })}
        {Array.from({length: 17}, (_, i) => {
          const a = (i / 16 - 0.5) * 1.65;
          return <line key={i} x1="360" y1="325" x2="670" y2={325 + Math.sin(a) * (active === 0 ? 250 : active === 1 ? 155 : 85)} stroke={`${accent}33`} />;
        })}
        <circle cx="360" cy="325" r="225" fill="none" stroke="rgba(255,255,255,.12)" />
        <circle cx="360" cy="325" r="185" fill="url(#lens-glass)" stroke={accent} strokeWidth="2" filter="url(#lens-glow)" />
        <circle cx="360" cy="325" r="122" fill="rgba(5,5,5,.72)" stroke="rgba(255,255,255,.28)" />
        <path d="M360 100 A225 225 0 0 1 548 201" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" transform={`rotate(${sweep} 360 325)`} />
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 112, fontWeight: 900, letterSpacing: '-0.08em'}}>{values[active]}</div>
    </div>
  );
};

const LightVisual = ({t}) => {
  const colors = ['#ff3f78', '#54eaff', '#8cff58'];
  return (
    <div style={{position: 'absolute', right: 20, top: 78, width: 760, height: 680, mixBlendMode: 'screen'}}>
      {colors.map((color, i) => (
        <div key={color} style={{position: 'absolute', left: 350 + Math.cos(t * Math.PI * 2 + i * 2.094) * 150, top: 310 + Math.sin(t * Math.PI * 2 + i * 2.094) * 135, width: 330, height: 330, translate: '-50% -50%', borderRadius: '50%', background: color, filter: 'blur(55px)', opacity: 0.58, scale: `${0.86 + Math.sin(t * Math.PI * 4 + i) * 0.15}`}} />
      ))}
      {colors.map((color, i) => (
        <div key={`${color}-beam`} style={{position: 'absolute', left: 360, top: 330, width: 560, height: 250, translate: '-50% -50%', rotate: `${t * 360 + i * 120}deg`, clipPath: 'polygon(0 46%, 100% 0, 100% 100%, 0 54%)', background: `linear-gradient(90deg, transparent, ${color}55)`, filter: 'blur(3px)', opacity: 0.8}} />
      ))}
      <div style={{position: 'absolute', left: 360, top: 330, width: 140, height: 140, translate: '-50% -50%', borderRadius: '50%', background: '#fff', boxShadow: '0 0 70px #fff'}} />
    </div>
  );
};

const WorkflowVisual = ({t, accent}) => (
  <div style={{position: 'absolute', right: 34, top: 105, width: 720, height: 610, rotate: '-7deg'}}>
    {[0, 1, 2, 3, 4].map((i) => {
      const x = 65 + i * 126;
      const y = 120 + (i % 2) * 190 + Math.sin(t * Math.PI * 2 + i * 0.8) * 28;
      const active = Math.floor(t * 5) % 5 === i;
      return (
        <React.Fragment key={i}>
          {i < 4 ? <div style={{position: 'absolute', left: x + 90, top: y + 59, width: 105, height: 3, rotate: `${i % 2 === 0 ? 49 : -49}deg`, transformOrigin: 'left center', background: `linear-gradient(90deg, ${accent}, transparent)`, opacity: 0.55}} /> : null}
          <div style={{position: 'absolute', left: x, top: y, width: 126, height: 126, borderRadius: 24, display: 'grid', placeItems: 'center', color: active ? black : ink, background: active ? accent : 'rgba(255,255,255,.045)', border: `2px solid ${active ? accent : 'rgba(255,255,255,.2)'}`, boxShadow: active ? `0 0 45px ${accent}88` : 'none', scale: active ? '1.18' : '0.88', fontFamily: mono, fontSize: 42, fontWeight: 900}}>{String(i + 1).padStart(2, '0')}</div>
        </React.Fragment>
      );
    })}
  </div>
);

const ConsistencyVisual = ({t, accent}) => {
  const active = Math.floor(t * 9) % 9;
  return (
    <div style={{position: 'absolute', right: 76, top: 118, width: 610, height: 570, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
      {Array.from({length: 9}, (_, i) => {
        const locked = i === active;
        return <div key={i} style={{position: 'relative', borderRadius: 20, border: `1px solid ${locked ? accent : 'rgba(255,255,255,.14)'}`, background: locked ? `${accent}18` : 'rgba(255,255,255,.025)', boxShadow: locked ? `0 0 30px ${accent}55` : 'none', scale: locked ? '1.08' : '0.94'}}>
          <div style={{position: 'absolute', left: '50%', top: 38, width: 44, height: 44, translate: '-50% 0', borderRadius: '50%', border: `4px solid ${locked ? accent : 'rgba(255,255,255,.5)'}`}} />
          <div style={{position: 'absolute', left: '50%', top: 92, width: 76, height: 52, translate: '-50% 0', borderRadius: '50% 50% 18% 18%', border: `4px solid ${locked ? accent : 'rgba(255,255,255,.5)'}`}} />
          <div style={{position: 'absolute', left: 18, right: 18, bottom: 16, height: 3, background: locked ? accent : 'rgba(255,255,255,.1)', boxShadow: locked ? `0 0 15px ${accent}` : 'none'}} />
        </div>;
      })}
      <div style={{position: 'absolute', left: '50%', top: '50%', width: 360, height: 360, translate: '-50% -50%', borderRadius: '50%', border: `1px solid ${accent}44`, rotate: `${t * 360}deg`, clipPath: 'polygon(0 0, 100% 0, 100% 18%, 0 18%)'}} />
    </div>
  );
};

const QueenVisual = ({t, accent}) => (
  <div style={{position: 'absolute', right: 80, top: 82, width: 600, height: 650}}>
    <div style={{position: 'absolute', inset: 40, borderRadius: '50%', border: `2px solid ${accent}`, rotate: `${t * 360}deg`, clipPath: 'polygon(0 0, 68% 0, 68% 20%, 0 20%)', boxShadow: `0 0 28px ${accent}`}} />
    <svg width="600" height="650" viewBox="0 0 600 650">
      <defs><linearGradient id="queen-dress" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f4eee5"/><stop offset=".42" stopColor={accent}/><stop offset="1" stopColor="#52000b"/></linearGradient><filter id="queen-glow"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <circle cx="300" cy="145" r="62" fill="#080808" stroke="#f4eee5" strokeWidth="4" />
      <path d="M300 205 C255 230 250 315 208 525 L392 525 C350 315 345 230 300 205Z" fill="url(#queen-dress)" stroke="#fff" strokeWidth="3" filter="url(#queen-glow)" />
      <path d="M247 91 L278 58 L300 98 L326 54 L354 92" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M210 525 Q300 575 390 525" fill="none" stroke={accent} strokeWidth="5" />
    </svg>
    {Array.from({length: 5}, (_, i) => <div key={i} style={{position: 'absolute', left: 292 + Math.cos(t * Math.PI * 2 + i * 1.256) * 260, top: 305 + Math.sin(t * Math.PI * 2 + i * 1.256) * 250, width: i === 0 ? 22 : 9, height: i === 0 ? 22 : 9, borderRadius: '50%', background: i === 0 ? accent : ink, boxShadow: `0 0 22px ${accent}`}} />)}
    <div style={{position: 'absolute', left: -70, bottom: 22, color: 'rgba(255,255,255,.08)', fontSize: 118, fontWeight: 900}}>QUEEN</div>
  </div>
);

const ElementsVisual = ({t}) => {
  const items = [{word: '画面', color: '#ff5b69'}, {word: '声音', color: '#59e7ff'}, {word: '节奏', color: '#ffcf4d'}];
  return <div style={{position: 'absolute', right: 22, top: 90, width: 760, height: 660}}>{items.map((item, i) => {
    const a = t * Math.PI * 2 + i * 2.094;
    return <div key={item.word} style={{position: 'absolute', left: 375 + Math.cos(a) * 142, top: 320 + Math.sin(a) * 120, width: 300, height: 300, translate: '-50% -50%', borderRadius: '50%', display: 'grid', placeItems: 'center', color: ink, fontSize: 52, fontWeight: 900, background: `radial-gradient(circle at 35% 30%, #fff, ${item.color} 22%, ${item.color}55 65%, transparent 71%)`, border: `2px solid ${item.color}`, boxShadow: `0 0 58px ${item.color}66`, mixBlendMode: 'screen', scale: `${0.9 + Math.sin(t * Math.PI * 4 + i) * 0.08}`}}>{item.word}</div>;
  })}</div>;
};

const DiagnosisVisual = ({t, accent}) => {
  const scan = (t * 760) % 760;
  return <div style={{position: 'absolute', right: 35, top: 160, width: 760, height: 470, overflow: 'hidden', border: '1px solid rgba(255,255,255,.13)', borderRadius: 28, background: 'rgba(255,255,255,.025)'}}>
    <svg width="760" height="470" viewBox="0 0 760 470">
      {Array.from({length: 8}, (_, i) => <line key={i} x1="0" y1={58 + i * 52} x2="760" y2={58 + i * 52} stroke="rgba(255,255,255,.06)" />)}
      <path d="M0 245 C48 245 54 130 100 130 S158 355 205 355 S254 210 302 210 S356 95 408 95 S454 330 508 330 S565 180 615 180 S690 250 760 250" fill="none" stroke="rgba(255,255,255,.24)" strokeWidth="5" />
      <path d={`M0 245 C48 245 54 130 100 130 S158 355 205 355 S254 210 302 210 S356 95 408 95 S454 330 508 330 S565 180 615 180 S690 250 760 250`} fill="none" stroke={accent} strokeWidth="8" strokeDasharray="120 640" strokeDashoffset={-t * 760} strokeLinecap="round" />
      {[205, 408, 615].map((x, i) => <rect key={x} x={x - 20} y={55 + i * 105} width="40" height="40" rx="8" fill={Math.abs(scan - x) < 90 ? '#59ff9a' : accent} filter="url(#none)" />)}
    </svg>
    <div style={{position: 'absolute', left: scan, top: 0, bottom: 0, width: 4, background: '#fff', boxShadow: `0 0 32px 12px ${accent}`}} />
  </div>;
};

const EmotionVisual = ({t}) => {
  const states = [{word: '紧张', color: '#ff555f'}, {word: '宁静', color: '#58e7ff'}, {word: '释放', color: '#ad6bff'}];
  const active = Math.floor(t * 3) % 3;
  return <>
    <svg width="1280" height="520" viewBox="0 0 1280 520" style={{position: 'absolute', left: 0, bottom: 20}}>
      {states.map((s, i) => {
        const amp = active === i ? 110 : 40;
        const y = 210 + i * 72;
        const path = `M-80 ${y} C120 ${y - amp} 230 ${y + amp} 410 ${y} S700 ${y - amp} 860 ${y} S1110 ${y + amp} 1360 ${y}`;
        return <path key={s.word} d={path} fill="none" stroke={s.color} strokeWidth={active === i ? 24 : 8} strokeOpacity={active === i ? .85 : .28} strokeLinecap="round" strokeDasharray={active === i ? 'none' : '30 22'} transform={`translate(${Math.sin(t * Math.PI * 2 + i) * 40} 0)`} style={{filter: `drop-shadow(0 0 18px ${s.color})`}} />;
      })}
    </svg>
    <div style={{position: 'absolute', left: 70, bottom: 58, display: 'flex', gap: 42}}>{states.map((s, i) => <span key={s.word} style={{fontSize: i === active ? 72 : 40, fontWeight: 900, color: i === active ? s.color : 'rgba(255,255,255,.24)', textShadow: i === active ? `0 0 28px ${s.color}` : 'none'}}>{s.word}</span>)}</div>
  </>;
};

const CameraVisual = ({t, accent}) => {
  const words = ['推', '拉', '摇', '移'];
  const active = Math.floor(t * 4) % 4;
  const x = 160 + t * 510;
  const y = 330 + Math.sin(t * Math.PI * 4) * 120;
  return <div style={{position: 'absolute', right: 0, top: 92, width: 760, height: 650}}>
    <svg width="760" height="650" viewBox="0 0 760 650">
      <path d="M70 460 C180 80 490 590 700 170" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="3" strokeDasharray="14 16" />
      <path d="M70 460 C180 80 490 590 700 170" fill="none" stroke={accent} strokeWidth="8" strokeDasharray="110 900" strokeDashoffset={-t * 1000} strokeLinecap="round" />
      {Array.from({length: 5}, (_, i) => <circle key={i} cx={90 + i * 145} cy={i % 2 === 0 ? 420 : 210} r="7" fill={i === active ? accent : 'rgba(255,255,255,.4)'} />)}
    </svg>
    <div style={{position: 'absolute', left: x, top: y, width: 210, height: 132, translate: '-50% -50%', rotate: `${Math.sin(t * Math.PI * 2) * 14}deg`, border: `5px solid ${accent}`, boxShadow: `0 0 35px ${accent}88`, background: 'rgba(5,5,5,.48)'}}><div style={{position: 'absolute', inset: 18, border: '1px solid rgba(255,255,255,.5)'}} /></div>
    <div style={{position: 'absolute', right: 48, bottom: 32, fontSize: 112, fontWeight: 900, color: accent, textShadow: `0 0 35px ${accent}`}}>{words[active]}</div>
  </div>;
};

const AdStageIcon = ({stage, accent, active}) => {
  const stroke = active ? accent : 'rgba(245,242,236,.62)';
  if (stage === 0) {
    return <div style={{width: 78, display: 'flex', flexDirection: 'column', gap: 12}}>
      {[1, 0.72, 0.88].map((width, i) => <div key={i} style={{width: `${width * 100}%`, height: 8, borderRadius: 8, background: stroke, boxShadow: active ? `0 0 14px ${accent}` : 'none'}} />)}
    </div>;
  }
  if (stage === 1) {
    return <div style={{position: 'relative', width: 94, height: 72, border: `4px solid ${stroke}`, borderRadius: 8}}>
      <div style={{position: 'absolute', left: 15, top: 13, width: 25, height: 25, borderRadius: '50%', background: accent, boxShadow: `0 0 18px ${accent}`}} />
      <div style={{position: 'absolute', left: 11, right: 11, bottom: 10, height: 22, clipPath: 'polygon(0 100%, 34% 25%, 55% 75%, 76% 40%, 100% 100%)', background: stroke}} />
    </div>;
  }
  if (stage === 2) {
    return <div style={{position: 'relative', width: 100, height: 78}}>
      <div style={{position: 'absolute', left: 0, top: 5, width: 44, height: 44, clipPath: 'polygon(12% 0, 100% 50%, 12% 100%)', background: accent, filter: active ? `drop-shadow(0 0 12px ${accent})` : 'none'}} />
      {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 0, bottom: i * 12, width: 100 - i * 20, height: 6, borderRadius: 6, background: stroke}} />)}
    </div>;
  }
  return <div style={{position: 'relative', width: 92, height: 92}}>
    <div style={{position: 'absolute', left: 42, top: 5, width: 9, height: 68, borderRadius: 9, background: stroke, boxShadow: active ? `0 0 16px ${accent}` : 'none'}} />
    <div style={{position: 'absolute', left: 23, top: 2, width: 46, height: 46, borderLeft: `9px solid ${stroke}`, borderTop: `9px solid ${stroke}`, rotate: '45deg'}} />
    <div style={{position: 'absolute', left: 10, right: 10, bottom: 2, height: 9, borderRadius: 9, background: accent}} />
  </div>;
};

const AdWorkflowVisual = ({t, accent}) => {
  const active = Math.floor(t * 4) % 4;
  const labels = ['需求', '视觉', '剪辑', '发布'];
  const positions = [
    {left: 22, top: 225},
    {left: 202, top: 78},
    {left: 382, top: 225},
    {left: 562, top: 78},
  ];
  return <div style={{position: 'absolute', right: 8, top: 92, width: 780, height: 660}}>
    <svg width="780" height="660" viewBox="0 0 780 660">
      <defs><linearGradient id="ad-flow-line" x1="0" x2="1"><stop stopColor="#ff4f9b"/><stop offset=".52" stopColor="#8d73ff"/><stop offset="1" stopColor="#59e7ff"/></linearGradient></defs>
      <path d="M102 335 L282 188 L462 335 L642 188" fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="5" strokeDasharray="14 14" />
      <path d="M102 335 L282 188 L462 335 L642 188" fill="none" stroke="url(#ad-flow-line)" strokeWidth="10" strokeDasharray="115 900" strokeDashoffset={-t * 960} strokeLinecap="round" />
      {[{x: 102, y: 335}, {x: 282, y: 188}, {x: 462, y: 335}, {x: 642, y: 188}].map((point, i) => <circle key={i} cx={point.x} cy={point.y} r={i === active ? 14 : 7} fill={i === active ? accent : ink} style={{filter: i === active ? `drop-shadow(0 0 14px ${accent})` : 'none'}} />)}
    </svg>
    {positions.map((position, i) => {
      const selected = i === active;
      return <div key={i} style={{position: 'absolute', ...position, width: 160, height: 218, borderRadius: 22, border: `2px solid ${selected ? accent : 'rgba(255,255,255,.2)'}`, background: selected ? `linear-gradient(160deg, ${accent}55, rgba(5,5,5,.96) 58%)` : 'rgba(255,255,255,.035)', boxShadow: selected ? `0 0 42px ${accent}77` : 'none', scale: selected ? '1.12' : '0.9', translate: `0 ${Math.sin(t * Math.PI * 2 + i) * 12}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '22px 16px 24px'}}>
        <div style={{alignSelf: 'flex-start', color: selected ? accent : 'rgba(255,255,255,.38)', fontFamily: mono, fontSize: 18, fontWeight: 800}}>{String(i + 1).padStart(2, '0')}</div>
        <AdStageIcon stage={i} accent={accent} active={selected} />
        <div style={{fontSize: 30, fontWeight: 900, color: selected ? ink : 'rgba(245,242,236,.46)'}}>{labels[i]}</div>
      </div>;
    })}
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 32, textAlign: 'center', color: accent, fontSize: 64, fontWeight: 900, letterSpacing: '-0.06em', textShadow: `0 0 28px ${accent}`}}>{labels[active]}</div>
  </div>;
};

const visualByType = {
  shot: ShotVisual,
  lens: LensVisual,
  light: LightVisual,
  workflow: WorkflowVisual,
  consistency: ConsistencyVisual,
  queen: QueenVisual,
  elements: ElementsVisual,
  diagnosis: DiagnosisVisual,
  emotion: EmotionVisual,
  camera: CameraVisual,
  adflow: AdWorkflowVisual,
};

export const CourseSetDemo = ({index, title, accent, type}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;
  const Visual = visualByType[type];
  return (
    <AbsoluteFill style={{overflow: 'hidden', color: ink, background: black, fontFamily: font, opacity: loopVisibility(frame, durationInFrames)}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 74% 52%, ${accent}24, transparent 37%), radial-gradient(circle at 12% 95%, ${accent}12, transparent 30%)`}} />
      <Title index={index} title={title} accent={accent} />
      <Visual t={t} accent={accent} />
      <div style={{position: 'absolute', left: 54, right: 54, bottom: 28, height: 1, background: 'rgba(255,255,255,.12)'}} />
      <Grain />
    </AbsoluteFill>
  );
};
