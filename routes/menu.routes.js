const express = require('express');
const {
  addDishToMenu,
  removeDishFromMenu
} = require('../controllers/menu.controller');

const router = express.Router();

// @desc : Add a dish to restaurant menu
// @route : /api/v1/restaurants/:restaurantId/menu
// @access : Public
router.post('/:restaurantId/menu', async (req, res, next) => {
  try{
    const newDish = req.body;

    const restaurant = await addDishToMenu(req.params.restaurantId, newDish);

  res.status(200).json({
    success: true,
    restaurant
  });
  }catch(err){
   next(err); 
  }
});

// @desc : Remove a dish from the restaurant menu
// @route : /api/v1/restaurants/:restaurantId/menu/:dishName
// @access : Public
router.delete('/:restaurantId/menu/:dishName', async (req, res, next) => {
  try{
    const restaurant = await removeDishFromMenu(req.params.restaurantId, req.params.dishName);

  res.status(200).json({
    success: true,
    restaurant
  });
  }catch(err){
   next(err); 
  }
});

module.exports = router;
