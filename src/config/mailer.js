const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
  /* host: 'smtp.mailtrap.io',
  port: 2525, */
  service: 'gmail',
  auth: {
    user: 'msalertatcc@gmail.com',
    pass: 'msalerta',
  },
  /* auth: {
    user: 'ca58e608494eba',
    pass: '3ab597afc30475',
  }, */
});

transport.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve('./src/config/resources/mail'),
      layoutsDir: path.resolve('./src/config/resources/mail'),
      defaultLayout: path.resolve('./src/config/resources/mail/auth/forgot.html'),
    },
    viewPath: path.resolve('./src/config/resources/mail'),
    extName: '.html',
  }),
);

module.exports = transport;
