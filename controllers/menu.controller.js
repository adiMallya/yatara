const ErrorResponse = require('../utils/errorResponse');
const Restaurent = require('../models/restaurent.model');

exports.addDishToMenu = async (restaurantId, dish) => {
  try {
    const updatedRestaurant = await Restaurent.findByIdAndUpdate(restaurantId, { $addToSet: { menu: dish } }, { runValidators: true, upsert: true });

    if (!updatedRestaurant) {
      throw new ErrorResponse(`Restaurant not found with id of ${restaurantId}.`, 400);
    }

    return updatedRestaurant;
  } catch (err) {
    throw err;
  }
}

exports.removeDishFromMenu = async (restaurantId, dishName) => {
  try {
    const updatedRestaurant = await Restaurent.findByIdAndUpdate(restaurantId, { $pull: { menu: { name: dishName } } }, { safe: true, multi: true, new: true });
    
    if (!updatedRestaurant) {
      throw new ErrorResponse(`Restaurant not found with id of ${restaurantId}.`, 400);
    }

    return updatedRestaurant;
  } catch (err) {
    throw err;
  }
}