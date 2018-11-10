import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to population management API');
});

const port = process.env.PORT || 8080;
app.listen(port, (error) => {
  if (!error) {
    console.log(`Listening on port ${port}`);
  }
});
