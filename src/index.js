const app = require("express")();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");

app.use(bodyParser.json());

require( "./config/mongoose" )( app );

app.use(morgan("dev"));
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
