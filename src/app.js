import express from 'express';
import routes from './routes';

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to population management API');
});

app.use('/api/v1', routes);
const port = process.env.PORT || 8080;
app.listen(port, (error) => {
  if (!error) {
    console.log(`Listening on port ${port}`);
  }
});
