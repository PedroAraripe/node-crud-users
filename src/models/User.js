const { v1: uuidv1 } = require('uuid');
const users = require('../in-memory-data/users');
  
class User {
  constructor(name="", enterprise="", permition="USER") {
    this.name = name;
    this.enterprise = enterprise;
    this.permition = permition;
  }

  find(id) {
    return users.find(usr => usr.id === id);
  }

  update(id) {
    const userToUpdate = this.find(id);

    userToUpdate.nome = this.name;
    userToUpdate.empresa = this.enterprise;
    userToUpdate.permissao = this.permition;
  }

  create() {
    this.id = uuidv1();

    users.push(this);
  }

  delete(id) {
    const userIndex = users.findIndex(usr => usr.id === id);

    if(userIndex !== users.length -1) {
      for (let currentIndex = 0; currentIndex < users.length; currentIndex++) {
        if(currentIndex >= userIndex) {
          users[currentIndex] = users[currentIndex + 1];
        }
      }
    }

    users.pop();
  }
}

module.exports = {
  User
};