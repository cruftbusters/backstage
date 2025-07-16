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
import { makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles({
  monospace: {
    fontFamily: 'monospace',
  },
});

export const TodoComponent = () => {
  const classes = useStyles();
  const fetchApi = useApi(fetchApiRef);
  const discoveryApi = useApi(discoveryApiRef);
  const [state, setState] = useState({ status: '', text: '' });

  const { value, loading, error } = useAsync(async () => {
    const baseUrl = await discoveryApi.getBaseUrl('my-github-events');
    const response = await fetchApi.fetch(`${baseUrl}/todos`);
    return response.json();
  }, [fetchApi, discoveryApi]);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  async function submitTodo() {
    const baseUrl = await discoveryApi.getBaseUrl('my-github-events');
    const response = await fetchApi.fetch(`${baseUrl}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: state.text,
    });

    if (response.status !== 201) {
      const text = await response.text();
      const payload = JSON.parse(text);
      const message = payload.error.message;

      const cause = Error(
        `expected status to be 201 got ${response.status}: ${text}`,
      );

      setState(state => ({ ...state, status: message }));
      console.error(message, cause);
    } else {
      setState(state => ({ ...state, status: 'todo created' }));
    }
  }

  return (
    <InfoCard title="Todos">
      <div>{state.status}</div>
      <label>
        {' new todo: '}
        <textarea
          onChange={e =>
            setState(state => ({ ...state, text: e.target.value }))
          }
          value={state.text}
        />
      </label>
      <button onClick={() => submitTodo()}>submit todo</button>
      <Typography variant="body1">
        <span className={classes.monospace}>{JSON.stringify(value)}</span>
      </Typography>
    </InfoCard>
  );
};
