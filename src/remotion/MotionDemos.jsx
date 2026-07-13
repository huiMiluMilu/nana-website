import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const C = {
  black: '#050505',
  paper: '#f5f2ec',
  dim: 'rgba(245,242,236,0.42)',
  acid: '#d8ff4f',
  cyan: '#62e7ff',
  blue: '#596dff',
  violet: '#9a5cff',
  coral: '#ff6269',
};

const font = 'Arial, "PingFang SC", "Microsoft YaHei", sans-serif';
const mono = '"SFMono-Regular", "Roboto Mono", monospace';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};

const loopVisibility = (frame, duration) =>
  Math.min(
    interpolate(frame, [0, 18], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)}),
    interpolate(frame, [duration - 18, duration - 1], [1, 0], {
      ...clamp,
      easing: Easing.in(Easing.cubic),
    }),
  );

const Grain = ({opacity = 0.13}) => (
  <AbsoluteFill
    style={{
      opacity,
      mixBlendMode: 'soft-light',
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 180 180\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.86\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'.8\'/%3E%3C/svg%3E")',
      pointerEvents: 'none',
    }}
  />
);

const FrameChrome = ({index, accent, label}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: 42,
        right: 42,
        top: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: C.dim,
        fontFamily: mono,
        fontSize: 13,
        letterSpacing: '0.13em',
      }}
    >
      <span>[ {index} / NANA·MOTION ]</span>
      <span style={{color: accent}}>● &nbsp;{label}</span>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 42,
        right: 42,
        bottom: 34,
        height: 1,
        background: 'rgba(255,255,255,0.13)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: 42,
        bottom: 18,
        color: C.dim,
        fontFamily: mono,
        fontSize: 10,
        letterSpacing: '0.16em',
      }}
    >
      16:10 / LOOP STUDY
    </div>
  </>
);

