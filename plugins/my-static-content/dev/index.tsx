import { createDevApp } from '@backstage/dev-utils';
import { myStaticContentPlugin, MyStaticContentPage } from '../src/plugin';

createDevApp()
  .registerPlugin(myStaticContentPlugin)
  .addPage({
    element: <MyStaticContentPage />,
    title: 'Root Page',
    path: '/my-static-content',
  })
  .render();
