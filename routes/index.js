'use strict';

const express = require('express');
const router = express.Router();

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('_data/rest_data.json', (err, data) => {
    if (err) throw err;
    let weather = JSON.parse(data);
    const trends = {
      temps: [],
      barom: []
    };
    for (let obs of weather) {
      trends.temps.push(obs.tempf);
      trends.barom.push(obs.baromrelin);
    }
    trends.temps = trends.temps.join(',');
    trends.barom = trends.barom.join(',');
    res.render('index', { title: 'Current conditions', current_obs: weather[0], trends: trends });
  });
});

module.exports = router;

// Output wind direction from degrees
function wind_direction(degrees) {
  const d = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'];
  const index = Math.round(degrees/22.5);
  return d[index];
}
