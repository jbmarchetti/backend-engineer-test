const moment = require('moment');
exports.datas =
  [
    // Test No Periods
    {

      periods: [], result: 0,
    },

    // Test One Period
    {
      periods: [
        {
          startDate: moment('2017-01-01T00:00:00+01:00'),
          endDate: moment('2017-12-01T00:00:00+01:00'),
        },
      ],
      result: 11,
    },
    // Test 2 Periods (No Overlaps)
    {
      periods: [
        {
          startDate: moment('2017-01-01T00:00:00+01:00'),
          endDate: moment('2017-12-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2018-01-01T00:00:00+01:00'),
          endDate: moment('2018-12-01T00:00:00+01:00'),
        },
      ],
      result: 22,
    },

    // Test 2 Periods (Overlap of 1 Month)
    {
      periods: [
        {
          startDate: moment('2017-01-01T00:00:00+01:00'),
          endDate: moment('2017-12-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2017-12-01T00:00:00+01:00'),
          endDate: moment('2018-12-01T00:00:00+01:00'),
        },
      ],
      result: 23,
    },


    // Test 3 Periods (Overlap 3 month - 1st and 2nd periods)
    {
      periods:
    [
      {
        startDate: moment('2017-01-01T00:00:00+01:00'),
        endDate: moment('2017-12-01T00:00:00+01:00'),
      },
      {
        startDate: moment('2018-01-01T00:00:00+01:00'),
        endDate: moment('2018-12-01T00:00:00+01:00'),
      },
      {
        startDate: moment('2016-01-01T00:00:00+01:00'),
        endDate: moment('2017-03-01T00:00:00+01:00'),
      },
    ],
      result: 34,
    },

    // Test 3 Periods (Overlap - 2nd and 3rd periods)
    {
      periods:
      [
        {
          startDate: moment('2017-01-01T00:00:00+01:00'),
          endDate: moment('2017-12-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2018-01-01T00:00:00+01:00'),
          endDate: moment('2018-12-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2018-09-01T00:00:00+01:00'),
          endDate: moment('2019-05-01T00:00:00+01:00'),
        },
      ],
      result: 27,
    },

    // Test 3 Periods (Overlap  1st and 2nd | 2nd and 3rd periods)
    {
      periods:
        [
          {
            startDate: moment('2017-01-01T00:00:00+01:00'),
            endDate: moment('2018-03-01T00:00:00+01:00'),
          },
          {
            startDate: moment('2018-01-01T00:00:00+01:00'),
            endDate: moment('2018-12-01T00:00:00+01:00'),
          },
          {
            startDate: moment('2018-09-01T00:00:00+01:00'),
            endDate: moment('2019-05-01T00:00:00+01:00'),
          },
        ],
      result: 28,
    },

    // Test same Periods
    {
      periods:
      [
        {
          startDate: moment('2016-01-01T00:00:00+01:00'),
          endDate: moment('2017-01-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2016-01-01T00:00:00+01:00'),
          endDate: moment('2017-01-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2016-01-01T00:00:00+01:00'),
          endDate: moment('2017-01-01T00:00:00+01:00'),
        },
      ],
      result: 12,
    },
    // Test Full Overlap
    {
      periods:
      [
        {
          startDate: moment('2016-01-01T00:00:00+01:00'),
          endDate: moment('2016-12-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2016-01-01T00:00:00+01:00'),
          endDate: moment('2016-03-01T00:00:00+01:00'),
        },
        {
          startDate: moment('2016-03-01T00:00:00+01:00'),
          endDate: moment('2016-10-01T00:00:00+01:00'),
        },
      ],
      result: 11,
    },
  ];
