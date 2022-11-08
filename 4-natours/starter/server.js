const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// access config env file
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection success! 🤘'))
  .catch(() => console.log('DB connection failed '));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}... 👋`);
});
