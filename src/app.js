const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersController = require('./controllers/users');
const loginController = require('./controllers/login');
const postsController = require('./controllers/posts');
const poemsController = require('./controllers/poems');
const feelingController = require('./controllers/feelings');
const environmentsController = require('./controllers/environments');
const savedPostsController = require('./controllers/savedPosts');
const logsController = require('./controllers/logs');
const errorHandler = require('./middleware/errorHandler');
const { tokenValidator } = require('./middleware/auth');

require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', loginController);
app.use('/environments', environmentsController);
app.use('/feelings', feelingController);
app.use(tokenValidator);
app.use('/users', usersController);
app.use('/posts', postsController);
app.use('/poems', poemsController);
app.use('/logs', logsController);
app.use('/saved-posts', savedPostsController);
app.use(errorHandler);

module.exports = app;