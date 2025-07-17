import { LoggerService } from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
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
      const entity = await catalog.getEntityByRef(queryText, options);

      if (!entity) {
        throw new NotFoundError(`No entity found for ref '${queryText}'`);
      }

      return {
        items: [entity as unknown as EntityItem],
        queryText,
      };
    },
  };
}
