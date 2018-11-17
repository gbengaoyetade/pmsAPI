import express from 'express';
import routes from './routes';

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to population management API');
});

app.use('/api/v1', routes);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Route does not exist' });
});

const port = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(port, (error) => {
    if (!error) {
      console.log(`Listening on port ${port}`);
    }
  });
}

export default app;
