'use strict';

const router = require('express').Router();
const timeEdit = require('../../models/timeEdit');
const timeEditConfig = require('../../config/timeEdit');

router.get('/:roomName', function(req, res){
  Promise.resolve(timeEdit.getTodaysSchedule(timeEditConfig.timeeditURL, timeEditConfig.timeeditType, req.params.roomName))
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
