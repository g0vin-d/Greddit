const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION 💥 shutting down......');
  console.log(err.name, err.message);
  process.exit(1);
});
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('Connection to the Atlas Cluster is successful'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// to handler errors like mongoDB, auth errors
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥 shutting down......');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
