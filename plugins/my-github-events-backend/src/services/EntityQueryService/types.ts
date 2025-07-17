import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';

export interface EntityItem {
  title: string;
  id: string;
  createdBy: string;
  createdAt: string;
}

export interface EntityQueryService {
  queryEntities(
    props: { queryText: string },
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<{ items: EntityItem[] }>;
}
