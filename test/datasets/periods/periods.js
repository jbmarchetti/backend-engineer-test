const moment = require('moment');
exports.datas =
  [
    {
      periods: [
        {
          startDate: moment('2017-01-01T00:00:00+01:00'),
          endDate: moment('2017-12-01T00:00:00+01:00'),
        },
      ],
      result: 11,
    },
    {
      periods:
    [
      {
        startDate: moment('2017-01-01T00:00:00+01:00'),
        endDate: moment('2017-03-01T00:00:00+01:00'),
      },
      {
        startDate: moment('2017-01-01T00:00:00+01:00'),
        endDate: moment('2017-12-01T00:00:00+01:00'),
      },
    ],
      result: 11,
    },
    {
      periods:
        [
          {
            startDate: moment('2016-01-01T00:00:00+01:00'),
            endDate: moment('2016-12-01T00:00:00+01:00'),
          },
          {
            startDate: moment('2017-01-01T00:00:00+01:00'),
            endDate: moment('2017-03-01T00:00:00+01:00'),
          },
          {
            startDate: moment('2017-01-01T00:00:00+01:00'),
            endDate: moment('2017-12-01T00:00:00+01:00'),
          },
        ],
      result: 22,
    },
    {
      periods:
      [
        {
          startDate: moment('2016-01-01T00:00:00+01:00'),
          endDate: moment('2016-12-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2018-01-01T00:00:00+01:00'),
          endDate: moment('2018-12-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2017-01-01T00:00:00+01:00'),
          endDate: moment('2017-12-01T00:00:00+01:00'),
        },
      ],
      result: 33,
    },
    {
      periods:
      [
        {
          startDate: moment('2016-01-01T00:00:00+01:00'),
          endDate: moment('2017-12-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2017-01-01T00:00:00+01:00'),
          endDate: moment('2017-12-01T00:00:00+01:00'),
        },
      ],
      result: 23,
    },
    {

      periods: [], result: 0,
    },
    {

      periods:
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
    ], result: 60,
    },
  ];
