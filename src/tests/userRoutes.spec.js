import { emptyDatabase, user, seedDatabase } from '../utils';

const anotherUser = { email: 'test@web.com', password: 'user-password' };
describe('Users', () => {
  beforeAll(async () => {
    await seedDatabase();
  });

  afterAll(async () => {
    await emptyDatabase();
  });

  describe('Create User', () => {
    it('should send error message when input fields are missing', (done) => {
      request
        .post('/api/v1/user')
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
        .post('/api/v1/user')
        .send({ email: '@nothing', password: '       ' })
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.password).toBe(
            'Password length cannot be less than 6 characters',
          );
          expect(res.body.error.email).toBe('Expect an email address');
          done();
        });
    });

    it('should create user when details are properly formed', (done) => {
      request
        .post('/api/v1/user')
        .send(anotherUser)
        .end((err, res) => {
          expect(res.statusCode).toBe(201);
          expect(res.body.message).toBe('User created successfully');
          expect(res.body.user.email).toBe(anotherUser.email);
          done();
        });
    });

    it('should send error message when user is already created', (done) => {
      request
        .post('/api/v1/user')
        .send(anotherUser)
        .end((err, res) => {
          expect(res.statusCode).toBe(409);
          expect(res.body.error).toBe('Email address already in use');
          done();
        });
    });
  });

  describe('User Login', () => {
    it('should send error message when required fields are empty', (done) => {
      request
        .post('/api/v1/user/login')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.email).toBe('Requires email field');
          expect(res.body.error.password).toBe('Requires password field');
          done();
        });
    });

    it('should send error message when email is incorrect', (done) => {
      request
        .post('/api/v1/user/login')
        .send({ email: 'wrong@mail.com', password: user.password })
        .end((err, res) => {
          expect(res.statusCode).toBe(401);
          expect(res.body.error).toBe('Incorrect email address supplied');
          done();
        });
    });

    it('should send error message when password is incorrect', (done) => {
      request
        .post('/api/v1/user/login')
        .send({ email: anotherUser.email, password: 'password' })
        .end((err, res) => {
          expect(res.statusCode).toBe(401);
          expect(res.body.error).toBe('Incorrect password supplied');
          done();
        });
    });

    it('should send token when login is successful', (done) => {
      request
        .post('/api/v1/user/login')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe('Login successful');
          expect(res.body.token).toBeDefined();
          done();
        });
    });
  });
});
