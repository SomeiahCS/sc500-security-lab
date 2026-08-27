import {Layout, Line, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, waitFor} from '@motion-canvas/core';

const box=(label:string, fill:string)=>
  <Rect width={250} height={92} radius={18} fill={fill} stroke={'#29405f'} lineWidth={2}>
    <Txt text={label} fill={'#f7fbff'} fontSize={29} fontWeight={700}/>
  </Rect>;

export default makeScene2D(function* (view) {
  const title=createRef<Txt>();
  const internet=createRef<Rect>();
  const endpoint=createRef<Rect>();
  const storage=createRef<Rect>();

  view.fill('#07111f');
  view.add(
    <Layout layout direction={'column'} gap={58} alignItems={'center'}>
      <Txt ref={title} text={'Why Private Endpoint exists'} fill={'#f7fbff'} fontSize={54} fontWeight={800}/>
      <Layout layout direction={'row'} gap={60} alignItems={'center'}>
        <Rect ref={internet}>{box('Public Internet', '#3a1b27')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#ff6b7a'} lineWidth={6} endArrow/>
        <Rect ref={storage}>{box('Azure PaaS', '#10213a')}</Rect>
      </Layout>
      <Layout layout direction={'row'} gap={60} alignItems={'center'}>
        <Rect>{box('VNet', '#10213a')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={endpoint}>{box('Private Endpoint', '#142b4d')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect>{box('Private IP', '#0f513d')}</Rect>
      </Layout>
    </Layout>
  );

  yield* waitFor(0.8);
  yield* title().text('Problem: PaaS services are reachable through public endpoints',0.8);
  yield* internet().scale(1.12,0.5);
  yield* waitFor(0.8);
  yield* title().text('Private Endpoint brings the service into your VNet',0.8);
  yield* all(endpoint().scale(1.18,0.5),endpoint().fill('#1c4f8f',0.5));
  yield* waitFor(0.8);
  yield* title().text('Result: private reachability with less public exposure',0.8);
  yield* storage().fill('#0f513d',0.5);
  yield* waitFor(1.2);
});