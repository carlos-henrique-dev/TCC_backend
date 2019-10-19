module.exports = {
  /* host: "127.0.0.1",
    port: 1234, // change with development port */
  mongoUrl: `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@cluster0-jqsht.mongodb.net/test?retryWrites=true&w=majority`,
  /* logLevel: "debug", // can be chenged to error, warning, info, verbose or silly
    secret: "superSuperSecret", */
};
