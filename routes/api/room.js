'use strict';

const router = require('express').Router();
const timeEdit = require('../../models/timeEdit');
const timeEditConfig = require('../../config/timeEdit');

router.get('/room/:roomName', function(req, res){
  Promise.resolve(timeEdit.getTodaysSchedule(timeEditConfig.timeeditURL, timeEditConfig.timeeditType, req.params.roomName))
    .then(result => {
      const { timeSchedule, roomName } = result;
      res.json({ timeSchedule, roomName, message: 'Success'});
    })
    .catch(e => {
      res.status(404).json({
        message: 'Nothing here to see'
       });
    });
});

module.exports = router;
