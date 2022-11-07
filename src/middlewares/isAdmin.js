const users = require("../in-memory-data/users");

const isAdmin = (req, res, next) => {
  const { callerId } = req.params;
  const userCaller = users.find(user => user.id === callerId);

  if((!userCaller || userCaller.permissao.toUpperCase() !== "ADMIN")) {
    res.status(400).send({error: "Unauthorized"});
    
  } else {
    next();
    
  }
}

module.exports = { 
  isAdmin
};