const Hexagon = ({radius, stroke, strokeWidth = 1, opacity = 1, rotate = 0}) => {
  const points = Array.from({length: 6}, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${320 + Math.cos(angle) * radius},${320 + Math.sin(angle) * radius}`;
  }).join(' ');
  return (
    <polygon
      points={points}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      transform={`rotate(${rotate} 320 320)`}
    />
  );
};

const promptDimensions = [
  ['01', '主体', 'SUBJECT'],
  ['02', '场景', 'SCENE'],
  ['03', '构图', 'COMPOSITION'],
  ['04', '光影', 'LIGHT'],
  ['05', '材质', 'MATERIAL'],
  ['06', '风格', 'STYLE'],
];

export const PromptSystemDemo = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;
  const visibility = loopVisibility(frame, durationInFrames);
  const sweep = t * 360;
  const active = Math.floor(t * 6) % 6;

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        color: C.paper,
        background: C.black,
        fontFamily: font,
        opacity: visibility,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 73% 50%, rgba(89,109,255,0.21), transparent 30%), radial-gradient(circle at 70% 54%, rgba(98,231,255,0.08), transparent 42%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -170,
          top: 475,
          width: 750,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(216,255,79,0.12)',
          filter: 'blur(42px)',
          rotate: '-8deg',
          scale: `${1 + Math.sin(t * Math.PI * 2) * 0.08}`,
        }}
      />
      <FrameChrome index="01" accent={C.acid} label="PROMPT ARCHITECTURE" />

      <div
        style={{
          position: 'absolute',
          left: 74,
          top: 112,
          width: 430,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        <div style={{color: C.acid, fontFamily: mono, fontSize: 14, letterSpacing: '0.15em'}}>
          SIX-DIMENSION SYSTEM
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 800,
            letterSpacing: '-0.065em',
            lineHeight: 0.94,
          }}
        >
          六维结构
          <br />
          提示词
        </div>
        <div style={{width: 336, color: 'rgba(245,242,236,0.6)', fontSize: 20, lineHeight: 1.55}}>
          从主体到风格，建立可复用、
          <br />可控制的视觉生成语言。
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginTop: 16,
            color: C.dim,
            fontFamily: mono,
            fontSize: 12,
            letterSpacing: '0.1em',
          }}
        >
          <span style={{width: 54, height: 1, background: C.acid}} />
          STRUCTURE → CONTROL → STYLE
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 72,
          top: 76,
          width: 640,
          height: 640,
        }}
      >
        <svg width="640" height="640" viewBox="0 0 640 640">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="7" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="edge" x1="0" x2="1">
              <stop stopColor={C.acid} />
              <stop offset="0.52" stopColor={C.cyan} />
              <stop offset="1" stopColor={C.violet} />
            </linearGradient>
          </defs>
          <circle cx="320" cy="320" r="260" fill="none" stroke="rgba(255,255,255,.07)" />
          <circle
            cx="320"
            cy="320"
            r="238"
            fill="none"
            stroke="url(#edge)"
            strokeWidth="2"
            strokeDasharray="210 1285"
            transform={`rotate(${sweep - 90} 320 320)`}
            opacity=".75"
            filter="url(#glow)"
          />
          <Hexagon radius={201} stroke="rgba(255,255,255,.13)" rotate={-sweep * 0.035} />
          <Hexagon radius={151} stroke="url(#edge)" strokeWidth={2} opacity={0.86} rotate={sweep * 0.055} />
          <Hexagon radius={92} stroke="rgba(255,255,255,.16)" rotate={-sweep * 0.08} />
          {Array.from({length: 18}, (_, i) => {
            const a = (Math.PI * 2 * i) / 18 + t * Math.PI * 2 * 0.08;
            const r = i % 3 === 0 ? 238 : 223;
            return (
              <circle
                key={i}
                cx={320 + Math.cos(a) * r}
                cy={320 + Math.sin(a) * r}
                r={i % 3 === 0 ? 3 : 1.4}
                fill={i % 3 === 0 ? C.acid : 'rgba(255,255,255,.35)'}
              />
            );
          })}
          {promptDimensions.map((item, i) => {
            const a = (Math.PI / 3) * i - Math.PI / 2;
            const x = 320 + Math.cos(a) * 201;
            const y = 320 + Math.sin(a) * 201;
            const selected = i === active;
            return (
              <g key={item[0]}>
                <line x1="320" y1="320" x2={x} y2={y} stroke="rgba(255,255,255,.08)" />
                <circle
                  cx={x}
                  cy={y}
                  r={selected ? 14 : 7}
                  fill={selected ? C.acid : C.black}
                  stroke={selected ? C.acid : 'rgba(255,255,255,.5)'}
                  strokeWidth="2"
                  filter={selected ? 'url(#glow)' : undefined}
                />
              </g>
            );
          })}
          <circle cx="320" cy="320" r="59" fill="rgba(5,5,5,.86)" stroke="url(#edge)" strokeWidth="2" />
          <circle
            cx="320"
            cy="320"
            r={26 + Math.sin(t * Math.PI * 2) * 5}
            fill="rgba(98,231,255,.13)"
            stroke={C.cyan}
            filter="url(#glow)"
          />
          <text x="320" y="326" fill={C.paper} textAnchor="middle" fontFamily={mono} fontSize="15">
            PROMPT
          </text>
        </svg>

        {promptDimensions.map((item, i) => {
          const a = (Math.PI / 3) * i - Math.PI / 2;
          const r = 280;
          const x = 320 + Math.cos(a) * r;
          const y = 320 + Math.sin(a) * r;
          const selected = i === active;
          return (
            <div
              key={item[0]}
              style={{
                position: 'absolute',
                left: x - 56,
                top: y - 27,
                width: 112,
                textAlign: 'center',
                color: selected ? C.acid : C.paper,
                opacity: selected ? 1 : 0.55,
              }}
            >
              <div style={{fontSize: 21, fontWeight: 700}}>{item[1]}</div>
              <div style={{marginTop: 5, fontFamily: mono, fontSize: 9, letterSpacing: '0.12em'}}>
                {item[0]} / {item[2]}
              </div>
            </div>
          );
        })}
      </div>
      <Grain />
    </AbsoluteFill>
  );
};

const actionPoses = [
  {head: [50, 31], body: 'M50 52 C47 70 43 87 33 102', arm: 'M46 63 L25 77 M49 63 L69 52', leg: 'M41 86 L25 116 M41 86 L58 112'},
  {head: [51, 30], body: 'M50 51 C55 70 51 86 43 101', arm: 'M52 62 L30 53 M54 62 L74 75', leg: 'M45 86 L36 117 M45 86 L70 105'},
  {head: [50, 30], body: 'M50 51 C50 70 50 86 50 101', arm: 'M50 62 L27 69 M50 62 L73 68', leg: 'M50 86 L34 116 M50 86 L67 116'},
  {head: [49, 30], body: 'M50 51 C45 70 49 86 57 101', arm: 'M48 62 L26 75 M46 62 L70 53', leg: 'M55 86 L30 105 M55 86 L64 117'},
  {head: [50, 31], body: 'M50 52 C53 70 57 87 67 102', arm: 'M54 63 L31 52 M51 63 L75 77', leg: 'M59 86 L42 112 M59 86 L75 116'},
];

const Pose = ({pose, color, glow}) => (
  <svg viewBox="0 0 100 130" width="100%" height="100%">
    <defs>
      <filter id={`pose-glow-${glow}`}>
        <feGaussianBlur stdDeviation="4" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx={pose.head[0]} cy={pose.head[1]} r="12" fill="rgba(5,5,5,.9)" stroke={color} strokeWidth="3" />
    {[pose.body, pose.arm, pose.leg].map((d, i) => (
      <path
        key={i}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#pose-glow-${glow})`}
      />
    ))}
    <circle cx="50" cy="62" r="4" fill={C.paper} />
    <circle cx="50" cy="86" r="4" fill={C.paper} />
  </svg>
);

