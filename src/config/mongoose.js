/* configuração do acesso ao mongo e outras configs relacionadas ao BD */

const config = require("./index");
const mongoose = require("mongoose");

module.exports = function(app) {
  // Conecta no MongoDB
  mongoose.connect(
    /* config.mongoUrl */ "mongodb://localhost:27017/testimage",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  );
  /* mongoose.Promise = global.Promise;

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
  process.on("SIGHUP", cleanup); */

  if (app) {
    app.set("mongoose", mongoose);
  }
};

function cleanup() {
  mongoose.connection.close(function() {
    process.exit(0);
  });
}
