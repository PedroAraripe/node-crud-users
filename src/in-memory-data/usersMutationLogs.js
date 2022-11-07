const users = require("./users.js");

const usersMutationLogs = [
  `User 1 created user ${users[0].id}`,
  `User 1 created user ${users[1].id}`,
  `User 1 created user ${users[2].id}`
];

module.exports = {
  usersMutationLogs
};