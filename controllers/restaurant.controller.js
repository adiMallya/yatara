const ErrorResponse = require('../utils/errorResponse');
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
    if(!restaurant.length){
      throw new ErrorResponse(`Restaurant not found with name ${restaurantName}.`, 400);
    }

    return restaurant;
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
    if(!restaurants.length){
      throw new ErrorResponse(`Restaurant not found with cuisine type ${cuisineName}.`, 400);
    }
    
    return restaurants;
  }catch(err){
    throw err;
  }
}

exports.updateRestaurant = async (restaurantId, dataToUpdate) => {
  try{
   const updatedRestaurant = await Restaurent.findByIdAndUpdate(restaurantId, dataToUpdate, { new: true, runValidators : true});

  if(!updatedRestaurant){
    throw new ErrorResponse(`Restaurant not found with id of ${restaurantId}.`, 400);
  }
    
  return updatedRestaurant;
  }catch(err){
    throw err;
  }
}

exports.deleteRestaurant = async (restaurantId) => {
  try{
    const deletedMovie = await Restaurent.findByIdAndDelete(restaurantId);

    if(!deletedMovie){
      throw new ErrorResponse(`Restaurant not found with id of ${restaurantId}.`, 400);
    }

    const restaurants = await Restaurent.find();
    return restaurants;
  }catch(err){
    throw err;
  }
}

exports.searchRestaurantsByLocation = async (location) => {
  try{
    const regex = new RegExp(location, 'i')
    
    const searchResult = Restaurent.find(
      { $or: [
        {city: location},
        {address: {$regex : regex}}
      ]}
    );
    
    if(!Array.isArray(searchResult)){
      throw new ErrorResponse(`No restaurant found by the location of ${location}.`, 400);
    }

    return searchResult;
  }catch(err){
    throw err;
  }
}

