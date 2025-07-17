# @internal/plugin-catalog-backend-module-my-openshift-controller

The my-openshift-controller backend module for the catalog plugin.

_This plugin was created through the Backstage CLI_

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
