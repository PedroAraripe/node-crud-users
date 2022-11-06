const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

let users = [
  {
    id: 032165,
    nome: "Lucas",
    empresa: "Keller Williams",
    permissao: "ADMIN",
  },
  {
    id: 14564,
    nome: "Aline",
    empresa: "Keller Williams",
    permissao: "USER",
  },
  {
    id: 22314,
    nome: "Bruno",
    empresa: "Keller Williams",
    permissao: "USER",
  },
];
// DEFINA UM MIDDLEWARE QUE VERIFIQUE SE O USUÁRIO QUE ESTÁ ENVIANDO O REQUEST TEM A PERMISSÃO DE ADMINISTRADOR
function isAdmin(req, res, next) {
  let { callerId } = req.params;
  // TODO
}

// ROTAS EXECUTANDO FUNÇÕES CRUD NA ARRAY DE USUÁRIOS, ONDE SOMENTE O ADMINISTRADOR PODE CRIAR OU DELETAR UM USUÁRIO.
// ENVIE A ID DE QUEM ESTÁ ENVIANDO O REQUEST COMO PARÂMETRO NA URL " calledId "
// CRIE AS SEGUINTES ROTAS.

//TODO
// GET /users
// POST /users
// PATCH /users/:id
// DELETE /users/:id

app.listen(3000);
