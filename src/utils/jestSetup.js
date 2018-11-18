import supertest from 'supertest';
import app from '../app';
import db from '../models';
import { emptyDatabase } from '.';

global.request = supertest(app);
beforeAll(async () => {
  await emptyDatabase();
});

afterAll(async () => {
  await emptyDatabase();
  await db.sequelize.close();
});
