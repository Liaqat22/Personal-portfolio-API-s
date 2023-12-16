// Import packages
const express = require("express");
const projectController = require("./route/project/projectController");
const servicesController = require("./route/services/servicesController");
const contactController = require("./route/contacts/contactController");

const connectDB = require('./db.js');
const cors  = require("cors")

connectDB()

// Middlewares
const app = express();
app.use(express.json());
 app.use(cors())

// Routes
app.use("/api/v1/project", projectController);
app.use("/api/v1/services", servicesController);     
app.use("/api/v1/contacts", contactController);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));