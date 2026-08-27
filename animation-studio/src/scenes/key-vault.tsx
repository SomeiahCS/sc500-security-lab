import {Layout, Line, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, waitFor} from '@motion-canvas/core';

const box=(label:string, fill:string)=>
  <Rect width={250} height={92} radius={18} fill={fill} stroke={'#29405f'} lineWidth={2}>
    <Txt text={label} fill={'#f7fbff'} fontSize={29} fontWeight={700}/>
  </Rect>;

export default makeScene2D(function* (view) {
  const title=createRef<Txt>();
  const codeSecret=createRef<Rect>();
  const identity=createRef<Rect>();
  const vault=createRef<Rect>();

  view.fill('#07111f');
  view.add(
    <Layout layout direction={'column'} gap={58} alignItems={'center'}>
      <Txt ref={title} text={'Why Azure Key Vault exists'} fill={'#f7fbff'} fontSize={54} fontWeight={800}/>
      <Layout layout direction={'row'} gap={60} alignItems={'center'}>
        <Rect>{box('Application', '#10213a')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#ff6b7a'} lineWidth={6} endArrow/>
        <Rect ref={codeSecret}>{box('Secret in Code', '#3a1b27')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#ff6b7a'} lineWidth={6} endArrow/>
        <Rect>{box('Data / API', '#10213a')}</Rect>
      </Layout>
      <Layout layout direction={'row'} gap={60} alignItems={'center'}>
        <Rect ref={identity}>{box('Managed Identity', '#142b4d')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect ref={vault}>{box('Azure Key Vault', '#142b4d')}</Rect>
        <Line points={[[0,0],[70,0]]} stroke={'#4f8cff'} lineWidth={6} endArrow/>
        <Rect>{box('Secret / Key / Cert', '#0f513d')}</Rect>
      </Layout>
    </Layout>
  );

  yield* waitFor(0.8);
  yield* title().text('Problem: secrets spread across code, files, and pipelines',0.8);
  yield* codeSecret().scale(1.16,0.5);
  yield* waitFor(0.8);
  yield* title().text('A leaked secret can become direct access to critical systems',0.8);
  yield* codeSecret().fill('#5b1f2d',0.5);
  yield* waitFor(0.8);
  yield* title().text('Key Vault centralizes sensitive material behind identity and policy',0.8);
  yield* all(identity().scale(1.1,0.5),vault().scale(1.18,0.5),vault().fill('#1c4f8f',0.5));
  yield* waitFor(1.2);
});