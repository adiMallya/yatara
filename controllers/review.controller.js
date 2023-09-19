const ErrorResponse = require('../utils/errorResponse');
const Restaurent = require('../models/restaurent.model');
const User = require('../models/user.model');

exports.addRestaurantReviewAndRating = async (restaurantId, userId, rating, reviewText) => {
  try{
    const restaurant  = await Restaurent.findById(restaurantId);

    if(!restaurant){
      throw new ErrorResponse(`Restaurant not found with id of ${restaurantId}.`, 400);  
    }

    //Adding user review and rating
    const review = {
      user: userId,
      reviewText,
      rating
    }
    restaurant.reviews.push(review);

    //Updating average rating of restaurant
    const totalReviews = restaurant.reviews.length;
    const aggregateRating = restaurant.reviews.reduce((sum, { rating }) => sum + rating, 0);
    restaurant.averageRating = aggregateRating / totalReviews;

    await restaurant.save();

    const updatedRestaurantWithReview = await Restaurent.findById(restaurantId).populate('reviews.user', 'name');
    
    return updatedRestaurantWithReview;
  }catch(err){
    throw err;
  }
}

exports.getUserReviewsForRestaurant = async (restaurantId) => {
  try{
    const restaurant = await Restaurent.findById(restaurantId).populate({
      path: 'reviews',
      populate: {
        path: "user",
        select: "name"
      }
    });

    if(!restaurant){
      throw new ErrorResponse(`Restaurant not found with id of ${restaurantId}.`, 400);
    }
    
    const reviews = restaurant.reviews.slice(0, 3).map(review => ({
      review: review.reviewText,
      rating: review.rating,
      user: review.user
    }));
    
    return reviews;
  }catch(err){
    throw err;
  }
}