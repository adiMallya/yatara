const express = require('express');
const {
  addReview,
  getDestinationReviewsWithUserDetails
} = require('../controllers/review.controller');

const router = express.Router();

// @desc : Get all User reviews for a travel destination
// @route : /api/v1/destinations/:destinationId/reviews
// @access : Public
router.get('/:destinationId/reviews', async (req, res, next) => {
  try{
  const userReviews = await getDestinationReviewsWithUserDetails(req.params.destinationId);

  res.status(200).json({
    success: true,
    userReviews
  });
  }catch(err){
   next(err); 
  }
});

// @desc : Write a review of a travel destination
// @route : /api/v1/destinations/:destinationId/reviews
// @access : Public
router.post('/:destinationId/reviews', async (req, res, next) => {
  try{
    const { userId, reviewText } = req.body;

    const destination = await addReview(req.params.destinationId, userId, reviewText);
    
  res.status(200).json({
    success: true,
    destination
  });
  }catch(err){
   next(err); 
  }
});

module.exports = router;

