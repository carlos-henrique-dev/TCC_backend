/* configuração do acesso ao mongo e outras configs relacionadas ao BD */

const mongoose = require('mongoose');

module.exports = function (app) {
  // Conecta no MongoDB
  mongoose.connect(process.env.MONGO_ATLAS_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  if (app) {
    app.set('mongoose', mongoose);
  }
};

function cleanup() {
  mongoose.connection.close(() => {
    process.exit(0);
  });
}
