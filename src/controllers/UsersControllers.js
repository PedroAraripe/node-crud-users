const users = require("../in-memory-data/users");
const { User } = require("../models/User");
const { UserLog } = require("../models/UserLog");

const List = (req, res) => {
  res.send(users);
}

const Create = (req, res) => {
  const {
      nome: name,
      empresa: enterprise,
      permissao: permition,
  } = req.body;

  const { callerId } = req.params;

  const user = new User(name, enterprise, permition);
  user.send();

  const userLog = new UserLog(callerId, user.id, 'created');
  userLog.send();

  res.send(user);
}

const Update = (req, res) => {
  const { calledId, callerId } = req.params;

  const {
      nome: name,
      empresa: enterprise,
      permissao: permition,
  } = req.body;

  const user = users.find(usr => usr.id === calledId);
  
  user.nome = name;
  user.empresa = enterprise;
  user.permissao = permition;
  
  const userLog = new UserLog(callerId, calledId, 'updated');
  userLog.send();
  
  res.send(user);
};

const Delete = (req, res) => {
  const { calledId, callerId } = req.params;

  const userIndex = users.findIndex(usr => usr.id === calledId);
  const isValidCalledId = calledId && (userIndex !== -1);

  const isLastUser = userIndex === users.length - 1;

  if(!calledId) {
    res.status(404).send({msg: "Invalid calledId"});

  } else if (!isValidCalledId) {
    res.status(404).send({msg: "User not found"});
    
  }
  else if (!isLastUser && isValidCalledId) {
    for (let currentIndex = 0; currentIndex < users.length; currentIndex++) {
      
      if(currentIndex >= userIndex) {
        users[currentIndex] = users[currentIndex + 1];
      }
    }
    
  }
  
  users.pop();

  const userLog = new UserLog(callerId, calledId, 'deleted');
  userLog.send();

  res.send({msg: "User deleted with success"});
};

module.exports = { 
  List,
  Create,
  Update,
  Delete
};