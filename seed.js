const fs = require('fs');

const Movie = require('./models/movies');

const jsonData = fs.readFileSync('./data/movies.json', 'utf-8');
const moviesData = JSON.parse(jsonData);

async function seedMovieDb(){
  try{
    for(const movie of moviesData){
      const newMovie = new Movie({
        title : movie.title,
        releaseYear : movie.releaseYear,
        genre : movie.genre,
        director : movie.director,
        actors : movie.actors,
        language : movie.language,
        country : movie.country,
        rating : movie.rating,
        plot : movie.plot,
        awards : movie.awards,
        posterUrl : movie.posterUrl,
        trailerUrl : movie.trailerUrl
      });

      await newMovie.save();
      console.log(`Movie ${newMovie.title} seeded into DB.`)
    }
  }catch(err){
    console.error('Error in seeding database', err)
  }finally{
    mongoose.disconnect()
  }
}

seedMovieDb();