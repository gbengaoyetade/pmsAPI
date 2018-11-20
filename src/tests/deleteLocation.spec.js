import {
  user,
  generateToken,
  emptyDatabase,
  location,
  anotherLocation,
  anotherUser,
} from '../utils';
import db from '../models';

const userRoleToken = generateToken(anotherUser);
describe('Delete Location', () => {
  beforeAll(async () => {
    await emptyDatabase();
    await db.Users.create(user);
    await db.Users.create(anotherUser);
    await db.Locations.create(location);
    await db.Locations.create(anotherLocation);
  });

  user.userId = 1;
  const token = generateToken(user);
  it('should send error when location id is not a number', (done) => {
    request
      .delete('/api/v1/location/w')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.error.id).toBe('Expects a numeric value for id');
        done();
      });
  });

  it('should send error when location does not exist', (done) => {
    request
      .delete('/api/v1/location/5')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Location does not exist');
        done();
      });
  });

  it('should send error when user is not an admin', (done) => {
    request
      .delete('/api/v1/location/1')
      .set('authorization', userRoleToken)
      .end((err, res) => {
        expect(res.statusCode).toBe(403);
        expect(res.body.error).toBe(
          'You do not have the permission to perform this action',
        );
        done();
      });
  });

  it('should delete location when all conditions are satisfied', async (done) => {
    request
      .delete('/api/v1/location/2')
      .set('authorization', token)
      .end(async (err, res) => {
        const deletedLocation = await db.Locations.findByPk(2);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Location deleted successfully');
        expect(deletedLocation).toBeFalsy();
        done();
      });
  });
});
