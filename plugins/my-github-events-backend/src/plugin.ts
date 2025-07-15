import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { catalogServiceRef } from '@backstage/plugin-catalog-node';
import { createTodoListService } from './services/TodoListService';

/**
 * myGithubEventsPlugin backend plugin
 *
 * @public
 */
export const myGithubEventsPlugin = createBackendPlugin({
  pluginId: 'my-github-events',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        catalog: catalogServiceRef,
      },
      async init({ logger, httpAuth, httpRouter, catalog }) {
        const todoListService = await createTodoListService({
          logger,
          catalog,
        });

        httpRouter.use(
          await createRouter({
            httpAuth,
            todoListService,
          }),
        );
      },
    });
  },
});
