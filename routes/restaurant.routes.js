const express = require('express');
const {
  createRestaurant,
  readRestaurant,
  readAllRestaurants,
  readRestaurantsByCuisine,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurantsByLocation
} = require('../controllers/restaurant.controller');

const router = express.Router();

// @desc : Add a new restaurant
// @route : /api/v1/restaurants
// @access : Public
router.post('/', async (req, res, next) => {
  try {
    const restaurant = await createRestaurant(req.body);

    res.status(201).json({
      success: true,
      restaurant
    });
  } catch (err) {
    next(err);
  }
});

// @desc : Search restaurants by address/city
// @route : /api/v1/restaurants/search
// @access : Public
router.get('/search', async (req, res, next) => {
  try {
    const { location } = req.query;
    
    const restaurants = await searchRestaurantsByLocation(location);

    res.status(200).json({
      success: true,
      restaurants
    });
  } catch (err) {
    next(err);
  }
});

// @desc : Find restaurants by cuisine type
// @route : /api/v1/restaurants/cuisine/:cuisineType
// @access : Public
router.get('/cuisine/:cuisineType', async (req, res, next) => {
  try {
    const restaurants = await readRestaurantsByCuisine(req.params.cuisineType);

    res.status(200).json({
      success: true,
      restaurants
    });
  } catch (err) {
    next(err);
  }
});

// @desc : Find a restaurant by name
// @route : /api/v1/restaurants/:name
// @access : Public
router.get('/:name', async (req, res, next) => {
  try{
    const restaurant = await readRestaurant(req.params.name);

  res.status(200).json({
    success: true,
    restaurant
  });
  }catch(err){
   next(err); 
  }
});

// @desc : Update a restaurant by ID
// @route : /api/v1/restaurants/:id
// @access : Public
router.post('/:id', async (req, res, next) => {
  try{
    const data = req.body;

    const restaurant = await updateRestaurant(req.params.id, data);

  res.status(200).json({
    success: true,
    restaurant
  });
  }catch(err){
   next(err); 
  }
});

// @desc : Delete a restaurant
// @route : /api/v1/restaurants/:id
// @access : Public
router.delete('/:id', async (req, res, next) => {
  try{
    const restaurants = await deleteRestaurant(req.params.id);

  res.status(200).json({
    success: true,
    count: restaurants.length
  });
  }catch(err){
   next(err); 
  }
});

// @desc : Get all restaurants
// @route : /api/v1/restaurants
// @access : Public
router.get('/', async (req, res, next) => {
  try{
   const restaurants = await readAllRestaurants();

  res.status(200).json({
    success: true,
    count: restaurants.length,
    restaurants
  }); 
  }catch(err){
    next(err);
  }
});

module.exports = router;
