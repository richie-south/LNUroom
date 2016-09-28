'use strict';
const timeEditApi = require('timeeditapi');
const FileCacheSimple = require('file-cache-simple');

const TODAY_SAVE_KEY = 'todays';
const FULL_SAVE_KEY = 'full';

const isNullOrFalse = (value) => {
  if(!value || value === null){
    return true;
  }
  return false;
};

const getSchedule = (cache, timeEditScheduleFn, key, id, date = new Date()) =>
  new Promise(function(resolve, reject) {
    cache.get(`${id}${key}_${date.getDate()}`)
      .then(schedule => {
        if(isNullOrFalse(schedule)){
          return timeEditScheduleFn(id, date);
        }
        resolve(schedule);
        return schedule;
      })
      .then(schedule => {
        cache.set(`${id}${key}_${date.getDate()}`, schedule, 10800 * 1000);
        resolve(schedule);
      })
      .catch(reject);
  });

const TimeeditDAL = (url, type) => {
  const timeEdit = timeEditApi(url, type);
  const cache = new FileCacheSimple();

  return {
    getScheduleByDate: getSchedule.bind(null, cache, timeEdit.getScheduleByDate, TODAY_SAVE_KEY),
    getSchedule: getSchedule.bind(null, cache, timeEdit.getSchedule, FULL_SAVE_KEY)
  };
};

module.exports = TimeeditDAL;
