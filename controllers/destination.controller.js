const ErrorResponse = require('../utils/errorResponse');
const Destination = require('../models/destination.model');

exports.createTravelDestination = async (destinationData) => {
  try{
    const destination = new Destination(destinationData);
    const newDestination = await destination.save();

    return newDestination;
  }catch(err){
    throw err;
  }
}

exports.readTravelDestination = async (destinationName) => {
  try{
    const destination = await Destination.find({ name: destinationName });
    if(!destination.length){
      throw new ErrorResponse(`Travel destination not found with name ${destinationName}.`, 400);
    }

    return destination;
  }catch(err){
    throw err;
  }
}

exports.readAllTravelDestinations = async () => {
  try{
    const destinations = await Destination.find();
    return destinations;
  }catch(err){
    throw err;
  }
}

exports.readTravelDestinationsByLocation = async (location) => {
  try{
    const regex = new RegExp(location, 'i')
    
    const destinations = await Destination.find(
        {location: {$regex : regex}}
    );
    
    if(!destinations.length){
      throw new ErrorResponse(`No travel destination found by the location of ${location}.`, 400);
    }

    return destinations;
  }catch(err){
    throw err;
  }
}

exports.updateTravelDestination = async (destinationId, dataToUpdate) => {
  try{
   const updatedDestination = await Destination.findByIdAndUpdate(destinationId, dataToUpdate, { new: true, runValidators : true});

  if(!updatedDestination){
    throw new ErrorResponse(`Travel destination not found with id of ${destinationId}.`, 400);
  }
    
  return updatedDestination;
  }catch(err){
    throw err;
  }
}

exports.deleteTravelDestination = async (destinationId) => {
  try{
    const deletedDestination = await Destination.findByIdAndDelete(destinationId);

    if(!deletedDestination){
      throw new ErrorResponse(`Travel destination not found with id of ${destinationId}.`, 400);
    }

    const destinations = await Destination.find();
    return destinations;
  }catch(err){
    throw err;
  }
}

exports.readTravelDestinationsByRating = async () => {
  try {
    const destinations = await Destination.find().sort({ rating: -1 });
    return destinations;
  } catch (err) {
    throw err;
  }
}