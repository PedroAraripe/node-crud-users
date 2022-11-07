const users = require("./users.js");
const usersMutationLogs = users.map(user => `User ${users[0].id} created user ${user.id}`);

module.exports = {
  usersMutationLogs
};