const express = require("express");
const bodyParser = require("body-parser");
const models = require('./models')
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add routes
app.use(routes);

models.sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
    // Start the API server
    app.listen(PORT, function() {
      console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
  })

 
