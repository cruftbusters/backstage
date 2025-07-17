import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';

export const catalogModuleMyOpenshiftController = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'my-openshift-controller',
  register(reg) {
    reg.registerInit({
      deps: {
        logger: coreServices.logger,
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
      },
      async init({ logger, httpAuth, httpRouter }) {
        logger.info('Hello World!');

        httpRouter.use(
          await createRouter({
            httpAuth,
          }),
        );
      },
    });
  },
});
