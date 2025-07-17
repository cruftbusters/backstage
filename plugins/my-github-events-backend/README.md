# my-github-events

The purpose of this plugin is to demonstrate programmatic reaction to GitHub repository push events in Backstage.

## Installation

This plugin is installed via the `@internal/plugin-my-github-events-backend` package. To install it to your backend package, run the following command:

```bash
# From your root directory
yarn --cwd packages/backend add @internal/plugin-my-github-events-backend
```

Then add the plugin to your backend in `packages/backend/src/index.ts`:

```ts
const backend = createBackend();
// ...
backend.add(import('@internal/plugin-my-github-events-backend'));
```

## Development

This plugin backend can be started in a standalone mode from directly in this
package with `yarn start`. It is a limited setup that is most convenient when
developing the plugin backend itself.

If you want to run the entire project, including the frontend, run `yarn start` from the root directory.

## TODO

- component fragments - `GET /components`
  - returns list of components with non-empty `annotations.openshift`
  - each component has an overlay with most recent matching status
- update queue - `GET /updates`
  - whenever a component's `annotations.openshift` changes, the change is appended to a queue of update items
  - updates have unique ids
  - updates have status `malformed` `waiting` `progressing` `failed` or `success`
  - updates can have an error message
  - updates can be marked `failed` or `success` via `PUT /updates/byId/:update-id/status`
  - queue items can "dequeued" via `GET /updates/take`
    - if a waiting update is available then it is marked `progressing` and returned
    - if no updates are waiting then the response is empty
