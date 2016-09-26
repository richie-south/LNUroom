'use strict';

const router = require('express').Router();
const timeEdit = require('../../models/timeEdit');
const timeEditConfig = require('../../config/timeEdit');

router.get('/room/:roomName', function(req, res){
  Promise.resolve(timeEdit.getTodaysSchedule(timeEditConfig.timeeditURL, timeEditConfig.timeeditType, req.params.roomName))
    .then(result => {
      const { timeSchedule, roomName } = result;
      res.status(200).render('room', { timeSchedule, searchParam: roomName, message: 'Success'});
    })
    .catch(e => {
      if(e instanceof TypeError){
        return res.status(500).render('500', {
          message: 'Server error'
        });
      }
      return res.status(404).render('404', {
        searchParam: req.params.roomName,
        message: 'Nothing here to see'
      });
    });
});

module.exports = router;
