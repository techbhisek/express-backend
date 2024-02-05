const { sequelize, Data, Project } = require('./models');
const project = require('./Routes/project.routes');
const label = require('./Routes/label.routes');
const task = require('./Routes/task.routes');
const comment = require('./Routes/comment.routes');
const user = require('./Routes/user.routes');
const dotenv = require('dotenv');
const expressWinston = require('express-winston');
const cors = require('cors');
const logger = require('./logger');
const express = require('express');
const app = express();
dotenv.config();

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/', project);
app.use('/', label);
app.use('/', task);
app.use('/', comment);
app.use('/', user);

app.listen({ port: process.env.PORT }, async () => {
  await sequelize.sync();
});
