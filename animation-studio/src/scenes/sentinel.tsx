import {Layout, Line, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, waitFor} from '@motion-canvas/core';

const box=(label:string, fill:string)=>
  <Rect width={230} height={92} radius={18} fill={fill} stroke={'#29405f'} lineWidth={2}>
    <Txt text={label} fill={'#f7fbff'} fontSize={27} fontWeight={700}/>
  </Rect>;

export default makeScene2D(function* (view) {
  const title=createRef<Txt>();
  const sources=createRef<Rect>();
  const sentinel=createRef<Rect>();
  const incident=createRef<Rect>();
  const response=createRef<Rect>();

  view.fill('#07111f');
  view.add(
    <Layout layout direction={'column'} gap={70} alignItems={'center'}>
      <Txt ref={title} text={'Why Microsoft Sentinel exists'} fill={'#f7fbff'} fontSize={54} fontWeight={800}/>
      <Layout layout direction={'row'} gap={40} alignItems={'center'}>
        <Rect ref={sources}>{box('Security Data', '#10213a')}</Rect>
        <Line points={[[0,0],[52,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={sentinel}>{box('Microsoft Sentinel', '#142b4d')}</Rect>
        <Line points={[[0,0],[52,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={incident}>{box('Incident', '#10213a')}</Rect>
        <Line points={[[0,0],[52,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={response}>{box('Automated Response', '#0f513d')}</Rect>
      </Layout>
    </Layout>
  );

  yield* waitFor(0.8);
  yield* title().text('Problem: security telemetry is fragmented across many systems',0.8);
  yield* sources().scale(1.12,0.5);
  yield* waitFor(0.8);
  yield* title().text('Analysts need correlation, investigation, and response in one place',0.8);
  yield* incident().fill('#5b1f2d',0.5);
  yield* waitFor(0.8);
  yield* title().text('Sentinel ingests, detects, investigates, and automates',0.8);
  yield* all(sentinel().scale(1.18,0.5),sentinel().fill('#1c4f8f',0.5));
  yield* waitFor(0.6);
  yield* title().text('Result: faster detection and repeatable response',0.8);
  yield* response().scale(1.14,0.5);
  yield* waitFor(1.2);
});