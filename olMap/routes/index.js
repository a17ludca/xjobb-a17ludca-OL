var express = require('express');
var router = express.Router();

/* OL home page. */
router.get('/OL', function(req, res, next) {
  res.render('indexOL', { title: 'Map with OpenLayers' });
});

/* Leaflet+D3 home page. */
router.get('/L3', function(req, res, next) {
  res.render('indexL3', { title: 'Map with Leaflet and D3' });
});

module.exports = router;
