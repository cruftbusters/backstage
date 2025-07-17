import express from 'express';
import Router from 'express-promise-router';
import { MyOpenShiftController } from './MyOpenShiftController/types';

export async function createRouter({
  controller,
}: {
  controller: MyOpenShiftController;
}): Promise<express.Router> {
  const router = Router();

  router.get('/my-openshift-components', async (request, response) => {
    response.json(controller.getComponents());
  });

  return router;
}
