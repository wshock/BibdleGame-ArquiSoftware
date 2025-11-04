// Entry point of my API:

// Importing all the dependencies I need:

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routesIndex from "./routes/index.js";

 
// Initializing
const app = express();

// Settings
app.set("port", 4001);

// Middlewares
app.use(express.json())
app.use(morgan("dev"));
app.use(cors());


// Routes: 
app.use(routesIndex);


// Initialize server:

app.listen(app.get("port"));
console.log("Server initialized in port: "+ app.get("port"));
