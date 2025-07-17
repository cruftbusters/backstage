import {
  InfoCard,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';

import {
  useApi,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  monospace: {
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
  },
});

export const MyOpenshiftControllerComponent = () => {
  const classes = useStyles();
  const fetchApi = useApi(fetchApiRef);
  const discoveryApi = useApi(discoveryApiRef);

  const { value, loading, error } = useAsync(async () => {
    const baseUrl = await discoveryApi.getBaseUrl('catalog');
    const response = await fetchApi.fetch(`${baseUrl}/my-openshift-components`);

    if (response.status !== 200) {
      const message = `expected status 200 got ${response.status}: ${
        (await response.text()) || 'no body'
      }`;
      throw Error(message);
    }

    return response.json();
  }, [fetchApi, discoveryApi]);

  return (
    <InfoCard title="My OpenShift Controller">
      <p>
        This demo showcases custom reactive Backstage plugins, backends, and
        modules. It could establish a rudimentary
        <a href="https://kubernetes.io/docs/concepts/architecture/controller/">
          {' controller '}
        </a>
        consuming components declared in catalog-info and in turn creating,
        updating, or deleting static websites, kubernetes namespaces, and other
        parts of the stack.
      </p>
      <p>
        This shows the latest value for each components' metadata annotation
        "openshift-namespace":
      </p>
      {loading ? (
        <Progress />
      ) : error ? (
        <ResponseErrorPanel error={error} />
      ) : (
        <p className={classes.monospace}>{JSON.stringify(value, null, 2)}</p>
      )}
    </InfoCard>
  );
};
