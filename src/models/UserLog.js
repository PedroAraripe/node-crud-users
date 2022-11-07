const { usersMutationLogs } = require("../in-memory-data/usersMutationLogs");

class UserLog {
  constructor(callerId, calledId, mutation) {
    this.msg = `User ${callerId} ${mutation} user ${calledId}`;
    this.callerId = callerId;
    this.calledId = calledId;
  }

  send () {
    usersMutationLogs.push(this.msg)
  }
}

module.exports = {
  UserLog
};