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
app.use('/api/v1/restaurants', restaurants);

//Error handling
app.use(errorHandler);

const PORT = process.env['PORT'] || 2000;

app.listen(PORT, () => {
  console.log('server started');
});
