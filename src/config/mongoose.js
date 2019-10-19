/* configuração do acesso ao mongo e outras configs relacionadas ao BD */

const mongoose = require('mongoose');
const config = require('./index');

module.exports = function (app) {
  // Conecta no MongoDB
  mongoose.connect(/* config.mongoUrl */ 'mongodb://localhost:27017/TCCdatabase', {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  /* mongoose.Promise = global.Promise;

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
  process.on("SIGHUP", cleanup); */

  if (app) {
    app.set('mongoose', mongoose);
  }
};

function cleanup() {
  mongoose.connection.close(() => {
    process.exit(0);
  });
}
