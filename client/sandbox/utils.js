const moment = require('moment');

let today = moment.now();
let start = moment(today).subtract(30, 'days');
let workoutDate = moment('2020-2-23');

console.log(moment(workoutDate).isBetween(start, today));
