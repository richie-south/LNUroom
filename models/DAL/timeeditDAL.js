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

const getSchedule = (cache, timeEditScheduleFn, key, id) =>
  new Promise(function(resolve, reject) {
    cache.get(id + key)
      .then(schedule => {
        if(isNullOrFalse(schedule)){
          return timeEditScheduleFn(id);
        }
        resolve(schedule);
        return schedule;
      })
      .then(schedule => {
        cache.set(id + key, schedule, 10800 * 1000);
        resolve(schedule);
      })
      .catch(reject);
  });

const TimeeditDAL = (url, type) => {
  const timeEdit = timeEditApi(url, type);
  const cache = new FileCacheSimple();

  return {
    getTodaysSchedule: getSchedule.bind(null, cache, timeEdit.getTodaysSchedule, TODAY_SAVE_KEY),
    getSchedule: getSchedule.bind(null, cache, timeEdit.getSchedule, FULL_SAVE_KEY)
  };
};

module.exports = TimeeditDAL;
