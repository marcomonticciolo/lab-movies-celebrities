const Movie = require("../models/Movie.model");
const Celebrity = require('../models/Celebrity.model')
const express = require('express')
const router = require("express").Router();

router.get('/create', (req,res,next) => {

    Celebrity.find()
        .then((celebrities) => {

            res.render('movies/new-movie', {celebrities})
        })
        .catch((err) => console.log(err))

})

router.get('/', (req,res,next) =>{
    Movie.find()
    .then(movieArray => {
        console.log("movie array", movieArray)
        res.render('movies/movies.hbs', {movieArray});
    })
    .catch(err => res.send(err));
})

router.post('/create', (req,res,next) => {
    Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast

    }).then(createdMovie => {
        res.send(createdMovie);
    })
    .catch(err => res.send(err));
});

router.get('/:id', (req,res,next) => {
    Movie.findById(req.params.id)
    .populate('cast')
    .then(foundMovie => {
        res.render('movies/movie-details.hbs', foundMovie)
    })
    .catch(err => res.send(err));
})

router.post('/:id/delete', (req,res,next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(deletedMovies => {
        res.render('movies/movies.hbs')
    })
    .catch(err => res.send(err));
})




router.get('/movies/:id/edit', (req,res,next) => {
    Promise.all([Movie.findById(req.params.id).populate('cast'),Celebrity.find()])
        .then(([foundMovie,foundCelebArray])=> {
            res.render('movies/edit-movie.hbs', { foundMovie, foundCelebArray })
        })
        .catch(err => res.send(err));
})




module.exports = router;