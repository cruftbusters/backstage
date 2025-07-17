import { LoggerService } from '@backstage/backend-plugin-api';
import { MyOpenShiftController, OpenShiftNamespaceWrapper } from './types';

export async function createMyOpenShiftController({
  logger,
}: {
  logger: LoggerService;
}): Promise<MyOpenShiftController> {
  logger.info('Initializing MyOpenShiftController');

  const components: Map<string, OpenShiftNamespaceWrapper> = new Map();

  return {
    getComponents() {
      return { items: Array.from(components.values()) };
    },

    getProcessorName() {
      return 'my openshift controller';
    },

    async readLocation(location, optional, emit, parser, cache) {
      return false;
    },

    async preProcessEntity(entity, location, emit, originLocation, cache) {
      if (!entity.metadata.annotations) {
        return entity;
      }

      const text = entity.metadata.annotations['openshift-namespace'];

      if (text) {
        components.set(location.target, { location, text });
      }

      return entity;
    },

    async validateEntityKind(entity) {
      return false;
    },

    async postProcessEntity(entity, location, emit, cache) {
      return entity;
    },
  };
}
