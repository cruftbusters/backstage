import { LocationSpec } from '@backstage/plugin-catalog-common';
import { CatalogProcessor } from '@backstage/plugin-catalog-node';

export interface OpenShiftNamespaceWrapper {
  location: LocationSpec;
  text: string;
}

export interface MyOpenShiftController extends CatalogProcessor {
  getComponents(): { items: OpenShiftNamespaceWrapper[] };
}
