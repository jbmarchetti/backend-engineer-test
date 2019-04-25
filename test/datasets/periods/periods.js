const moment = require('moment');
exports.periods11Months=
   [
     {
       startDate: moment('2017-01-01T00:00:00+01:00'),
       endDate: moment('2017-03-01T00:00:00+01:00'),
     },
     {
       startDate: moment('2018-01-01T00:00:00+01:00'),
       endDate: moment('2018-05-01T00:00:00+01:00'),
     },
     {
       startDate: moment('2018-03-01T00:00:00+01:00'),
       endDate: moment('2018-10-01T00:00:00+01:00'),
     },
   ];

exports.periods11MonthsBis =
    [
      {
        startDate: moment('2018-03-01T00:00:00+01:00'),
        endDate: moment('2018-10-01T00:00:00+01:00'),
      }, {
        startDate: moment('2017-01-01T00:00:00+01:00'),
        endDate: moment('2017-03-01T00:00:00+01:00'),
      },
      {
        startDate: moment('2018-01-01T00:00:00+01:00'),
        endDate: moment('2018-05-01T00:00:00+01:00'),
      },

    ];

exports.periods0Months = [];

exports.periods60Months =
    [
      {
        startDate: moment('2016-03-01T00:00:00+01:00'),
        endDate: moment('2018-05-01T00:00:00+01:00'),
      },
      {
        startDate: moment('2014-01-01T00:00:00+01:00'),
        endDate: moment('2016-09-01T00:00:00+01:00'),
      },
      {
        startDate: moment('2013-05-01T00:00:00+01:00'),
        endDate: moment('2014-07-01T00:00:00+01:00'),
      },
    ];
