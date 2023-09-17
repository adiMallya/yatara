const mongoose = require('mongoose');
const express = require('express');
//routes
const { movieRouter } = require('./routes/movie.routes');
const { userRouter } = require('./routes/user.routes');
const { authRouter } = require('./routes/auth.routes');

const { initializeDatabase } = require('./db');
//middlewares
const cors = require('cors');
const helmet = require('helmet');
const { globalErrorHandler } = require('./middlewares/globalErrorHandler.middleware');
const { routeErrorHandler } = require('./middlewares/routeErrorHandler.middleware');

const app = express();
app.use(express.json());

initializeDatabase();

app.use(cors({}));
app.use(helmet())

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/movies', movieRouter);

app.use(globalErrorHandler);
app.use(routeErrorHandler);

const PORT = process.env['PORT'] || 2000;
app.listen(PORT, () => {
  console.log('server started');
});
