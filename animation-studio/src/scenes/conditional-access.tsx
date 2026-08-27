import {Circle, Layout, Line, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, waitFor} from '@motion-canvas/core';

const card=(label:string, fill:string)=>
  <Rect width={250} height={92} radius={18} fill={fill} stroke={'#29405f'} lineWidth={2}>
    <Txt text={label} fill={'#f7fbff'} fontSize={30} fontWeight={700}/>
  </Rect>;

export default makeScene2D(function* (view) {
  const user=createRef<Rect>();
  const identity=createRef<Rect>();
  const ca=createRef<Rect>();
  const app=createRef<Rect>();
  const risk=createRef<Circle>();
  const title=createRef<Txt>();

  view.fill('#07111f');
  view.add(
    <Layout layout direction={'column'} gap={60} alignItems={'center'}>
      <Txt ref={title} text={'Why Conditional Access exists'} fill={'#f7fbff'} fontSize={54} fontWeight={800}/>
      <Layout layout direction={'row'} gap={70} alignItems={'center'}>
        <Rect ref={user}>{card('User', '#10213a')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={identity}>{card('Entra ID', '#10213a')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={ca}>{card('Conditional Access', '#142b4d')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={app}>{card('Cloud App', '#10213a')}</Rect>
      </Layout>
      <Circle ref={risk} size={140} fill={'#5b1f2d'} opacity={0}>
        <Txt text={'RISK'} fill={'#ffb4bf'} fontSize={30} fontWeight={800}/>
      </Circle>
    </Layout>
  );

  yield* waitFor(0.8);
  yield* title().text('Problem: a password alone is not enough context', 0.7);
  yield* risk().opacity(1, 0.5);
  yield* waitFor(0.8);
  yield* title().text('Conditional Access evaluates identity context before access', 0.8);
  yield* all(ca().scale(1.18,0.5), ca().fill('#1c4f8f',0.5));
  yield* waitFor(0.8);
  yield* title().text('Result: Allow, require MFA, or block', 0.7);
  yield* app().fill('#0f513d',0.5);
  yield* waitFor(1.2);
});