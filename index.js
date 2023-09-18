const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDatabase = require('./config/db');

//Connect to Db
connectDatabase();

//Routes

const app = express();
//Body Parser
app.use(express.json());

//Middlewares
app.use(cors({}));
app.use(helmet())

//Mount routers
app.get("/", (req, res) => {
  res.send("<h2>Welcome to Zwigato</h2>")
})

const PORT = process.env['PORT'] || 2000;

app.listen(PORT, () => {
  console.log('server started');
});
