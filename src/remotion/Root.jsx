import React from 'react';
import {Composition} from 'remotion';
import {
  ContinuityDemo,
  EastWestDemo,
  EmotionColorDemo,
  PromptSystemDemo,
} from './MotionDemos';
import {CourseSetDemo} from './CourseSetDemos';

const courseCards = [
  {id: 'ShotCameraComposition', index: '05', title: '景别、机位\n与构图', accent: '#d8ff4f', type: 'shot'},
  {id: 'PerspectiveFocalLength', index: '06', title: '视角与焦段', accent: '#62e7ff', type: 'lens'},
  {id: 'AdvancedLightColor', index: '07', title: '进阶光色系统', accent: '#ff5b9d', type: 'light'},
  {id: 'WanWorkflow', index: '08', title: 'WAN 2.7\n完整工作流', accent: '#8d73ff', type: 'workflow'},
  {id: 'ConsistencySystem', index: '09', title: '一致性系统', accent: '#55e6ff', type: 'consistency'},
  {id: 'PradaQueenWorkflow', index: '10', title: 'PRADA 女王系列\n工作流', accent: '#ff4e55', type: 'queen'},
  {id: 'VideoThreeElements', index: '11', title: '视频三要素', accent: '#ffcc4d', type: 'elements'},
  {id: 'VideoScriptDiagnosis', index: '12', title: '视频脚本诊断', accent: '#ff655d', type: 'diagnosis'},
  {id: 'VideoEmotionBasics', index: '13', title: '视频情绪基础', accent: '#b16cff', type: 'emotion'},
  {id: 'CameraMovePrompts', index: '14', title: '进阶运镜提示词\n+ 案例', accent: '#5fe5ff', type: 'camera'},
  {id: 'InfiniteAdWorkflow', index: '15', title: '无穷动图广告\n工作流', accent: '#ff4f9b', type: 'infinity'},
];

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="PromptSystemDemo"
        component={PromptSystemDemo}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={800}
      />
      <Composition
        id="ContinuityDemo"
        component={ContinuityDemo}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={800}
      />
      <Composition
        id="EmotionColorDemo"
        component={EmotionColorDemo}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={800}
      />
      <Composition
        id="EastWestDemo"
        component={EastWestDemo}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={800}
      />
      {courseCards.map((card) => (
        <Composition
          key={card.id}
          id={card.id}
          component={CourseSetDemo}
          durationInFrames={150}
          fps={30}
          width={1280}
          height={800}
          defaultProps={{
            index: card.index,
            title: card.title,
            accent: card.accent,
            type: card.type,
          }}
        />
      ))}
    </>
  );
};
