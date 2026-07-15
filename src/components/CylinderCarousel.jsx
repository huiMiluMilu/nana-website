import { useEffect, useRef, useState } from 'react';

import './CylinderCarousel.css';
import promptSystemVideo from '../../output/videos/01-prompt-system.mp4';
import continuityVideo from '../../output/videos/02-continuity.mp4';
import emotionColorVideo from '../../output/videos/03-emotion-color.mp4';
import eastWestVideo from '../../output/videos/04-east-west.mp4';
import shotCameraVideo from '../../output/videos/05-shot-camera.mp4';
import perspectiveFocalVideo from '../../output/videos/06-perspective-focal.mp4';
import lightColorVideo from '../../output/videos/07-light-color.mp4';
import wanWorkflowVideo from '../../output/videos/08-wan-workflow.mp4';
import consistencyVideo from '../../output/videos/09-consistency.mp4';
import pradaQueenVideo from '../../output/videos/10-prada-queen.mp4';
import videoElementsVideo from '../../output/videos/11-video-elements.mp4';
import scriptDiagnosisVideo from '../../output/videos/12-script-diagnosis.mp4';
import videoEmotionVideo from '../../output/videos/13-video-emotion.mp4';
import cameraMovesVideo from '../../output/videos/14-camera-moves.mp4';
import infiniteAdVideo from '../../output/videos/15-infinite-ad.mp4';

