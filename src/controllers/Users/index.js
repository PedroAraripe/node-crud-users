const router = require('express').Router({mergeParams: true});
const controllerUsers = require("./UsersControllers.js");
const controllerUsersMutationLogs = require("./UsersMutationLogs.js");
const { isAdmin } = require("../../middlewares/isAdmin.js");

// Routes for users visualization / manipulation
router.get('/', controllerUsers.List);
router.post('/', isAdmin, controllerUsers.Create);
router.put('/:calledId', controllerUsers.Update); // Obs.: This route was not mentioned to have the admin middleware verification, but i would implement in production
router.delete('/:calledId', isAdmin, controllerUsers.Delete);

// Route for visualization of users manipulation logs
router.get('/logs', isAdmin, controllerUsersMutationLogs.List);

module.exports = router;