/* 
    "pagina inicial" do projeto
*/
const express = require("express");
const app = require("./src");

const server = express();

/* usando as configurações lá do index da pasta src */
server.use(app);

/* definindo a porta de acesso
já deixei o process.env.PORT pq o heroku dá uma porta diferente da 3003
*/
const port = process.env.PORT || 3003;

server.listen(port, '192.168.2.39', () => console.log(`ouvindo na porta ${port}...`));
