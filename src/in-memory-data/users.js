const { 
  v1: uuidv1,
} = require('uuid');

module.exports = [
  {
    id: uuidv1(),
    nome: "Lucas",
    empresa: "KW",
    permissao: "ADMIN",
  },
  {
    id: uuidv1(),
    nome: "Aline",
    empresa: "KW",
    permissao: "USER",
  },
  {
    id: uuidv1(),
    nome: "Bruno",
    empresa: "KW",
    permissao: "USER",
  },
]