const dotenv = require('dotenv');
const app = require('./app');

// access config env file
dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}...`);
});
