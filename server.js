require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const path = require('path');

const http = require('http').createServer(app);
const socketio = require('socket.io')(http);

const userRoutes = require('./src/routes/userRoutes');
const issuesRoutes = require('./src/routes/issuesRoutes')(socketio);
const categoryRoutes = require('./src/routes/categoryRoutes');
const reportsRoutes = require('./src/routes/reportsRoutes');

app.use(bodyParser.json());

require('./src/config/mongoose')(app);

app.use(morgan('dev'));

/* serve para liberar o acesso às fotos salvas localmente no ambiente de dev */
app.use('/files', express.static(path.resolve(__dirname, 'tmp', 'uploads')));

app.use('/user', userRoutes);
app.use('/issues', issuesRoutes);
app.use('/category', categoryRoutes);
app.use('/reports', reportsRoutes);

/*  tratando caminho inexistente */
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

/* tratando erros internos */
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: `Sorry, but we had an internal error: ${error.message}`,
    },
  });
});

socketio.on('connection', (socket) => {
  socket.on('disconnect', () => console.log(`usuário ${socket.id} desconectou`));
});

const port = process.env.PORT || 3003;
http.listen(port, () => console.log(`ouvindo na porta ${port}...`));
