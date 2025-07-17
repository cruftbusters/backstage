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
import { useState } from 'react';

const useStyles = makeStyles({
  monospace: {
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
  },
});

export const EntityQueryComponent = () => {
  const classes = useStyles();
  const fetchApi = useApi(fetchApiRef);
  const discoveryApi = useApi(discoveryApiRef);
  const [state, setState] = useState({ status: '', text: '' });

  const { value, loading, error } = useAsync(async () => {
    const baseUrl = await discoveryApi.getBaseUrl('my-github-events');
    const response = await fetchApi.fetch(
      `${baseUrl}/entities?` +
        new URLSearchParams({ queryText: state.text }).toString(),
    );

    if (response.status !== 200) {
      const message = `expected status 200 got ${response.status}: ${
        (await response.text()) || 'no body'
      }`;
      setState(state => ({ ...state, status: message }));
      return;
    }

    setState(state => ({ ...state, status: 'got results' }));

    return response.json();
  }, [state.text, fetchApi, discoveryApi]);

  return (
    <InfoCard title="Entities">
      <label>
        {' query: '}
        <input
          onChange={e =>
            setState(state => ({ ...state, text: e.target.value }))
          }
          value={state.text}
        />
      </label>
      {loading ? (
        <Progress />
      ) : error ? (
        <ResponseErrorPanel error={error} />
      ) : (
        <div>{state.status}</div>
      )}
      <p className={classes.monospace}>{JSON.stringify(value, null, 2)}</p>
    </InfoCard>
  );
};
