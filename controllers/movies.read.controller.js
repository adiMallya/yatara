const mongoose = require('mongoose');
const Movie = require('../models/movies.model');

const readMovieByTitle = async (movieTitle) => {
  try{
    const foundMovie = await Movie.findOne({ title : movieTitle }) ;
    return foundMovie;
  }catch(error){
   console.error('Error getting data', error);
   throw error;
  }
}

const readMoviesByActor = async (actorName) => {
  try{
    const foundMovies = await Movie.find({ actors : actorName }) 
    return foundMovies;
  }catch(error){
    console.error('Error getting data', error);
    throw error;
  }
} 

const readMoviesByDirector = async (directorName) => {
  try{
    const foundMovies = await Movie.find({ director : directorName }) 
    return foundMovies;
  }catch(error){
    console.error('Error getting data', error);
    throw error;
  }
} 

const readMoviesByYear = async (year) => {
  try{
    const foundMovies = await Movie.find({ releaseYear : year});
    if(foundMovies){
     return foundMovies; 
    }
  }catch(error){
    console.error('Error getting data', error);
  } 
}

const readMoviesByGenre = async (genreName) => {
  try{
    const foundMovies = await Movie.find({ genre : genreName});
    return foundMovies;
  }catch(error){
    console.error('Error getting data', error);
    throw error;
  }
}

const readAllMovies = async () => {
  try{
    const foundMovies = await Movie.find({}) 
    return foundMovies;
  }catch(error){
    console.error('No data found', error);
    throw error;
  }
}

const getMovieReviewsWithUserDetails = async (movieId) => {
  try{
    const foundMovies = await Movie.findById(movieId).populate({
      path: 'reviews',
      populate: {
        path: "user",
        select: "username profilePicture"
      }
    });
    
    const reviews = foundMovies.reviews.slice(0, 3).map(review => ({
      review: review.text,
      user: review.user
    }));
    return reviews;
  }catch(error){
    throw error;
  }
}

module.exports = {
  readMovieByTitle,
  readMoviesByActor,
  readMoviesByDirector,
  readMoviesByYear,
  readMoviesByGenre,
  readAllMovies,
  getMovieReviewsWithUserDetails
}