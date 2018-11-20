import {
  emptyDatabase,
  user,
  location,
  generateToken,
  anotherLocation,
} from '../utils';
import db from '../models';

describe('Update Location', () => {
  beforeAll(async () => {
    await emptyDatabase();
    await db.Users.create(user);
    await db.Locations.create(location);
    await db.Locations.create(anotherLocation);
  });
  user.userId = 1;
  const token = generateToken(user);
  it('should send error message when location does not exist', async (done) => {
    request
      .patch('/api/v1/location/5')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Location does not exist');
        done();
      });
  });
  it('should send error when location name already exists', async (done) => {
    request
      .patch('/api/v1/location/2')
      .set('authorization', token)
      .send({ name: location.name })
      .end((err, res) => {
        expect(res.statusCode).toBe(409);
        expect(res.body.error).toBe('Location name already exists');
        done();
      });
  });
  it('should update location when all conditions are satisfied', async (done) => {
    const newLocationDetails = { name: 'New york', totalMale: '500' };
    request
      .patch('/api/v1/location/2')
      .set('authorization', token)
      .send(newLocationDetails)
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Location updated successfully');
        expect(res.body.location.name).toBe(newLocationDetails.name);
        expect(res.body.location.totalMale).toBe(
          Number(newLocationDetails.totalMale),
        );
        done();
      });
  });
});
