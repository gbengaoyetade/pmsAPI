import supertest from 'supertest';
import app from '../app';
import db from '../models';

global.request = supertest(app);
afterAll(() => db.sequelize.close());
