'use strict';

const timeEditDAL = require('./DAL/timeeditDAL');
const co = require('co');

const isBetweenDates = (d1, d2, d3) => d1 >= d2 && d1 <= d3;

const changeDateHourAndMin = (date = new Date(), hour = 0, min = 0) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min);

const splitAndToNumber = (string) => {
  const [ a, b ] = string.split(':');
  return [ Number(a), Number(b) ];
};

const getActiveBooking = (timeSchedule) => {
  const active = timeSchedule
    .map(booking => {
      const [ startHour, startMin ] = splitAndToNumber(booking.time.startTime);
      const [ endHour, endMin ] = splitAndToNumber(booking.time.endTime);
      return {
        startHour,
        startMin,
        endHour,
        endMin
      };
    })
    .filter(times => {
      return isBetweenDates(new Date(),
        changeDateHourAndMin(new Date(), times.startHour, times.startMin),
        changeDateHourAndMin(new Date(), times.endHour, times.endMin));
    })[0];

  return active ? active : null;
};


const getTodaysSchedule = (url, type, id) => {
  const timeEditLNU = timeEditDAL(url, type);

  return co.wrap(function*(){
    const timeSchedule = yield timeEditLNU.getTodaysSchedule(id);

    return {
      timeSchedule,
      roomName: id,
    };
  })();
};

module.exports = {
  getTodaysSchedule,
  getActiveBooking
};
