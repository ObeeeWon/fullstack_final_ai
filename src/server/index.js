const express = require("express");
const cors = require("cors");
const path = require('path'); // Import the path module

const routes = require("./routes");
const server = express();
const port = 3001;

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// Configure static file serving
// const imagesPath = path.join(__dirname, '../images'); // images folder is one level up from the server folder
const imagesPath = 'C:/NSCC/PROG3017 Full Stack React/final-project-ai/images';
console.log("Static images path:", imagesPath); 
server.use('/images', express.static(imagesPath));

server.get('/', (req, res) => { res.send("Hello!") });
server.use('/', routes);

server.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});

//npm install express
//npm install cors
//npm install mysql
//npm install nodemon

//npx nodemon src/server/index.js