// Replace `href` and `title` here when the final course pages are ready.
const COURSES = [
  { title: '3月9日 - 六维结构提示词', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/752?sectionId=file-Ofq54HFmRjPs&lessonId=course-AEqWjFz1xBaC', media: promptSystemVideo },
  { title: '3月16日 - 稳定出图与“图像动作连续性”', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/750?sectionId=file-xHS66Qk5iWnm&lessonId=course-wBHQHyogzE6E', media: continuityVideo },
  { title: '3月30日 - 情绪的色彩心理学', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/751?sectionId=file-tcAghI2_bzjn&lessonId=course-SiGdANx6sCxG', media: emotionColorVideo },
  { title: '4月8日 - 中西艺术风格对比：材质·光影·构图', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/844?sectionId=file-uxHBukxYqcbF&lessonId=course-kO-OpVegf8T1', media: eastWestVideo },
  { title: '4月13日 - 景别、机位与构图', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/915?sectionId=file-uw215zv6EIfR&lessonId=course-_g4Juy_ejcsK', media: shotCameraVideo },
  { title: '4月20日 - 视角与焦段', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1133?sectionId=file-N7rTLBX_zgcA&lessonId=course-vkBQfrGVXh5z', media: perspectiveFocalVideo },
  { title: '5月11日 - 进阶光色系统', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1151?sectionId=file-C1Qm6Z5Q_a1q&lessonId=course-Kea9BvNMsBfB', media: lightColorVideo },
  { title: '5月18日 - WAN 2.7项目拆解：完整工作流与注意事项', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1261?sectionId=file-qpAV5DM2DLJv&lessonId=course-3ECL8Ex2IXz8', media: wanWorkflowVideo },
  { title: '5月25日 - 一致性系统', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1264?sectionId=file-VZziroYHstEG&lessonId=course-DlAWYRvwiw56', media: consistencyVideo },
  { title: '6月1日 - 穿Prada的女王系列作品工作流分享', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1263?sectionId=file-x1YHg0_SRvnd&lessonId=course-wCvrCbT6mLOm', media: pradaQueenVideo },
  { title: '6月9日 - 视频三要素', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1350?sectionId=file-hR3FQfPpMyMu&lessonId=course-n_hAKFSdUJgq', media: videoElementsVideo },
  { title: '6月15日 - 视频崩坏诊断', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1366?sectionId=file-a_Br1G3aEQzC&lessonId=course-mgbYfMs7B9F3', media: scriptDiagnosisVideo },
  { title: '6月22日 - 视频运镜基础', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1651?sectionId=file-xzHG9azNbRr8&lessonId=course-xkhewS509rLR', media: videoEmotionVideo },
  { title: '6月29日 - 进阶运镜提示词＋案例分享', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1734?sectionId=file-ZE8dmzE3PEsE&lessonId=course-ZE0C_-y1oSFh', media: cameraMovesVideo },
  { title: '7月6日 - 无穷鸡腿视频广告工作流拆解', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1795?sectionId=file-dQkvUWavw1nq&lessonId=course-EoXn52RV99cq', media: infiniteAdVideo }
];

const CARD_RATIO = 16 / 10;
const VISIBLE_CARD_LIMIT = 7;
const PERSPECTIVE = 1350;
const ACTIVE_CARD_Z = 400;
const ACTIVE_CARD_SCALE = PERSPECTIVE / (PERSPECTIVE - ACTIVE_CARD_Z);

function getVisibleCourses(centerIndex) {
  const visibleCount = Math.min(COURSES.length, VISIBLE_CARD_LIMIT);
  const firstIndex = centerIndex - Math.floor((visibleCount - 1) / 2);

  return Array.from({ length: visibleCount }, (_, slotIndex) => {
    const logicalIndex = firstIndex + slotIndex;
    const courseIndex = ((logicalIndex % COURSES.length) + COURSES.length) % COURSES.length;
    return { course: COURSES[courseIndex], logicalIndex };
  });
}

function CourseVisual({ theme, media }) {
  if (media) {
    return (
      <video
        className="course-card-media"
        src={media}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`course-visual course-visual--${theme}`}>
      <span className="course-visual-grid" />
      <span className="course-visual-shape course-visual-shape--one" />
      <span className="course-visual-shape course-visual-shape--two" />
      <span className="course-visual-glint" />
    </div>
  );
}

export default function CylinderCarousel() {
  const containerRef = useRef(null);
  const cardRefs = useRef(new Map());
  const frameRef = useRef(0);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const progressVelocityRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const wheelAccumulatorRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const hoverLockRef = useRef(false);
  const hoverUnlockTimerRef = useRef(0);
  const autoplayDeadlineRef = useRef(0);
  const isPointerOverCardRef = useRef(false);
  const hoveredLogicalRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, clientX: -1, clientY: -1 });
  const [metrics, setMetrics] = useState({ cardW: 360, cardH: 225 });
  const [labelLayout, setLabelLayout] = useState({ width: 280, compact: false });
  const [windowCenter, setWindowCenter] = useState(0);
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const resetAutoplayDeadline = () => {
    autoplayDeadlineRef.current = Date.now() + 3000;
  };

  const lockHoverNavigation = () => {
    hoverLockRef.current = true;
    window.clearTimeout(hoverUnlockTimerRef.current);
    hoverUnlockTimerRef.current = window.setTimeout(() => {
      hoverLockRef.current = false;
    }, 950);
  };

  const moveCarousel = (step) => {
    const destination = Math.round(targetProgressRef.current) + step;
    targetProgressRef.current = destination;
    setWindowCenter(destination);
    wheelAccumulatorRef.current = 0;
    resetAutoplayDeadline();
    lockHoverNavigation();
  };

  const centerCourse = (logicalIndex) => {
    const currentTarget = targetProgressRef.current;

    if (Math.abs(logicalIndex - currentTarget) < 0.2) return false;

    targetProgressRef.current = logicalIndex;
    setWindowCenter(logicalIndex);
    wheelAccumulatorRef.current = 0;
    resetAutoplayDeadline();
    lockHoverNavigation();
    return true;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateMetrics = () => {
      const containerRect = container.getBoundingClientRect();
      const { width, height } = containerRect;
      const projectedWidth = width * (width < 520 ? 0.82 : 0.84);
      const projectedHeight = height * (width < 520 ? 0.5 : 0.56);
      const widthFromStage = projectedWidth / ACTIVE_CARD_SCALE;
      const widthFromHeight = (projectedHeight * CARD_RATIO) / ACTIVE_CARD_SCALE;
      const cardW = Math.round(Math.max(150, Math.min(410, widthFromStage, widthFromHeight)));
      const titleRight = document.querySelector('.hero-copy h1')?.getBoundingClientRect().right ?? 0;
      const labelGap = Math.max(18, Math.min(58, window.innerWidth * 0.035));
      const availableLabelWidth = Math.floor(containerRect.left - labelGap - titleRight - 20);

      setMetrics({ cardW, cardH: Math.round(cardW / CARD_RATIO) });
      setLabelLayout({
        width: Math.max(132, Math.min(280, availableLabelWidth)),
        compact: availableLabelWidth < 132
      });
    };

    updateMetrics();
    const observer = new ResizeObserver(updateMetrics);
    observer.observe(container);
    window.addEventListener('resize', updateMetrics);
    window.visualViewport?.addEventListener('resize', updateMetrics);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateMetrics);
      window.visualViewport?.removeEventListener('resize', updateMetrics);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = Math.max(-1, Math.min(1, x));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, y));
      mouseRef.current.clientX = event.clientX;
      mouseRef.current.clientY = event.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.clientX = -1;
      mouseRef.current.clientY = -1;
      hoveredLogicalRef.current = null;
      isPointerOverCardRef.current = false;
      resetAutoplayDeadline();
      setHoveredCourse(null);
    };

    const handleWheel = (event) => {
      event.preventDefault();

      const now = Date.now();
      if (now - lastWheelTimeRef.current > 180) {
        wheelAccumulatorRef.current = 0;
      }

      wheelAccumulatorRef.current += event.deltaY;
      lastWheelTimeRef.current = now;

      if (Math.abs(wheelAccumulatorRef.current) >= 42) {
        moveCarousel(Math.sign(wheelAccumulatorRef.current));
        hoveredLogicalRef.current = null;
        setHoveredCourse(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(hoverUnlockTimerRef.current), []);

  useEffect(() => {
    resetAutoplayDeadline();

    const intervalId = window.setInterval(() => {
      if (isPointerOverCardRef.current || Date.now() < autoplayDeadlineRef.current) return;

      moveCarousel(1);
      setHoveredCourse(null);
    }, 200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const render = (time) => {
      const deltaTime = lastFrameTimeRef.current
        ? Math.min((time - lastFrameTimeRef.current) / 1000, 0.034)
        : 1 / 60;
      lastFrameTimeRef.current = time;

      const remainingDistance = targetProgressRef.current - progressRef.current;
      progressVelocityRef.current += remainingDistance * 20 * deltaTime;
      progressVelocityRef.current *= Math.exp(-9 * deltaTime);
      progressRef.current += progressVelocityRef.current * deltaTime;

      const isMoving = Math.abs(remainingDistance) >= 0.0005
        || Math.abs(progressVelocityRef.current) >= 0.002;

      if (!isMoving) {
        progressRef.current = targetProgressRef.current;
        progressVelocityRef.current = 0;
      }

      const smoothstep = (value) => value * value * (3 - 2 * value);

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.075;
      mouse.y += (mouse.targetY - mouse.y) * 0.075;

      const stageHeight = containerRef.current?.clientHeight ?? window.innerHeight;
      const showEdgeCards = window.innerWidth >= 1200 && stageHeight >= 600;
      cardRefs.current.forEach((card, logicalIndex) => {
        if (!card) return;

        const offset = logicalIndex - progressRef.current;
        const absoluteOffset = Math.abs(offset);
        const sign = Math.sign(offset);
        const gap = Math.max(36, metrics.cardH * 0.16);

        let y = 0;
        let z = 0;
        let rotation = 0;

        if (absoluteOffset <= 1) {
          const t = smoothstep(absoluteOffset);
          y = sign * t * (metrics.cardH + gap);
          z = ACTIVE_CARD_Z + t * (220 - ACTIVE_CARD_Z);
          rotation = t * 86;
        } else if (absoluteOffset <= 2) {
          const t = smoothstep(Math.min(1, absoluteOffset - 1));
          const adjacentDistance = metrics.cardH + gap;
          const edgeZ = showEdgeCards ? -60 : -180;
          const edgeScale = PERSPECTIVE / (PERSPECTIVE - edgeZ);
          const edgeDistance = showEdgeCards
            ? (stageHeight / 2 + 55) / edgeScale - metrics.cardH / 2
            : stageHeight / 2 + metrics.cardH * 0.78;

          y = sign * (adjacentDistance + t * (edgeDistance - adjacentDistance));
          z = 220 + t * (edgeZ - 220);
          rotation = 86 + t * (showEdgeCards ? 2.5 : 3.5);
        } else {
          const t = smoothstep(Math.min(1, absoluteOffset - 2));
          const edgeZ = -60;
          const edgeScale = PERSPECTIVE / (PERSPECTIVE - edgeZ);
          const edgeDistance = (stageHeight / 2 + 55) / edgeScale - metrics.cardH / 2;
          const offscreenZ = -180;
          const offscreenScale = PERSPECTIVE / (PERSPECTIVE - offscreenZ);
          const offscreenDistance = (stageHeight / 2 + 100) / offscreenScale + metrics.cardH / 2;

          y = sign * (edgeDistance + t * (offscreenDistance - edgeDistance));
          z = edgeZ + t * (offscreenZ - edgeZ);
          rotation = 88.5 + t;
        }

        const centerFactor = Math.max(0, 1 - absoluteOffset);
        const tiltX = -mouse.y * 8 * centerFactor;
        const tiltY = mouse.x * 10 * centerFactor;
        const isActive = absoluteOffset < 0.42;
        const isInteractive = absoluteOffset < 1.38;

        const solidQueueLimit = showEdgeCards ? 2 : 1;
        const queueOpacity = absoluteOffset <= solidQueueLimit
          ? 1
          : Math.max(0, 1 - (absoluteOffset - solidQueueLimit) / 0.58);

        card.style.visibility = absoluteOffset > solidQueueLimit + 0.58 ? 'hidden' : 'visible';
        card.style.zIndex = String(Math.round(z + 500));
        card.style.opacity = String(queueOpacity);
        card.style.pointerEvents = isInteractive ? 'auto' : 'none';
        card.tabIndex = isActive ? 0 : -1;
        card.dataset.active = String(isActive);
        card.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        card.style.transform = `translate3d(0, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${(sign * rotation + tiltX).toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) rotateZ(-3deg)`;
      });

      const hitCard = mouse.clientX >= 0
        ? document.elementFromPoint(mouse.clientX, mouse.clientY)?.closest('.course-card')
        : null;
      const hitLogicalIndex = hitCard ? Number(hitCard.dataset.logicalIndex) : null;

      if (hitLogicalIndex !== hoveredLogicalRef.current) {
        if (!hitCard && hoverLockRef.current && hoveredLogicalRef.current !== null) {
          frameRef.current = requestAnimationFrame(render);
          return;
        }

        hoveredLogicalRef.current = hitLogicalIndex;
        isPointerOverCardRef.current = Boolean(hitCard);

        if (hitCard) {
          resetAutoplayDeadline();
          setHoveredCourse({ title: hitCard.dataset.courseTitle });
          if (!hoverLockRef.current) centerCourse(hitLogicalIndex);
        } else {
          setHoveredCourse(null);
        }
      }

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameRef.current);
  }, [metrics]);

  return (
    <div ref={containerRef} className="cylinder-carousel" aria-label="Course carousel">
      <div
        className={`course-hover-label${hoveredCourse ? ' course-hover-label--visible' : ''}${labelLayout.compact ? ' course-hover-label--compact' : ''}`}
        style={{ '--label-width': `${labelLayout.width}px` }}
        aria-live="polite"
      >
        <span>{hoveredCourse?.title ?? ''}</span>
      </div>

      <div className="cylinder-camera">
        <div
          className="cylinder-track"
          style={{ '--card-width': `${metrics.cardW}px`, '--card-height': `${metrics.cardH}px` }}
        >
          {getVisibleCourses(windowCenter).map(({ course, logicalIndex }) => (
            <a
              key={logicalIndex}
              ref={(element) => {
                if (element) cardRefs.current.set(logicalIndex, element);
                else cardRefs.current.delete(logicalIndex);
              }}
              className="course-card"
              data-course-title={course.title}
              data-logical-index={logicalIndex}
              href={course.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`打开课程：${course.title}`}
              aria-hidden={logicalIndex === windowCenter ? 'false' : 'true'}
              tabIndex={logicalIndex === windowCenter ? 0 : -1}
              onClick={(event) => {
                const isActive = cardRefs.current.get(logicalIndex)?.dataset.active === 'true';
                if (!isActive) {
                  event.preventDefault();
                  centerCourse(logicalIndex);
                  return;
                }

                if (course.href === '#') event.preventDefault();
              }}
              onMouseEnter={() => {
                hoveredLogicalRef.current = logicalIndex;
                isPointerOverCardRef.current = true;
                resetAutoplayDeadline();
                setHoveredCourse(course);
                if (!hoverLockRef.current) centerCourse(logicalIndex);
              }}
              onMouseLeave={() => {
                if (hoverLockRef.current) return;
                hoveredLogicalRef.current = null;
                isPointerOverCardRef.current = false;
                resetAutoplayDeadline();
                setHoveredCourse(null);
              }}
              onFocus={() => {
                hoveredLogicalRef.current = logicalIndex;
                isPointerOverCardRef.current = true;
                resetAutoplayDeadline();
                setHoveredCourse(course);
              }}
              onBlur={() => {
                hoveredLogicalRef.current = null;
                isPointerOverCardRef.current = false;
                resetAutoplayDeadline();
                setHoveredCourse(null);
              }}
            >
              <span className="course-card-face course-card-face--front">
                <CourseVisual theme={course.theme} media={course.media} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
