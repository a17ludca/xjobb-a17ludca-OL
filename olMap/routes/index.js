var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/OL', function(req, res, next) {
  res.render('indexOL', { title: 'Map with OpenLayers' });
});

router.get('/L3', function(req, res, next) {
  res.render('indexL3', { title: 'Map with Leaflet and D3' });
});

module.exports = router;
