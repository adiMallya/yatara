const Restaurent = require('../models/restaurent.model');

exports.createRestaurant = async (restaurantData) => {
  try{
    const restaurant = new Restaurent(restaurantData);
    const newRestaurant = await restaurant.save();
    return newRestaurant;
  }catch(err){
    throw err;
  }
}

exports.readRestaurant = async (restaurantName) => {
  try{
    const restaurant = await Restaurent.find({ name: restaurantName });
    if(restaurant === null){
      throw new Error(`${restaurantName} not found in DB.`)
    }else{
      return restaurant;
    }
  }catch(err){
    throw err;
  }
}

exports.readAllRestaurants = async () => {
  try{
    const restaurants = await Restaurent.find();
    return restaurants;
  }catch(err){
    throw err;
  }
}

exports.readRestaurantsByCuisine = async (cuisineName) => {
  try{
    const restaurants =  await Restaurent.find({ cuisine: cuisineName });

    return restaurants;
  }catch(err){
    throw err;
  }
}