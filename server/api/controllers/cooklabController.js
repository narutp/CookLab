'use strict';

var mongoose = require('mongoose'),
  AchievementModel = mongoose.model('Achievements'),
  CommentModel = mongoose.model('Comments'),
  DishModel = mongoose.model('Dishes'),
  IngredientModel = mongoose.model('Ingredients'),
  PostModel = mongoose.model('Posts'),
  UserModel = mongoose.model('Users');

exports.list_all_achievements = function(req, res) {
  AchievementModel.find({}, function(err, achievement) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(achievement);
    }
  });
};

exports.list_all_comments = function(req, res) {
  CommentModel.find({}, function(err, comment) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(comment);
    }
  });
};

exports.list_all_dishes = function(req, res) {
  DishModel.find({}, function(err, dish) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(dish);
    }
  });
};

exports.list_all_ingredients = function(req, res) {
  IngredientModel.find({}, function(err, ingredient) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(ingredient);
    }
  });
};

exports.list_all_posts = function(req, res) {
  PostModel.find({}, function(err, post) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(post);
    }
  });
};

exports.list_all_users = function(req, res) {
  UserModel.find({}, function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(user);
    }
  });
};

exports.create_new_achievement = function(req, res) {
  var new_achievement = new AchievementModel(req.body);
  new_achievement.save(function(err, achievement) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(achievement);
    }
  });
};

exports.create_new_comment = function(req, res) {
  var new_comment = new CommentModel(req.body);
  new_comment.save(function(err, comment) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(comment);
    }
  });
};

exports.create_new_dish = function(req, res) {
  var new_dish = new DishModel(req.body);
  new_dish.save(function(err, dish) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(dish);
    }
  });
};

exports.create_new_ingredient = function(req, res) {
  var new_ingredient = new IngredientModel(req.body);
  new_ingredient.save(function(err, ingredient) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(ingredient);
    }
  });
};

exports.create_new_post = function(req, res) {
  var new_post = new PostModel(req.body);
  new_post.save(function(err, post) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(post);
    }
  });
};

exports.create_new_user = function(req, res) {
  var new_user = new UserModel(req.body);
  new_user.save(function(err, user) {
    console.log(err)
    if (err) {
      res.send(err);
    }
    else {
      res.json(user);
    }
  });
};

// exports.upload_image = function(req, res) {
//   var image = new IngredientModel(req.body);
//   new_ingredient.save(function(err, ingredient) {
//     if (err) {
//       res.send(err);
//     }
//     else {
//       res.json(ingredient);
//     }
//   });
// };

exports.get_achievement = function(req, res) {
  AchievementModel.findById(req.params.achievementId, function(err, achievement) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(achievement);
    }
  });
};

exports.get_comment = function(req, res) {
  CommentModel.findById(req.params.commentId, function(err, comment) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(comment);
    }
  });
};

exports.get_dish = function(req, res) {
  DishModel.findById(req.params.dishId, function(err, dish) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(dish);
    }
  });
};

exports.get_ingredient = function(req, res) {
  IngredientModel.findById(req.params.ingredientId, function(err, ingredient) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(ingredient);
    }
  });
};

exports.get_post = function(req, res) {
  PostModel.findById(req.params.postId, function(err, post) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(post);
    }
  });
};

exports.get_user = function(req, res) {
  UserModel.findById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(user);
    }
  });
};

exports.update_achievement = function(req, res) {
  AchievementModel.findOneAndUpdate({_id: req.params.achievementId}, req.body, {new: true}, function(err, achievement) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(achievement);
    }
  });
};

exports.update_comment = function(req, res) {
  CommentModel.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, function(err, comment) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(comment);
    }
  });
};

exports.update_dish = function(req, res) {
  DishModel.findOneAndUpdate({_id: req.params.dishId}, req.body, {new: true}, function(err, dish) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(dish);
    }
  });
};

exports.update_ingredient = function(req, res) {
  IngredientModel.findOneAndUpdate({_id: req.params.ingredientId}, req.body, {new: true}, function(err, ingredient) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(ingredient);
    }
  });
};

exports.update_post = function(req, res) {
  PostModel.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true}, function(err, post) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(post);
    }
  });
};

exports.update_user = function(req, res) {
  UserModel.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(user);
    }
  });
};

exports.delete_achievement = function(req, res) {
  AchievementModel.remove({_id: req.params.achievementId}, function(err, achievement) {
    if (err) {
      res.send(err);
    }
    else {
      res.json({ message: 'Achievement successfully deleted' });
    }
  });
};

exports.delete_comment = function(req, res) {
  CommentModel.remove({_id: req.params.commentId}, function(err, comment) {
    if (err) {
      res.send(err);
    }
    else {
      res.json({ message: 'Comment successfully deleted' });
    }
  });
};

exports.delete_dish = function(req, res) {
  DishModel.remove({_id: req.params.dishId}, function(err, dish) {
    if (err) {
      res.send(err);
    }
    else {
      res.json({ message: 'Dish successfully deleted' });
    }
  });
};

exports.delete_ingredient = function(req, res) {
  IngredientModel.remove({_id: req.params.ingredientId}, function(err, ingredient) {
    if (err) {
      res.send(err);
    }
    else {
      res.json({ message: 'Ingredient successfully deleted' });
    }
  });
};

exports.delete_post = function(req, res) {
  PostModel.remove({_id: req.params.postId}, function(err, post) {
    if (err) {
      res.send(err);
    }
    else {
      res.json({ message: 'Post successfully deleted' });
    }
  });
};

exports.delete_user = function(req, res) {
  UserModel.remove({_id: req.params.userId}, function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.json({ message: 'User successfully deleted' });
    }
  });
};