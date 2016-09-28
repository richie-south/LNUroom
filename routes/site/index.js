'use strict';

const router = require('express').Router();
const timeEdit = require('../../models/timeEdit');
const timeEditConfig = require('../../config/timeEdit');

router.get('/', function(req, res){
  res.status(200).render('index');
});

module.exports = router;
