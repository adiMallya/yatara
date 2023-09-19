const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./middlewares/logger.middleware');
const connectDatabase = require('./config/db');
const errorHandler = require('./middlewares/error.middleware');

//Connect to Db
connectDatabase();

//Routes
const restaurants = require('./routes/restaurant.routes');
  
const app = express();
//Body Parser
app.use(express.json());

//Middlewares
if (process.env['ENV'] === 'development') {
  app.use(logger);
}

app.use(cors({}));
app.use(helmet())

//Mount routers
app.get('/', (req, res) => {
  res.send('<h1>Welcome to RestoRev API</h1>')
});
app.use('/api/v1/restaurants', restaurants);

//Error handling
app.use(errorHandler);

const PORT = process.env['PORT'] || 2000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env['ENV']} mode
    on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error : ${err.message}`);

  server.close(() => process.exit(1));
})