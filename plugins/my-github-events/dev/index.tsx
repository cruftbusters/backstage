import { createDevApp } from '@backstage/dev-utils';
import { myGithubEventsPlugin, MyGithubEventsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(myGithubEventsPlugin)
  .addPage({
    element: <MyGithubEventsPage />,
    title: 'Root Page',
    path: '/my-github-events',
  })
  .render();
