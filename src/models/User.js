const { v1: uuidv1 } = require('uuid');
  
class User {
  constructor(name, enterprise, permition) {
    this.id = uuidv1();
    this.name = name;
    this.enterprise = enterprise;
    this.permition = permition;
  }
}

module.exports = {
  User
};