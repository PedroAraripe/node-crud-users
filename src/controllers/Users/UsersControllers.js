const users = require("../../in-memory-data/users");
const { User } = require("../../models/User");
const { UserLog } = require("../../models/UserLog");

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
  user.create();

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

  const userToUpdate = new User(name, enterprise, permition);
  const user = userToUpdate.find(calledId);

  if(!user) {
    return res.status(404).send({error: "User not found"});
  }

  userToUpdate.update(calledId);
    
  const userLog = new UserLog(callerId, calledId, 'updated');
  userLog.send();
  
  res.send(user);
};

const Delete = (req, res) => {
  const { calledId, callerId } = req.params;

  const userIndex = users.findIndex(usr => usr.id === calledId);
  const isValidCalledId = calledId && (userIndex !== -1);

  if(!calledId || !isValidCalledId) {
    return res.status(404).send({error: "User not found"});

  } else if (isValidCalledId) {
    const userToDelete = new User();

    userToDelete.delete(calledId)
  }

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