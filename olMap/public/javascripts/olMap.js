var startTime = performance.now();
var startTimeZoom;
var newTime;

var styles = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'white',
        width: 1  
    }),
    fill: new ol.style.Fill({
        color: 'rgba(0,0,0,0.2)'
    })
});  

var highlightStyles = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(6,69,173,0.6)'
    }),
    stroke: new ol.style.Stroke({
      color: 'white',
      width: 1
    })
});

var clickedStyles = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(6,69,173,1)'
    }),
    stroke: new ol.style.Stroke({
      color: 'white',
      width: 1
    })
});

var vectorSource = new ol.source.Vector({
    url: 'data/countries.geojson',
    format: new ol.format.GeoJSON(),
    
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: styles
});

var osmMap = new ol.layer.Tile({
    source: new ol.source.OSM()
});

const olmap = new ol.Map({
    target: 'olMap',
    layers: [osmMap, vectorLayer], 
    view: new ol.View({
        center: [37.8, -96.9],
        zoom: 4
    })
}); 
measureLoad();
olmap.on('movestart', function(){
    startTimeZoom = performance.now();
});
olmap.on('moveend', function(){
    measureZoom();
});

var selected = null;
var featureClicked = null;

var getCountryname = function(pixel){
    var feature = olmap.forEachFeatureAtPixel(pixel, function(feature){
        return feature;
    });
    var search = document.getElementById("search");
    if(feature){
        search.value = feature.values_.ADMIN;
    }
};

olmap.on('pointermove', function(e){
    if (selected !== null){
            selected.setStyle(undefined);
            selected = null;
    }
    olmap.forEachFeatureAtPixel(e.pixel, function(f){
        selected = f;
        f.setStyle(highlightStyles);
        return true;
    });
});

olmap.on('click', function(e){
    getCountryname(e.pixel);
    if (featureClicked !== null) {
        featureClicked.setStyle(undefined);
        featureClicked = null; 
    } 
    olmap.forEachFeatureAtPixel(e.pixel, function(f){
        featureClicked = f;
        f.setStyle(clickedStyles);
        return true;
    });
});
function measureLoad(){
    olmap.once('rendercomplete', function(){
        newTime = performance.now();
        console.log("Refresh loadtime: " + (newTime - startTime) + " ms");
    });
}

function measureZoom() {
    olmap.once('rendercomplete', function(){
        newTime = performance.now();
        console.log("Zoom loadtime: " + (newTime - startTimeZoom) + " ms");
    });
}

