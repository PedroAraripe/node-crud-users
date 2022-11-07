const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("../documentation/swagger.json");

const controllerUsers = require("./controllers/UsersControllers");
const controllerUsersMutationLogs = require("./controllers/UsersMutationLogs");
const { isAdmin } = require("./middlewares/isAdmin");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const port = 3000;
const baseUrl = `http://localhost:${port}`;

// Route for server documentation 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

// Routes for users visualization / manipulation
app.get('/users/:callerId', controllerUsers.List);
app.post('/users/:callerId', isAdmin, controllerUsers.Create);
// This route was not mentioned to have the admin middleware verification, but i would implement in production
app.put('/users/:callerId/:calledId', controllerUsers.Update);
app.delete('/users/:callerId/:calledId', isAdmin, controllerUsers.Delete);

// Route for visualization of users manipulation logs
app.get('/users/:callerId/logs', isAdmin, controllerUsersMutationLogs.List);

app.listen(port, () => console.log(`\nServer running on ${baseUrl}/\nDocs running on ${baseUrl}/api-docs/#/\n`));
