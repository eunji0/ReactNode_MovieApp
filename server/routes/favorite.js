const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

router.post('/favoriteNumber', (req, res)=>{
    req.body.movieId


})

module.exports = router;
