import {
  user, generateToken, emptyDatabase, seedDatabase,
} from '../utils';
import db from '../models';

describe('Location', () => {
  beforeAll((done) => {
    seedDatabase();
    done();
  });

  afterAll((done) => {
    emptyDatabase();
    done();
  });
  describe('Create location', () => {
    user.userId = 1;
    const token = generateToken(user);
    const location = { name: 'Maryland', totalFemale: '27', totalMale: '31' };
    it('should send error when required fields are missing', (done) => {
      request
        .post('/api/v1/location')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.name).toBe('name field is required');
          expect(res.body.error.totalFemale).toBe(
            'totalFemale field is required',
          );
          expect(res.body.error.totalMale).toBe('totalMale field is required');
          done();
        });
    });

    it('should send error when name is not properly formed', (done) => {
      request
        .post('/api/v1/location')
        .send({ name: '12345' })
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.name).toBe('Name not properly formed');
          done();
        });
    });

    it('should send error when totalFemale or totalMale is not a number', (done) => {
      request
        .post('/api/v1/location')
        .send({ totalFemale: 'one hundred thousand' })
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.totalFemale).toBe('Expects a numeric value');
          done();
        });
    });

    it('should send error message when parentId is provided but not a number', (done) => {
      request
        .post('/api/v1/location')
        .send({ parentId: 'xyz' })
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.parentId).toBe('Expects a numeric value');
          done();
        });
    });

    it('should send error when parent location is provided but does not exist', (done) => {
      location.parentId = '100';
      request
        .post('/api/v1/location')
        .set('authorization', token)
        .send(location)
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body.error).toBe('Invalid parentId supplied');
          done();
        });
    });

    it('should create location when payload is properly structured', (done) => {
      delete location.parentId;
      request
        .post('/api/v1/location')
        .set('authorization', token)
        .send(location)
        .end((err, res) => {
          expect(res.statusCode).toBe(201);
          expect(res.body.message).toBe('Location created');
          expect(res.body.location.name).toBe(location.name);
          expect(res.body.location.totalFemale).toBe(
            Number(location.totalFemale),
          );
          expect(res.body.location.totalMale).toBe(Number(location.totalMale));
          done();
        });
    });

    it('should update immediate parent location when parentId is supplied', async (done) => {
      const newLocation = {
        name: 'Mende',
        totalFemale: '12',
        totalMale: '10',
        parentId: '1',
      };
      request
        .post('/api/v1/location')
        .set('authorization', token)
        .send(newLocation)
        .end(async (err, res) => {
          const updatedParentLocation = await db.Locations.findByPk(1);
          expect(res.statusCode).toBe(201);
          expect(res.body.location.name).toBe(newLocation.name);
          expect(updatedParentLocation.total).toBe(
            Number(newLocation.totalFemale)
              + Number(newLocation.totalMale)
              + Number(location.totalFemale)
              + Number(location.totalMale),
          );
          done();
        });
    });

    it('should send error message when location name already exists', (done) => {
      request
        .post('/api/v1/location')
        .set('authorization', token)
        .send(location)
        .end(async (err, res) => {
          expect(res.statusCode).toBe(409);
          expect(res.body.error).toBe('Location name already exists');
          done();
        });
    });
  });
});
