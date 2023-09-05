import dotenv from 'dotenv';
import express from 'express';
import { Sequelize } from 'sequelize';
import trackRouter from './routes/trackRoute';
import { initTrackModel, Track } from './models/trackModel';
import artistRoute from './routes/artistRoute';
import { initArtistModel, Artist } from './models/artistModel';
dotenv.config();

var port = process.env.PORT
var userName = process.env.DB_USER
var password = process.env.DB_PASSWORD
var dbName = process.env.DB_NAME
const app = express();
var cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Sequelize setup
const sequelize = new Sequelize(dbName, userName, password, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, 
});
initTrackModel(sequelize);
initArtistModel(sequelize);
Track.associate({ Artist })

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

  app.use('/', trackRouter);
  app.use('/', artistRoute);

// Start your Express server
const PORT = port || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});