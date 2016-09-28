'use strict';

const router = require('express').Router();
const timeEdit = require('../../models/timeEdit');
const timeEditConfig = require('../../config/timeEdit');

router.get('/:roomName', function(req, res){
  const dayNumber = Number.isInteger(Number(req.query.day)) ? Number(req.query.day) : 0;
  const today = new Date();
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayNumber);
  Promise.resolve(timeEdit.getScheduleByDate(timeEditConfig.timeeditURL, timeEditConfig.timeeditType, req.params.roomName, d))
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
