const mongoose = require('mongoose');
const Movie = require('../models/movies.model');

const updateMovie = async (movieId, updateData) => {
  try{
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updateData, { new: true, runValidators : true})
    if(updatedMovie){
      return updatedMovie;
    }
  }catch(error){
    console.error('Error while updating movie', error);
    throw error;
  }
}

const addRatingAndReview = async (movieId, userId, rating, reviewText) => {
  try{
    const movie = await Movie.findById(movieId);
    
    if(movie){
      movie.rating = rating;

      const review = {
        user: userId,
        text: reviewText,
      };
      movie.reviews.push(review);

      await movie.save();

      const updatedMovieWithReview = await Movie.findById(movieId).populate('reviews.user', 'username profilePicture');
      return updatedMovieWithReview;
    } else {
      throw new Error('Movie not found.')
    } 
  }catch(error){
    console.error('Error while updating movie', error);
    throw error;
  }
} 

module.exports = {updateMovie, addRatingAndReview}