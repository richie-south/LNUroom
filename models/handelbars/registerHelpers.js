'use strict';

const Handlebars = require('handlebars');
const scheduleBlock = require('../scheduleBlock');
const timeEdit = require('../timeEdit');

/**
 * gets position for timeBlock
 */
Handlebars.registerHelper('getTimeBlockPosition', function(booking, options) {
  if(!booking){
    return 'top: 0; max-height: 0; height: 0;';
  }
  const { top, height } = scheduleBlock.getBlock(booking.time.startTime, booking.time.endTime, booking.columns);
  return `top: ${top}%; max-height: ${height}%; height: ${height}%;`;
});

/**
 * makes time block for current time
 */
Handlebars.registerHelper('getTimeBlockNow', function(options) {
  const now = new Date();
  if(now.getHours() >= 18){
    return '';
  }
  const later = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 6);
  const { top, height } = scheduleBlock.getBlock(now, later, {});
  return `top: ${top}%; max-height: ${height}%; height: ${height}%;`;
});

/**
 * Determines tag style
 */
Handlebars.registerHelper('getTagType', function(string, options) {
  const wordToLower = string.toLowerCase();
  if(wordToLower === 'handledning'){
    return 'is-info';
  }else if(wordToLower === 'föreläsning'){
    return 'is-warning';
  }else{
    return 'is-myColor';
  }
});

/**
 * gets color based on active timeBlock
 */
Handlebars.registerHelper('scheduleColor', function(timeSchedule, options) {
  if(timeSchedule && timeEdit.getActiveBooking(timeSchedule)){
    return `background: #ff4b1f;
      background: -webkit-linear-gradient(to left, #ff4b1f , #ff9068);
      background: linear-gradient(to left, #ff4b1f , #ff9068);`;
  }
  return `background: #7474BF;
    background: -webkit-linear-gradient(to left, #7474BF , #348AC7);
    background: linear-gradient(to left, #7474BF , #348AC7);`;
});


Handlebars.registerHelper('formatDate', function(date, options) {
  const d = new Date(date);
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return `${days[d.getDay()]} ${d.getDate()}`;
});
