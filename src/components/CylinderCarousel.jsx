import { useEffect, useRef, useState } from 'react';

import './CylinderCarousel.css';
import promptSystemGif from '../../output/gifs/01-prompt-system.gif';
import continuityGif from '../../output/gifs/02-continuity.gif';
import emotionColorGif from '../../output/gifs/03-emotion-color.gif';
import eastWestGif from '../../output/gifs/04-east-west.gif';
import shotCameraGif from '../../output/gifs/05-shot-camera.gif';
import perspectiveFocalGif from '../../output/gifs/06-perspective-focal.gif';
import lightColorGif from '../../output/gifs/07-light-color.gif';
import wanWorkflowGif from '../../output/gifs/08-wan-workflow.gif';
import consistencyGif from '../../output/gifs/09-consistency.gif';
import pradaQueenGif from '../../output/gifs/10-prada-queen.gif';
import videoElementsGif from '../../output/gifs/11-video-elements.gif';
import scriptDiagnosisGif from '../../output/gifs/12-script-diagnosis.gif';
import videoEmotionGif from '../../output/gifs/13-video-emotion.gif';
import cameraMovesGif from '../../output/gifs/14-camera-moves.gif';
import infiniteAdGif from '../../output/gifs/15-infinite-ad.gif';

// Replace `href` and `title` here when the final course pages are ready.
const COURSES = [
  { title: '3月9日 - 六维结构提示词', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/752?sectionId=file-Ofq54HFmRjPs&lessonId=course-AEqWjFz1xBaC', media: promptSystemGif },
  { title: '3月16日 - 稳定出图与“图像动作连续性”', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/750?sectionId=file-xHS66Qk5iWnm&lessonId=course-wBHQHyogzE6E', media: continuityGif },
  { title: '3月30日 - 情绪的色彩心理学', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/751?sectionId=file-tcAghI2_bzjn&lessonId=course-SiGdANx6sCxG', media: emotionColorGif },
  { title: '4月8日 - 中西艺术风格对比：材质·光影·构图', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/844?sectionId=file-uxHBukxYqcbF&lessonId=course-kO-OpVegf8T1', media: eastWestGif },
  { title: '4月13日 - 景别、机位与构图', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/915?sectionId=file-uw215zv6EIfR&lessonId=course-_g4Juy_ejcsK', media: shotCameraGif },
  { title: '4月20日 - 视角与焦段', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1133?sectionId=file-N7rTLBX_zgcA&lessonId=course-vkBQfrGVXh5z', media: perspectiveFocalGif },
  { title: '5月11日 - 进阶光色系统', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1151?sectionId=file-C1Qm6Z5Q_a1q&lessonId=course-Kea9BvNMsBfB', media: lightColorGif },
  { title: '5月18日 - WAN 2.7项目拆解：完整工作流与注意事项', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1261?sectionId=file-qpAV5DM2DLJv&lessonId=course-3ECL8Ex2IXz8', media: wanWorkflowGif },
  { title: '5月25日 - 一致性系统', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1264?sectionId=file-VZziroYHstEG&lessonId=course-DlAWYRvwiw56', media: consistencyGif },
  { title: '6月1日 - 穿Prada的女王系列作品工作流分享', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1263?sectionId=file-x1YHg0_SRvnd&lessonId=course-wCvrCbT6mLOm', media: pradaQueenGif },
  { title: '6月9日 - 视频三要素', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1350?sectionId=file-hR3FQfPpMyMu&lessonId=course-n_hAKFSdUJgq', media: videoElementsGif },
  { title: '6月15日 - 视频崩坏诊断', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1366?sectionId=file-a_Br1G3aEQzC&lessonId=course-mgbYfMs7B9F3', media: scriptDiagnosisGif },
  { title: '6月22日 - 视频运镜基础', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1651?sectionId=file-xzHG9azNbRr8&lessonId=course-xkhewS509rLR', media: videoEmotionGif },
  { title: '6月29日 - 进阶运镜提示词＋案例分享', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1734?sectionId=file-ZE8dmzE3PEsE&lessonId=course-ZE0C_-y1oSFh', media: cameraMovesGif },
  { title: '7月6日 - 无穷鸡腿视频广告工作流拆解', href: 'https://groups.forchangeai.com/detail/28/teaching-material/video/1795?sectionId=file-dQkvUWavw1nq&lessonId=course-EoXn52RV99cq', media: infiniteAdGif }
];

export const COURSE_COUNT = COURSES.length;

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

function CourseVisual({ theme, media, reverse = false }) {
  if (media) {
    return (
      <img
        className="course-card-media"
        src={media}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
    );
  }

  return (
    <div className={`course-visual course-visual--${theme}${reverse ? ' course-visual--reverse' : ''}`}>
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
  const lastDirectionRef = useRef(1);
  const wheelAccumulatorRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const hoverLockRef = useRef(false);
  const hoverUnlockTimerRef = useRef(0);
  const autoplayDeadlineRef = useRef(0);
  const isPointerOverCardRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [metrics, setMetrics] = useState({ cardW: 360, cardH: 225 });
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
    }, 650);
  };

  const moveCarousel = (step) => {
    const destination = Math.round(targetProgressRef.current) + step;
    lastDirectionRef.current = Math.sign(step) || lastDirectionRef.current;
    targetProgressRef.current = destination;
    setWindowCenter(destination);
    wheelAccumulatorRef.current = 0;
    resetAutoplayDeadline();
    lockHoverNavigation();
  };

  const centerCourse = (logicalIndex) => {
    const currentTarget = targetProgressRef.current;

    if (Math.abs(logicalIndex - currentTarget) < 0.2) return false;

    lastDirectionRef.current = Math.sign(logicalIndex - currentTarget) || lastDirectionRef.current;
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
      const { width, height } = container.getBoundingClientRect();
      const projectedWidth = width * (width < 520 ? 0.82 : 0.84);
      const projectedHeight = height * (width < 520 ? 0.5 : 0.56);
      const widthFromStage = projectedWidth / ACTIVE_CARD_SCALE;
      const widthFromHeight = (projectedHeight * CARD_RATIO) / ACTIVE_CARD_SCALE;
      const cardW = Math.round(Math.max(150, Math.min(410, widthFromStage, widthFromHeight)));
      setMetrics({ cardW, cardH: Math.round(cardW / CARD_RATIO) });
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
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      isPointerOverCardRef.current = false;
      resetAutoplayDeadline();
      setHoveredCourse(null);
    };

    const handleWheel = (event) => {
      const now = Date.now();
      if (now - lastWheelTimeRef.current > 180) {
        wheelAccumulatorRef.current = 0;
      }

      wheelAccumulatorRef.current += event.deltaY;
      lastWheelTimeRef.current = now;

      if (Math.abs(wheelAccumulatorRef.current) >= 42) {
        moveCarousel(Math.sign(wheelAccumulatorRef.current));
        setHoveredCourse(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('wheel', handleWheel, { passive: true });

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
    const render = () => {
      progressRef.current += (targetProgressRef.current - progressRef.current) * 0.085;
      const remainingDistance = targetProgressRef.current - progressRef.current;
      const isMoving = Math.abs(remainingDistance) >= 0.0005;

      if (!isMoving) progressRef.current = targetProgressRef.current;

      const direction = isMoving ? Math.sign(remainingDistance) : lastDirectionRef.current;
      if (isMoving) lastDirectionRef.current = direction;

      const anchorIndex = direction > 0
        ? Math.floor(progressRef.current)
        : Math.ceil(progressRef.current);
      const transitionPhase = isMoving
        ? direction > 0
          ? progressRef.current - anchorIndex
          : anchorIndex - progressRef.current
        : 0;
      const smoothstep = (value) => value * value * (3 - 2 * value);
      const leaveProgress = smoothstep(Math.min(1, transitionPhase / 0.44));
      const enterProgress = smoothstep(Math.max(0, Math.min(1, (transitionPhase - 0.56) / 0.44)));

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.075;
      mouse.y += (mouse.targetY - mouse.y) * 0.075;

      const stageHeight = containerRef.current?.clientHeight ?? window.innerHeight;
      cardRefs.current.forEach((card, logicalIndex) => {
        if (!card) return;

        const baseOffset = logicalIndex - anchorIndex;
        let offset;

        if (!isMoving) {
          offset = logicalIndex - Math.round(progressRef.current);
        } else if (direction > 0) {
          offset = baseOffset <= 0
            ? baseOffset - leaveProgress
            : baseOffset - enterProgress;
        } else {
          offset = baseOffset >= 0
            ? baseOffset + leaveProgress
            : baseOffset + enterProgress;
        }

        const absoluteOffset = Math.abs(offset);
        const sign = Math.sign(offset);
        const gap = Math.max(36, metrics.cardH * 0.16);
        const peekAmount = Math.max(38, stageHeight * 0.055);
        const perspective = PERSPECTIVE;

        let y = 0;
        let z = 0;
        let rotation = 0;

        if (absoluteOffset <= 1) {
          const t = smoothstep(absoluteOffset);
          y = -sign * t * (metrics.cardH + gap);
          z = ACTIVE_CARD_Z + t * (220 - ACTIVE_CARD_Z);
          rotation = t * 132;
        } else if (absoluteOffset <= 2) {
          const t = smoothstep(absoluteOffset - 1);
          const scaleAtEdge = perspective / (perspective + 60);
          const yAtEdge = (stageHeight / 2 + peekAmount) / scaleAtEdge - metrics.cardH / 2;
          const distance = metrics.cardH + gap + t * (yAtEdge - metrics.cardH - gap);
          y = -sign * distance;
          z = 220 + t * (-60 - 220);
          rotation = 132 + t * (175 - 132);
        } else {
          const t = smoothstep(Math.min(1, absoluteOffset - 2));
          const scaleAtStart = perspective / (perspective + 60);
          const yAtStart = (stageHeight / 2 + peekAmount) / scaleAtStart - metrics.cardH / 2;
          const scaleAtEnd = perspective / (perspective + 250);
          const yAtEnd = (stageHeight / 2 + 100) / scaleAtEnd + metrics.cardH / 2;
          y = -sign * (yAtStart + t * (yAtEnd - yAtStart));
          z = -60 + t * (-250 + 60);
          rotation = 175 + t * 20;
        }

        const centerFactor = Math.max(0, 1 - absoluteOffset);
        const tiltX = -mouse.y * 8 * centerFactor;
        const tiltY = mouse.x * 10 * centerFactor;
        const isActive = absoluteOffset < 0.42;
        const isInteractive = absoluteOffset < 1.38;

        card.style.visibility = absoluteOffset > 2.95 ? 'hidden' : 'visible';
        card.style.zIndex = String(Math.round(z + 500));
        card.style.opacity = String(Math.max(0, Math.min(1, 1.15 - Math.max(0, absoluteOffset - 1.75))));
        card.style.pointerEvents = isInteractive ? 'auto' : 'none';
        card.tabIndex = isActive ? 0 : -1;
        card.dataset.active = String(isActive);
        card.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        card.style.transform = `translate3d(0, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${(-sign * rotation + tiltX).toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) rotateZ(-3deg)`;
      });

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameRef.current);
  }, [metrics]);

  return (
    <div ref={containerRef} className="cylinder-carousel" aria-label="Course carousel">
      <div
        className={`course-hover-label${hoveredCourse ? ' course-hover-label--visible' : ''}`}
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
                isPointerOverCardRef.current = true;
                resetAutoplayDeadline();
                setHoveredCourse(course);
                if (!hoverLockRef.current) centerCourse(logicalIndex);
              }}
              onMouseLeave={() => {
                isPointerOverCardRef.current = false;
                resetAutoplayDeadline();
                setHoveredCourse(null);
              }}
              onFocus={() => {
                isPointerOverCardRef.current = true;
                resetAutoplayDeadline();
                setHoveredCourse(course);
              }}
              onBlur={() => {
                isPointerOverCardRef.current = false;
                resetAutoplayDeadline();
                setHoveredCourse(null);
              }}
            >
              <span className="course-card-edge" />
              <span className="course-card-face course-card-face--front">
                <CourseVisual theme={course.theme} media={course.media} />
              </span>
              <span className="course-card-face course-card-face--back">
                <CourseVisual theme={course.theme} media={course.media} reverse />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
