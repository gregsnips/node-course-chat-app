var moment = require('moment');


// Jan 1st 1970 00:00:00 am

// var date = new Date();
// var months = ['Jan','Feb']
// console.log(date.getMonth());

// var date = moment();
// date.add(1, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));


//Challenge
//Print a format like Below
// 10:35 am
//Use padded verison for minutes and non padded version for hours
new Date().getTime()
var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));