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
      const { timeSchedule, roomName, bookingActive } = result;
      res.json({ timeSchedule, roomName, bookingActive, message: 'Success'});
    })
    .catch(e => {
      if(e instanceof TypeError){
        return res.status(500).json({
          message: 'Server error'
        });
      }
      return res.status(404).json({
        message: 'Nothing here to see'
       });
    });
});

module.exports = router;
