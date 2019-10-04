/* 
    "pagina inicial" do projeto
*/
require("dotenv").config();

const express = require("express");
const app = require("./src");

const server = express();

/* usando as configurações lá do index da pasta src */
server.use(app);

/* definindo a porta de acesso
já deixei o process.env.PORT pq o heroku dá uma porta diferente da 3003
*/

const port = process.env.PORT || 3003;
server.listen(
  port,
  /* "192.168.0.103", */ () => console.log(`ouvindo na porta ${port}...`)
);
