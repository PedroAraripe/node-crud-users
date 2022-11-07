const { usersMutationLogs } = require("../../in-memory-data/usersMutationLogs");

const List = (req, res) => {
  res.send(usersMutationLogs);
}

module.exports = {
  List
};