const express = require('express');
const { createMovie } = require('../controllers/movies.create.controller');
const { readMovieByTitle, readAllMovies, readMoviesByActor, readMoviesByDirector, readMoviesByGenre, getMovieReviewsWithUserDetails } = require('../controllers/movies.read.controller');
const { updateMovie, addRatingAndReview } = require('../controllers/movies.update.controller');
const { deleteMovie } = require('../controllers/movies.delete.controller');
const { sortMoviesByYear, sortMoviesByRating } = require('../controllers/movies.sort.controller');
const { authVerify } = require('../middlewares/authVerify.middleware');


const movieRouter = express.Router();

movieRouter.get('/', async(req, res) => {
  try{
    const movies = await readAllMovies();
    res.status(200).json({ message: "Found movies.", movies: movies });
  } catch(error){
    res.status(500).json({ error: "Failed to fetch data."})
  } 
});

movieRouter.post('/', async (req, res) => {
  try{
    const savedMovie = await createMovie(req.body);
  res.status(201).json({ message: "Movie added", movie: savedMovie});
  }catch(error){
    res.status(400).json({ error : "Failed to save movie."});
  }
});

movieRouter.post('/:id/rating', authVerify, async (req, res) => {
  try{
    const { rating, review } = req.body;
    const { userId } = req.user;
    
    const updatedMovie = await addRatingAndReview(req.params.id, userId, rating, review);
    res.status(200).json({ message: "Added user rating to movie.", movie: updatedMovie });
  } catch(error){
    res.status(400).json({ error: "Failed to rate movie." })
  } 
});

movieRouter.get('/:id/reviews', async (req, res) => {
  try{
    const reviewsByUser = await getMovieReviewsWithUserDetails(req.params.id);
    res.status(200).json({ message: "Found user reviews for the movie.", reviews: reviewsByUser })
  } catch(error){
    res.status(400).json({ error: "Failed to fetch reviews." })
  } 
});

movieRouter.get('/ratings', async (req, res) => {
  try{
    const movies = await sortMoviesByRating();
    res.status(200).json({ message: "Highest ratest movies.", movies: movies });
  } catch(error){
    res.status(404).json({ error : "Failed to fetch movie."});
  } 
});

movieRouter.get('/release-years', async (req, res) => {
  try{
    const movies = await sortMoviesByYear();
    res.status(200).json({ message: "Latest movies.", movies: movies });
  } catch(error){
    res.status(404).json({ error : "Failed to fetch movie."});
  } 
});

movieRouter.post('/:id', async (req, res) => {
  try{
    const savedMovie = await updateMovie(req.params.id, req.body);
  res.status(200).json({ message: "Movie updated", movie: savedMovie});
  }catch(error){
    res.status(400).json({ error : "Failed to update movie."});
  }
});

movieRouter.delete('/:id', async (req, res) => {
  try{
    const deletedMovie = await deleteMovie(req.params.id);
  res.status(200).json({ message: "Deleted movie", movie: deletedMovie});
  }catch(error){
    res.status(400).json({ error : "Failed to delete movie."});
  }
});

movieRouter.get('/:title', async (req, res) => {
  try{
    const foundMovie = await readMovieByTitle(req.params.title);
    res.status(200).json({ message: "Found movie.", movie: foundMovie });
  }catch(error){
    res.status(400).json({ error : "Failed to fetch movie."});
  }
});

movieRouter.get('/actor/:actorName', async (req, res) => {
  try{
    const foundMovie = await readMoviesByActor(req.params.actorName);
    res.status(200).json({ message: "Found movie.", movie: foundMovie });
  } catch(error){
    res.status(400).json({ error : "Failed to fetch movie."});
  } 
});

movieRouter.get('/director/:directorName', async (req, res) => {
  try{
    const foundMovie = await readMoviesByDirector(req.params.directorName);
    res.status(200).json({ message: "Found movie.", movie: foundMovie });
  } catch(error){
    res.status(400).json({ error : "Failed to fetch movie."});
  } 
});

movieRouter.get('/genre/:genreName', async (req, res) => {
  try{
    const foundMovie = await readMoviesByGenre(req.params.genreName);
    res.status(200).json({ message: "Found movie.", movie: foundMovie });
  } catch(error){
    res.status(400).json({ error : "Failed to fetch movie."});
  } 
});

module.exports = {movieRouter};