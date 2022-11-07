const { User } = require("../models/user");

const isAdmin = (req, res, next) => {
  const { callerId } = req.params;

  const userInstance = new User();
  const userCaller = userInstance.find(callerId);

  if((!userCaller || userCaller.permissao.toUpperCase() !== "ADMIN")) {
    res.status(400).send({error: "Unauthorized"});

  } else {
    next();

  }
}

module.exports = { 
  isAdmin
};