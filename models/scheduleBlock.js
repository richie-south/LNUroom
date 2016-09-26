'use strict';

const hourBlock = 9;
const minuteBlock = 0.15;

const calcHour = (hour) => {
  switch (hour) {
    case 8:
      return 0;
    case 9:
      return hourBlock;
    case 10:
      return hourBlock * 2;
    case 11:
      return hourBlock * 3;
    case 12:
      return hourBlock * 4;
    case 13:
      return hourBlock * 5;
    case 14:
      return hourBlock * 6;
    case 15:
      return hourBlock * 7;
    case 16:
      return hourBlock * 8;
    case 17:
      return hourBlock * 9;
    case 18:
      return hourBlock * 10;
    default:
      return null;
   }
};

const calcMin = (min) => {
    return min * minuteBlock;
};

const buildDateFromString = (timeString) => {
    let hourMinute = timeString.split(':');
    let today = new Date();
    let myDate = new Date(
        today.getFullYear(), today.getMonth(), today.getDate(),
        hourMinute[0], hourMinute[1]
    );
    return myDate;
};

const getTodaysReservations = (startTime, endTime, columns) => {
  return {
    startTime: startTime instanceof Date ? startTime : buildDateFromString(startTime),
    endTime: endTime instanceof Date ? endTime : buildDateFromString(endTime),
    columns
  };
};

const getBlockPosition = (startHour, startMin) =>
  calcHour(startHour) + calcMin(startMin);

const getBlockHeight = (startHour, startMin, endHour, endMin) =>
  (calcHour(endHour) - calcHour(startHour)) +
    (calcMin(endMin) - calcMin(startMin));

const getBlock = (startTime, endTime, columns) => {
  const timeBlock = getTodaysReservations(startTime, endTime, columns);
  const startHour = timeBlock.startTime.getHours();
  const startMin = timeBlock.startTime.getMinutes();
  const endHour = timeBlock.endTime.getHours();
  const endMin = timeBlock.endTime.getMinutes();
  return {
    top: getBlockPosition(startHour, startMin),
    height: getBlockHeight(startHour, startMin, endHour, endMin)
  };
};

module.exports = {
  getBlock
};
