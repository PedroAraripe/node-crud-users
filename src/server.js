const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("../documentation/swagger.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const port = 3000;
const baseUrl = `http://localhost:${port}`;

// Route for server documentation 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

// User routes and logs
app.use('/users/:callerId/', require('./controllers/Users'));

app.listen(port, () => console.log(`\nServer running on ${baseUrl}/\nDocs running on ${baseUrl}/api-docs/#/\n`));
