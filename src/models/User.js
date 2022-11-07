const { v1: uuidv1 } = require('uuid');
const users = require('../in-memory-data/users');
  
class User {
  constructor(name, enterprise, permition) {
    this.id = uuidv1();
    this.name = name;
    this.enterprise = enterprise;
    this.permition = permition;
  }

  send() {
    users.push(this);
  }
}

module.exports = {
  User
};