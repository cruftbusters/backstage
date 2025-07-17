import { HttpAuthService } from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';

export async function createRouter({
  httpAuth,
}: {
  httpAuth: HttpAuthService;
}): Promise<express.Router> {
  const router = Router();

  router.get('/my-openshift-components', async (request, response) => {
    response.json({ message: 'hello world' });
  });

  return router;
}
