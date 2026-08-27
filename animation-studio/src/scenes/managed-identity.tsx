import {Layout, Line, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, waitFor} from '@motion-canvas/core';

const box=(label:string, fill:string)=>
  <Rect width={250} height={92} radius={18} fill={fill} stroke={'#29405f'} lineWidth={2}>
    <Txt text={label} fill={'#f7fbff'} fontSize={29} fontWeight={700}/>
  </Rect>;

export default makeScene2D(function* (view) {
  const title=createRef<Txt>();
  const secret=createRef<Rect>();
  const identity=createRef<Rect>();
  const vault=createRef<Rect>();

  view.fill('#07111f');
  view.add(
    <Layout layout direction={'column'} gap={58} alignItems={'center'}>
      <Txt ref={title} text={'Why Managed Identity exists'} fill={'#f7fbff'} fontSize={54} fontWeight={800}/>
      <Layout layout direction={'row'} gap={60} alignItems={'center'}>
        <Rect>{box('App / VM', '#10213a')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#ff6b7a'} lineWidth={6} endArrow/>
        <Rect ref={secret}>{box('Stored Secret', '#3a1b27')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#ff6b7a'} lineWidth={6} endArrow/>
        <Rect>{box('Cloud Resource', '#10213a')}</Rect>
      </Layout>
      <Layout layout direction={'row'} gap={60} alignItems={'center'}>
        <Rect>{box('Azure Workload', '#10213a')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={identity}>{box('Managed Identity', '#142b4d')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={vault}>{box('Key Vault / API', '#10213a')}</Rect>
      </Layout>
    </Layout>
  );

  yield* waitFor(0.8);
  yield* title().text('Problem: applications need credentials to reach other services',0.8);
  yield* secret().scale(1.15,0.5);
  yield* waitFor(0.8);
  yield* title().text('Stored credentials leak, expire, and must be rotated',0.8);
  yield* secret().fill('#5b1f2d',0.5);
  yield* waitFor(0.8);
  yield* title().text('Managed Identity lets Azure issue tokens without stored secrets',0.8);
  yield* all(identity().scale(1.18,0.5),identity().fill('#1c4f8f',0.5));
  yield* vault().fill('#0f513d',0.5);
  yield* waitFor(1.2);
});