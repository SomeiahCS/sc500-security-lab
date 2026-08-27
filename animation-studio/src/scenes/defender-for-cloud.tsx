import {Layout, Line, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, waitFor} from '@motion-canvas/core';

const box=(label:string, fill:string)=>
  <Rect width={240} height={92} radius={18} fill={fill} stroke={'#29405f'} lineWidth={2}>
    <Txt text={label} fill={'#f7fbff'} fontSize={27} fontWeight={700}/>
  </Rect>;

export default makeScene2D(function* (view) {
  const title=createRef<Txt>();
  const resources=createRef<Rect>();
  const defender=createRef<Rect>();
  const recs=createRef<Rect>();
  const remediate=createRef<Rect>();

  view.fill('#07111f');
  view.add(
    <Layout layout direction={'column'} gap={70} alignItems={'center'}>
      <Txt ref={title} text={'Why Defender for Cloud exists'} fill={'#f7fbff'} fontSize={54} fontWeight={800}/>
      <Layout layout direction={'row'} gap={42} alignItems={'center'}>
        <Rect ref={resources}>{box('Cloud Resources', '#10213a')}</Rect>
        <Line points={[[0,0],[55,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={defender}>{box('Defender for Cloud', '#142b4d')}</Rect>
        <Line points={[[0,0],[55,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={recs}>{box('Risks + Recommendations', '#10213a')}</Rect>
        <Line points={[[0,0],[55,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={remediate}>{box('Remediation', '#0f513d')}</Rect>
      </Layout>
    </Layout>
  );

  yield* waitFor(0.8);
  yield* title().text('Problem: cloud estates grow faster than humans can review them',0.8);
  yield* resources().scale(1.12,0.5);
  yield* waitFor(0.8);
  yield* title().text('Misconfigurations and unknown assets create hidden attack paths',0.8);
  yield* recs().fill('#5b1f2d',0.5);
  yield* waitFor(0.8);
  yield* title().text('Defender for Cloud continuously assesses posture and workload risk',0.8);
  yield* all(defender().scale(1.18,0.5),defender().fill('#1c4f8f',0.5));
  yield* waitFor(0.6);
  yield* title().text('Result: prioritize risk, fix posture, add workload protection',0.8);
  yield* remediate().scale(1.14,0.5);
  yield* waitFor(1.2);
});