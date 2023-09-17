const mongoose = require('mongoose');
const Movie = require('../models/movies.model');

const createMovie = async (movieData) => {
  try{
    const movie = new Movie(movieData);
    const newMovie = await movie.save();
    console.log(`Added movie : ${newMovie}`);
    return newMovie;
  }catch(error){
    throw error;
  }
}

module.exports = { createMovie };