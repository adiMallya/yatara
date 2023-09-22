const ErrorResponse = require('../utils/errorResponse');
const Destination = require('../models/destination.model');
const User = require('../models/user.model');

exports.addReview = async (destinationId, userId, reviewText) => {
  try{
    const destination  = await Destination.findById(destinationId);

    if(!destination){
      throw new ErrorResponse(`Travel destination not found with id of ${destinationId}.`, 400);  
    }

    const review = {
      user: userId,
      reviewText,
    }
    destination.reviews.push(review);

    await destination.save();

    const updatedDestinationWithReview = await Destination.findById(destinationId).populate('reviews.user', 'username');
    
    return updatedDestinationWithReview;
  }catch(err){
    throw err;
  }
}

exports.getDestinationReviewsWithUserDetails = async (destinationId) => {
  try{
    const destination = await Destination.findById(destinationId).populate({
      path: 'reviews',
      populate: {
        path: "user",
        select: "username profileImage"
      }
    });

    if(!destination){
      throw new ErrorResponse(`Travel destination not found with id of ${destinationId}.`, 400);
    }
    
    const reviews = destination.reviews.map(review => ({
      review: review.reviewText,
      user: review.user
    }));
    
    return reviews;
  }catch(err){
    throw err;
  }
}