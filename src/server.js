const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("../documentation/swagger.json");

const { v1: uuidv1 } = require('uuid');

const users = require("./MemoryData/users");
const usersMutationLogs = require("./MemoryData/userMutationLogs.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const port = 3000;
const baseUrl = `http://localhost:${port}`;

class User {
  constructor(name, enterprise, permition) {
    this.id = uuidv1();
    this.name = name;
    this.enterprise = enterprise;
    this.permition = permition;
  }
}

const userLog = (mutation, callerId, id) => `User ${callerId} ${mutation} user ${id}`;

const isAdmin = (req, res, next) => {
  const { callerId } = req.params;

  console.log(callerId)
  
  const userCaller = users.find(user => user.id === callerId);

  if((!userCaller || userCaller.permissao.toUpperCase() !== "ADMIN")) {
    res.status(400).send({msg: "Unauthorized"});
    
  } else {
    next();
    
  }
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

app.get('/users/:callerId', (req, res) => {
  res.send(users);
});

app.post('/users/:callerId', isAdmin, (req, res) => {
  const {
      nome: name,
      empresa: enterprise,
      permissao: permition,
  } = req.body;

  const { callerId } = req.params;

  const user = new User(name, enterprise, permition);
  users.push(user);

  usersMutationLogs.push(userLog('created', callerId, user.id));
  
  res.send(user);
});

app.get('/users/:callerId/logs', isAdmin, (req, res) => {
  res.send(usersMutationLogs);
});

app.put('/users/:callerId/:calledId', (req, res) => {
  const { calledId, callerId } = req.params;

  const {
      nome: name,
      empresa: enterprise,
      permissao: permition,
  } = req.body;


  const userIndex = users.findIndex(usr => usr.id === calledId);
  const user = users[userIndex];

  
  user.nome = name;
  user.empresa = enterprise;
  user.permissao = permition;
  
  usersMutationLogs.push(userLog('updated', callerId, user.id));

  res.send(user);
});

app.delete('/users/:callerId/:calledId', isAdmin, (req, res) => {
  const { calledId, callerId } = req.params;

  const userIndex = users.findIndex(usr => usr.id === calledId);
  const isValidCalledId = calledId && (userIndex !== -1);
  const user = users[userIndex];

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
  
  const deletedUser = user;
  users.pop();
  
  usersMutationLogs.push(userLog('deleted', callerId, deletedUser.id));
  
  res.send({msg: "User deleted with success"});
});

app.listen(port, () => console.log(`\nServer running on ${baseUrl}/\nDocs running on ${baseUrl}/api-docs/#/\n`));
