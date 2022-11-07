const { 
  v1: uuidv1,
} = require('uuid');

module.exports = [
  {
    id: uuidv1(),
    nome: "Lucas",
    empresa: "Keller Williams",
    permissao: "ADMIN",
  },
  {
    id: uuidv1(),
    nome: "Aline",
    empresa: "Keller Williams",
    permissao: "USER",
  },
  {
    id: uuidv1(),
    nome: "Bruno",
    empresa: "Keller Williams",
    permissao: "USER",
  },
]