const express = require('express');
const {
  createTravelDestination,
  readTravelDestination,
  readAllTravelDestinations,
  readTravelDestinationsByLocation,
  updateTravelDestination,
  deleteTravelDestination,
  readTravelDestinationsByRating
} = require('../controllers/destination.controller');

const router = express.Router();

// @desc : Add a new travel destination
// @route : /api/v1/destinations
// @access : Public
router.post('/', async (req, res, next) => {
  try {
    const destination = await createTravelDestination(req.body);

    res.status(201).json({
      success: true,
      destination
    });
  } catch (err) {
    next(err);
  }
});

// @desc : Find a travel destination by name
// @route : /api/v1/destinations/:name
// @access : Public
router.get('/:name', async (req, res, next) => {
  try{
    const destination = await readTravelDestination(req.params.name);

  res.status(200).json({
    success: true,
    destination
  });
  }catch(err){
   next(err); 
  }
});

// @desc : Find travel destinations by city/country
// @route : /api/v1/destinations/location/:location
// @access : Public
router.get('/location/:location', async (req, res, next) => {
  try {    
    const destinations = await readTravelDestinationsByLocation(req.params.location);

    res.status(200).json({
      success: true,
      destinations
    });
  } catch (err) {
    next(err);
  }
});

// @desc : Update a travel destination by ID
// @route : /api/v1/destinations/:destinationId
// @access : Public
router.post('/:destinationId', async (req, res, next) => {
  try{
    const data = req.body;

    const destination = await updateTravelDestination(req.params.destinationId, data);

  res.status(200).json({
    success: true,
    destination
  });
  }catch(err){
   next(err); 
  }
});

// @desc : Delete a travel destination
// @route : /api/v1/destinations/:destinationId
// @access : Public
router.delete('/:destinationId', async (req, res, next) => {
  try{
    const destinations = await deleteTravelDestination(req.params.destinationId);

  res.status(200).json({
    success: true,
    count: destinations.length
  });
  }catch(err){
   next(err); 
  }
});

// @desc : Get all destinations
// @route : /api/v1/destinations
// @access : Public
router.get('/', async (req, res, next) => {
  try{
   const destinations = await readAllTravelDestinations();

  res.status(200).json({
    success: true,
    count: destinations.length,
    destinations
  }); 
  }catch(err){
    next(err);
  }
});

module.exports = router;
