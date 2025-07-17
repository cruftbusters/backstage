import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node/alpha';
import { createRouter } from './router';
import { createMyOpenShiftController } from './MyOpenShiftController/createMyOpenShiftController';

export const catalogModuleMyOpenshiftController = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'my-openshift-controller',
  register(reg) {
    reg.registerInit({
      deps: {
        catalog: catalogProcessingExtensionPoint,
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
      },
      async init({ catalog, logger, httpRouter }) {
        const controller = await createMyOpenShiftController({ logger });

        catalog.addProcessor(controller);

        httpRouter.use(
          await createRouter({
            controller,
          }),
        );
      },
    });
  },
});