export const ContinuityDemo = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;
  const visibility = loopVisibility(frame, durationInFrames);
  const travel = Math.sin(t * Math.PI * 2);
  const pulse = 0.5 + Math.sin(t * Math.PI * 4) * 0.5;

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        color: C.paper,
        background: C.black,
        fontFamily: font,
        opacity: visibility,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 25% 40%, rgba(154,92,255,.18), transparent 32%), radial-gradient(circle at 73% 65%, rgba(255,98,105,.13), transparent 32%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -80,
          right: -80,
          top: 383,
          height: 52,
          borderRadius: '50%',
          background: 'linear-gradient(90deg, transparent, rgba(98,231,255,.3), rgba(154,92,255,.48), rgba(255,98,105,.32), transparent)',
          filter: 'blur(30px)',
          scale: `${1 + pulse * 0.1} ${0.9 + pulse * 0.2}`,
        }}
      />
      <FrameChrome index="02" accent={C.cyan} label="CONSISTENCY ENGINE" />

      <div
        style={{
          position: 'absolute',
          left: 74,
          right: 74,
          top: 92,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{color: C.cyan, fontFamily: mono, fontSize: 14, letterSpacing: '0.15em'}}>
            VISUAL CONTINUITY / 02
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 63,
              fontWeight: 800,
              letterSpacing: '-0.055em',
              lineHeight: 1,
            }}
          >
            稳定出图 × 动作连续性
          </div>
        </div>
        <div style={{display: 'flex', gap: 38, paddingBottom: 6}}>
          {[
            ['98.7%', 'IDENTITY'],
            ['05', 'KEYFRAMES'],
          ].map(([v, k]) => (
            <div key={k}>
              <div style={{fontSize: 30, fontWeight: 800, color: k === 'IDENTITY' ? C.cyan : C.coral}}>{v}</div>
              <div style={{marginTop: 5, color: C.dim, fontFamily: mono, fontSize: 10, letterSpacing: '0.13em'}}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 74,
          right: 74,
          top: 252,
          height: 350,
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          alignItems: 'center',
          gap: 17,
          translate: `${travel * 8}px 0`,
        }}
      >
        {actionPoses.map((pose, i) => {
          const colors = [C.violet, C.blue, C.cyan, C.blue, C.coral];
          const center = i === 2;
          const y = Math.abs(i - 2) * 22 + Math.sin(t * Math.PI * 2 + i * 0.7) * 5;
          return (
            <div
              key={i}
              style={{
                position: 'relative',
                height: center ? 310 : 254,
                translate: `0 ${y}px`,
                border: `1px solid ${center ? C.cyan : 'rgba(255,255,255,.18)'}`,
                borderRadius: 18,
                overflow: 'hidden',
                background: center
                  ? 'linear-gradient(180deg, rgba(98,231,255,.11), rgba(5,5,5,.92))'
                  : 'linear-gradient(180deg, rgba(255,255,255,.035), rgba(5,5,5,.92))',
                boxShadow: center ? `0 0 38px rgba(98,231,255,${0.13 + pulse * 0.1})` : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '15px 16px 0',
                  color: center ? C.cyan : C.dim,
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: '0.1em',
                }}
              >
                <span>KF · 0{i + 1}</span>
                <span>{center ? 'LOCKED' : 'MATCH'}</span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '54%',
                  width: center ? 160 : 135,
                  height: center ? 208 : 176,
                  translate: '-50% -50%',
                }}
              >
                <Pose pose={pose} color={colors[i]} glow={i} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 16,
                  right: 16,
                  bottom: 14,
                  height: 3,
                  background: 'rgba(255,255,255,.1)',
                }}
              >
                <div
                  style={{
                    width: `${34 + i * 14 + pulse * 10}%`,
                    height: '100%',
                    background: colors[i],
                    boxShadow: `0 0 12px ${colors[i]}`,
                  }}
                />
              </div>
              {center ? (
                <div
                  style={{
                    position: 'absolute',
                    inset: 7,
                    border: '1px dashed rgba(98,231,255,.26)',
                    borderRadius: 12,
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <svg
        width="1132"
        height="88"
        viewBox="0 0 1132 88"
        style={{position: 'absolute', left: 74, top: 596, overflow: 'visible'}}
      >
        <defs>
          <linearGradient id="flow" x1="0" x2="1">
            <stop stopColor={C.violet} />
            <stop offset=".52" stopColor={C.cyan} />
            <stop offset="1" stopColor={C.coral} />
          </linearGradient>
        </defs>
        <path
          d="M16 40 C170 7 270 73 418 40 S690 8 820 40 S1000 73 1116 40"
          fill="none"
          stroke="rgba(255,255,255,.11)"
          strokeWidth="1"
        />
        <path
          d="M16 40 C170 7 270 73 418 40 S690 8 820 40 S1000 73 1116 40"
          fill="none"
          stroke="url(#flow)"
          strokeWidth="3"
          strokeDasharray="120 980"
          strokeDashoffset={-t * 1100}
          strokeLinecap="round"
        />
        {Array.from({length: 5}, (_, i) => (
          <circle key={i} cx={16 + i * 275} cy="40" r="4" fill={i === 2 ? C.cyan : C.paper} />
        ))}
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 74,
          bottom: 64,
          display: 'flex',
          gap: 26,
          color: C.dim,
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: '0.11em',
        }}
      >
        <span style={{color: C.cyan}}>● CHARACTER ANCHOR</span>
        <span>→ POSE INTERPOLATION</span>
        <span>→ CAMERA CONTINUITY</span>
      </div>
      <Grain opacity={0.11} />
    </AbsoluteFill>
  );
};

const emotionStates = [
  {word: '热烈', color: '#ff5a46', glow: 'rgba(255,90,70,.48)'},
  {word: '宁静', color: '#62e7ff', glow: 'rgba(98,231,255,.42)'},
  {word: '神秘', color: '#a665ff', glow: 'rgba(166,101,255,.46)'},
  {word: '希望', color: '#d8ff4f', glow: 'rgba(216,255,79,.4)'},
];

const circularDistance = (a, b, length) => {
  const direct = Math.abs(a - b);
  return Math.min(direct, length - direct);
};

export const EmotionColorDemo = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;
  const visibility = loopVisibility(frame, durationInFrames);
  const phase = t * emotionStates.length;
  const active = Math.floor(phase) % emotionStates.length;
  const activeColor = emotionStates[active].color;
  const activeGlow = emotionStates[active].glow;
  const breathe = Math.sin(t * Math.PI * 4);
  const orbit = t * 360;

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        color: C.paper,
        background: C.black,
        fontFamily: font,
        opacity: visibility,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${68 + Math.sin(t * Math.PI * 2) * 7}% ${48 + Math.cos(t * Math.PI * 2) * 5}%, ${activeGlow}, transparent 35%)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 64,
          top: 48,
          color: activeColor,
          fontFamily: mono,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.15em',
        }}
      >
        03 / COLOR &amp; EMOTION
      </div>

      <div
        style={{
          position: 'absolute',
          left: 64,
          top: 156,
          zIndex: 5,
          fontSize: 88,
          fontWeight: 850,
          letterSpacing: '-0.07em',
          lineHeight: 0.95,
        }}
      >
        情绪的
        <br />
        色彩心理学
      </div>

      <div
        style={{
          position: 'absolute',
          right: 78,
          top: 95,
          width: 600,
          height: 600,
          translate: `${Math.sin(t * Math.PI * 2) * 54}px ${Math.cos(t * Math.PI * 2) * 18}px`,
          scale: `${1 + breathe * 0.055}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 54,
            borderRadius: '50%',
            background:
              'conic-gradient(from 45deg, #ff5a46, #ff3f9a, #a665ff, #506cff, #62e7ff, #d8ff4f, #ffb84d, #ff5a46)',
            rotate: `${orbit}deg`,
            filter: 'blur(2px) saturate(1.15)',
            boxShadow: `0 0 ${75 + Math.abs(breathe) * 40}px ${activeGlow}`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 117,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 34% 29%, rgba(255,255,255,.88), rgba(255,255,255,.12) 11%, rgba(5,5,5,.82) 48%, #050505 68%)',
            boxShadow: 'inset -28px -24px 68px rgba(0,0,0,.82), inset 20px 18px 44px rgba(255,255,255,.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 28,
            border: `2px solid ${activeColor}`,
            borderRadius: '50%',
            opacity: 0.5,
            rotate: `${-orbit * 0.7}deg`,
            clipPath: 'polygon(0 0, 62% 0, 62% 17%, 0 17%)',
            filter: `drop-shadow(0 0 12px ${activeColor})`,
          }}
        />
        {emotionStates.map((state, i) => {
          const angle = (Math.PI * 2 * i) / emotionStates.length + t * Math.PI * 2;
          return (
            <div
              key={state.word}
              style={{
                position: 'absolute',
                left: 292 + Math.cos(angle) * 258,
                top: 292 + Math.sin(angle) * 258,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: state.color,
                boxShadow: `0 0 24px ${state.color}`,
                translate: '-50% -50%',
                scale: i === active ? '1.8' : '0.75',
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 64,
          bottom: 92,
          width: 420,
          height: 110,
          overflow: 'hidden',
        }}
      >
        {emotionStates.map((state, i) => {
          const distance = circularDistance(phase, i + 0.5, emotionStates.length);
          const opacity = interpolate(distance, [0, 0.5, 0.9], [1, 0.8, 0], clamp);
          const y = interpolate(distance, [0, 0.9], [0, 42], clamp);
          return (
            <div
              key={state.word}
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                color: state.color,
                fontSize: 92,
                fontWeight: 900,
                letterSpacing: '-0.08em',
                opacity,
                translate: `0 ${y}px`,
                textShadow: `0 0 32px ${state.glow}`,
              }}
            >
              {state.word}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 7,
          background: `linear-gradient(90deg, ${activeColor} 0 ${25 + (phase % 1) * 75}%, rgba(255,255,255,.08) 0)`,
          boxShadow: `0 -8px 26px ${activeGlow}`,
        }}
      />
      <Grain opacity={0.1} />
    </AbsoluteFill>
  );
};

const facetPoints = [
  '320,72 470,170 384,296 320,250',
  '470,170 482,350 374,430 384,296',
  '374,430 320,534 254,388 320,250',
  '254,388 158,330 174,158 320,250',
  '174,158 320,72 320,250',
];

export const EastWestDemo = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;
  const visibility = loopVisibility(frame, durationInFrames);
  const rotation = t * 360;
  const split = 50 + Math.sin(t * Math.PI * 2) * 7;
  const activeWord = Math.floor(t * 3) % 3;
  const words = ['材质', '光影', '构图'];

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        color: C.paper,
        background: C.black,
        fontFamily: font,
        opacity: visibility,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 25% 55%, rgba(245,242,236,.13), transparent 34%), radial-gradient(circle at 77% 50%, rgba(255,128,49,.17), transparent 35%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 64,
          top: 46,
          color: C.paper,
          fontFamily: mono,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.15em',
        }}
      >
        04 / EAST × WEST
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${split}%`,
          height: '100%',
          overflow: 'hidden',
          background: 'linear-gradient(120deg, rgba(245,242,236,.07), transparent 55%)',
        }}
      >
        {Array.from({length: 7}, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 110 - i * 34 + Math.sin(t * Math.PI * 2 + i) * 34,
              top: 150 + i * 64,
              width: 560 + i * 48,
              height: 145,
              border: `${8 + i * 2}px solid rgba(245,242,236,${0.19 - i * 0.015})`,
              borderRadius: '50%',
              rotate: `${-16 + i * 7 + Math.sin(t * Math.PI * 2) * 12}deg`,
              filter: `blur(${i % 2 === 0 ? 0 : 2}px)`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 92,
            bottom: 108,
            fontSize: 148,
            fontWeight: 900,
            letterSpacing: '-0.09em',
            opacity: 0.16,
          }}
        >
          东方
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: `${100 - split}%`,
          height: '100%',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, rgba(255,57,123,.09), transparent 38%), linear-gradient(45deg, rgba(80,108,255,.12), transparent 48%)',
        }}
      >
        {Array.from({length: 9}, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              right: -70 + (i % 3) * 210,
              top: 95 + Math.floor(i / 3) * 205,
              width: 260,
              height: 260,
              border: '1px solid rgba(255,198,79,.22)',
              background: i % 2 === 0 ? 'rgba(255,97,68,.05)' : 'rgba(91,109,255,.06)',
              rotate: `${45 + rotation * (i % 2 === 0 ? 0.12 : -0.1)}deg`,
              scale: `${0.8 + Math.sin(t * Math.PI * 2 + i) * 0.1}`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            right: 92,
            bottom: 108,
            fontSize: 148,
            fontWeight: 900,
            letterSpacing: '-0.09em',
            opacity: 0.16,
          }}
        >
          西方
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: `${split}%`,
          top: 0,
          bottom: 0,
          width: 2,
          background: 'linear-gradient(180deg, transparent, rgba(255,255,255,.75), transparent)',
          boxShadow: '0 0 32px rgba(255,255,255,.4)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '49%',
          width: 640,
          height: 640,
          translate: '-50% -50%',
          scale: `${0.92 + Math.sin(t * Math.PI * 4) * 0.045}`,
        }}
      >
        <svg width="640" height="640" viewBox="0 0 640 640">
          <defs>
            <filter id="eastwest-glow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="facet-a" x1="0" x2="1">
              <stop stopColor="#ff5a46" />
              <stop offset=".48" stopColor="#ffcc57" />
              <stop offset="1" stopColor="#9a5cff" />
            </linearGradient>
            <linearGradient id="facet-b" x1="0" x2="1">
              <stop stopColor="#596dff" />
              <stop offset="1" stopColor="#62e7ff" />
            </linearGradient>
            <clipPath id="left-half"><rect x="0" y="0" width="320" height="640" /></clipPath>
            <clipPath id="right-half"><rect x="320" y="0" width="320" height="640" /></clipPath>
          </defs>

          <g clipPath="url(#left-half)" transform={`rotate(${-rotation * 0.18} 320 320)`}>
            {[228, 190, 152, 112].map((r, i) => (
              <circle
                key={r}
                cx="320"
                cy="320"
                r={r + Math.sin(t * Math.PI * 2 + i) * 12}
                fill="none"
                stroke={i === 0 ? C.paper : `rgba(245,242,236,${0.52 - i * 0.09})`}
                strokeWidth={i === 0 ? 18 : 9}
                strokeDasharray={`${260 - i * 28} ${88 + i * 35}`}
                strokeLinecap="round"
              />
            ))}
          </g>

          <g clipPath="url(#right-half)" transform={`rotate(${rotation * 0.24} 320 320)`}>
            {facetPoints.map((points, i) => (
              <polygon
                key={points}
                points={points}
                fill={i % 2 === 0 ? 'url(#facet-a)' : 'url(#facet-b)'}
                fillOpacity={0.5 + i * 0.07}
                stroke="rgba(255,255,255,.72)"
                strokeWidth="2"
                filter="url(#eastwest-glow)"
              />
            ))}
          </g>

          <circle cx="320" cy="320" r="248" fill="none" stroke="rgba(255,255,255,.18)" />
          <circle cx="320" cy="320" r="68" fill="#050505" stroke={C.paper} strokeWidth="2" />
          <circle cx="320" cy="320" r={22 + Math.sin(t * Math.PI * 4) * 8} fill={activeWord === 1 ? '#ffcc57' : C.paper} />
        </svg>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 82,
          zIndex: 6,
          textAlign: 'center',
          fontSize: 82,
          fontWeight: 900,
          letterSpacing: '-0.07em',
          textShadow: '0 6px 28px rgba(0,0,0,.8)',
        }}
      >
        中西艺术风格对比
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 62,
          zIndex: 7,
          display: 'flex',
          justifyContent: 'center',
          gap: 76,
        }}
      >
        {words.map((word, i) => (
          <div
            key={word}
            style={{
              color: i === activeWord ? (i === 0 ? C.paper : i === 1 ? '#ffcc57' : C.cyan) : 'rgba(245,242,236,.38)',
              fontSize: i === activeWord ? 62 : 44,
              fontWeight: 850,
              letterSpacing: '-0.05em',
              translate: `0 ${i === activeWord ? -10 : 0}px`,
              textShadow: i === activeWord ? '0 0 28px currentColor' : 'none',
            }}
          >
            {word}
          </div>
        ))}
      </div>
      <Grain opacity={0.12} />
    </AbsoluteFill>
  );
};
