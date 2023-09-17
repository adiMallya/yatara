const mongoose = require('mongoose');
const Movie = require('../models/movies.model');

const sortMoviesByYear = async () => {
  try{
    const foundMovies = await Movie.find({}).sort({ releaseYear : -1 });
      return foundMovies;
  }catch(error){
    console.error('Error getting data', error);
    throw error;
  }
}

const sortMoviesByRating = async () => {
  try{
    const foundMovies = await Movie.find({}).sort({ rating : -1 });
      return foundMovies;
  }catch(error){
    console.error('Error getting data', error);
    throw error;
  }
}

module.exports = {sortMoviesByYear, sortMoviesByRating}