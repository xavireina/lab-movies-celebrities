const router = require("express").Router();
const Movie = require("../models/movie.model");
const Celebrity = require("../models/celebrity.model");


router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('movies/new-movie', {
            celebrities
        })
    })
    .catch(error => {
        console.log('error', error);
        res.send("Error", error);
    })
});


router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({
        title, genre, plot, cast
    })
    .then(() => res.redirect("/movies") )
    .catch(error => {
        console.log("error", error)
        res.redirect('/movies/create')
    });
  });

  router.get("/movies", (req, res, next) => {
    Movie.find()
    .then(movies => {
        res.render("movies/movies", { movies });
    })
    .catch(error => {
        console.log("error", error)
        res.redirect('/movies/movies')
    });
  });

  router.get("/movies/:id", (req, res, next) => {
    Movie.findById(req.params.id)
    .populate("cast", "name occupation catchPhrase")
    .then(movie => {
        console.log('Movie',movie);
        res.render("movies/movie-details", { movie });
    })
    .catch(error => {
        console.log("error", error)
        res.redirect('/movies/movies')
    });
  });

module.exports = router;