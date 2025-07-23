import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const myStaticContentPlugin = createPlugin({
  id: 'my-static-content',
  routes: {
    root: rootRouteRef,
  },
});

export const MyStaticContentPage = myStaticContentPlugin.provide(
  createRoutableExtension({
    name: 'MyStaticContentPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
