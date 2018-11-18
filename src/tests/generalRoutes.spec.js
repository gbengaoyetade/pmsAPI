describe('General Route', () => {
  it('should have a root route defined', (done) => {
    request.get('/').end((err, res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Welcome to population management API');
      done();
    });
  });

  it('should send error message when route is not defined', (done) => {
    request.get('/undefined').end((err, res) => {
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Route does not exist');
      done();
    });
  });
});
