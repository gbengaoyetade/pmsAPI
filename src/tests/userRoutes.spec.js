import { emptyDatabase } from '../utils';

describe('Users', () => {
  beforeAll(async () => {
    await emptyDatabase();
  });
  describe('Create User', () => {
    const user = { email: 'test@web.com', password: 'user-password' };
    it('should send error message when input fields are missing', (done) => {
      request
        .post('/api/v1/users')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.password).toBe('password field is required');
          expect(res.body.error.email).toBe('email field is required');
          done();
        });
    });

    it('should send error message when input are not properly formed', (done) => {
      request
        .post('/api/v1/users')
        .send({ email: '@nothing', password: '       ' })
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.password).toBe('Password length cannot be less than 6 characters');
          expect(res.body.error.email).toBe('Expect an email address');
          done();
        });
    });

    it('should create user when details are properly formed', (done) => {
      request
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).toBe(201);
          expect(res.body.message).toBe('User created successfully');
          expect(res.body.user.email).toBe(user.email);
          done();
        });
    });

    it('should send error message when user is already created', (done) => {
      request
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).toBe(409);
          expect(res.body.error).toBe('Email address already in use');
          done();
        });
    });
  });
});
