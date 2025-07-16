import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const myGithubEventsPlugin = createPlugin({
  id: 'my-github-events',
  routes: {
    root: rootRouteRef,
  },
});

export const MyGithubEventsPage = myGithubEventsPlugin.provide(
  createRoutableExtension({
    name: 'MyGithubEventsPage',
    component: () =>
      import('./components/LandingComponent').then(m => m.LandingComponent),
    mountPoint: rootRouteRef,
  }),
);
