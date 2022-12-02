const Celebrity = require("../models/Celebrity.model");
const express = require('express')
const router = require("express").Router();

router.get('/create', (req,res,next) => {
    console.log('')
    res.render('celebrities/new-celebrity')
})

router.get('/', (req,res,next) =>{
    Celebrity.find()
    .then(celebArray => {
        res.render('celebrities/celebrities.hbs', {celebArray});
    })
    .catch(err => res.send(err));
})

router.post('/create', (req,res,next) => {
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }).then(createdCelebrity => {
        res.send(createdCelebrity);
    })
    .catch(err => res.send(err));
});

module.exports = router;