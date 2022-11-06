# Validation-Middleware

<!-- <img src="./assets-project-usability/node-docker-template.png" alt="exemplo imagem do projeto"> -->

## 💻 Project requirements

Make sure that npm and node are running and up to date. 

## 🚀 Running project for the first time

Open the folder of the project and run in the command prompt:

```sh
npm i && npm start
```

This sould appears on your terminal:

```sh
Server running on http://localhost:3000/
Docs running on http://localhost:3000/api-docs/#/
```

With the server running, check the routes documentation with examples included on [here](http://localhost:3000/api-docs/#/)

## ☕ Usando node-docker-template

Para usar node-docker-template, siga estas etapas:

```
Running the node server:
docker run -p <external port to api>:<private port to api> -d <your username>/node-docker-template

Stopping and deleting server:
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
```