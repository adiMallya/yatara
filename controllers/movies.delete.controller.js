const mongoose = require('mongoose');
const Movie = require('../models/movies.model');

const deleteMovie = async (movieId) => {
  try{
    const deletedMovie = 
 await Movie.findByIdAndDelete(movieId)
    return deletedMovie;
  }catch(error){
    console.error('Error while deleting movie', error);
    throw error;
  }
}

module.exports = {deleteMovie}