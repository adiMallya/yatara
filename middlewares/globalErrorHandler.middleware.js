function globalErrorHandler(error, req, res, next){
  console.error(error.stack);
  res.status(500).json({ error: "Something went wrong"});
}

module.exports = { globalErrorHandler };