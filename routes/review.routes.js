const express = require('express');
const {
  addRestaurantReviewAndRating,
  getUserReviewsForRestaurant
} = require('../controllers/review.controller');

const router = express.Router();

// @desc : Get all User reviews for a restaurant
// @route : /api/v1/restaurants/:restaurantId/reviews
// @access : Public
router.get('/:restaurantId/reviews', async (req, res, next) => {
  try{
  const userReviews = await getUserReviewsForRestaurant(req.params.restaurantId);

  res.status(200).json({
    success: true,
    userReviews
  });
  }catch(err){
   next(err); 
  }
});

// @desc : Add a review and rating to a restaurant
// @route : /api/v1/restaurants/:restaurantId/reviews
// @access : Public
router.post('/:restaurantId/reviews', async (req, res, next) => {
  try{
    const { userId, reviewText, rating } = req.body;

    const restaurant = await addRestaurantReviewAndRating(req.params.restaurantId, userId, rating, reviewText);
    
  res.status(200).json({
    success: true,
    restaurant
  });
  }catch(err){
   next(err); 
  }
});

module.exports = router;

