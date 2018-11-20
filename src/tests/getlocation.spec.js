import {
  user, generateToken, emptyDatabase, seedDatabase,
} from '../utils';
import db from '../models';

describe('Location', () => {
  beforeAll(async () => {
    await seedDatabase();
  });

  afterAll(async () => {
    await emptyDatabase();
  });

  describe('Get All Locations', () => {
    user.userId = 1;
    const token = generateToken(user);
    it('should send error when limit or offset is not a number', (done) => {
      request.get('/api/v1/locations?limit=a&offset=o').end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.error.limit).toBe('limit has to be a number');
        expect(res.body.error.offset).toBe('offset has to be a number');
        done();
      });
    });

    it('should return locations not greater than limit set', async (done) => {
      await db.Locations.create({
        name: 'Chicago',
        totalFemale: '100',
        totalMale: '400',
        total: '500',
        createdBy: 1,
        updatedBy: 1,
      });
      request
        .get('/api/v1/locations?limit=1')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.locations.length).toBe(1);
          done();
        });
    });

    it('should send error when no locations are found', async (done) => {
      await db.Locations.destroy({ truncate: true, restartIdentity: true });
      request
        .get('/api/v1/locations')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body.error).toBe('No locations found');
          done();
        });
    });
  });
});
