import { LoggerService } from '@backstage/backend-plugin-api';
import { catalogServiceRef } from '@backstage/plugin-catalog-node';
import { EntityItem, EntityQueryService } from './types';

export async function createEntityQueryService({
  logger,
  catalog,
}: {
  logger: LoggerService;
  catalog: typeof catalogServiceRef.T;
}): Promise<EntityQueryService> {
  logger.info('Initializing EntityQueryService');

  return {
    async queryEntities({ queryText }, options) {
      const entities = await catalog.getEntities(
        queryText ? { filter: { 'metadata.name': queryText } } : {},
        options,
      );

      return entities as unknown as { items: EntityItem[] };
    },
  };
}
