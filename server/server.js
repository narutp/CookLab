var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Achievement = require('./api/models/achievementModel'),
  Comment = require('./api/models/commentModel'),
  Dish = require('./api/models/dishModel'),
  Ingredient = require('./api/models/ingredientModel'),
  Post = require('./api/models/postModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cooklabdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/cooklabRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);