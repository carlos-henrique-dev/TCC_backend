const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

// Conecta no MongoDB
mongoose.connect(
  "mongodb+srv://admin:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0-jqsht.mongodb.net/test?retryWrites=true&w=majority"
);

// Carrega o model de Usuário
require("./database/models/user");

app.use(bodyParser.json());

app.use("/user", userRoutes);

/*  tratando caminho inexistente */
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

/* tratando erros internos */
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: "Sorry, but we had an internal error: " + error.message
    }
  });
});

module.exports = app;
