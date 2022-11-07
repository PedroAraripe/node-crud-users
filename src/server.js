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
const apiDocumentationUrl = `${baseUrl}/api-docs/#/`;

// Route for server documentation 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

// User routes and logs
app.use('/users/:callerId/', require('./controllers/Users'));

app.use((req, res, next) => {
  res.status(404).json({
    error: `Ohh you are lost, read the API documentation at ${apiDocumentationUrl} to find your way back home`
  })
})

const serverUpCB = () => {
  const logBaseUrl = `Server running on ${baseUrl}/`;
  const logDocumentationUrl = `Docs running on ${apiDocumentationUrl}`;

  console.log(`\n${logBaseUrl}\n${logDocumentationUrl}\n`);
}

app.listen(port, serverUpCB);
