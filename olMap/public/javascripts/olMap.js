var styles = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'white',
        width: 1  
    }),
    fill: new ol.style.Fill({
        color: 'rgba(0,0,0,0.2)'
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

const olmap = new ol.Map({
    target: 'olMap',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        vectorLayer
    ],
    view: new ol.View({
        center: [37.8, -96.9],
        zoom: 4
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

var selected = null;

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
    if (selected !== null) {
        selected.setStyle(styles);
    }
    olmap.forEachFeatureAtPixel(e.pixel, function(f){
        selected = f;
        f.setStyle(highlightStyles);
        return true;
    });
});

olmap.on('click', function(e){
    getCountryname(e.pixel);
});

vectorLayer.on("tileloadstart", function(){
    var loadTime = performance.now();
    return loadTime;
});

vectorLayer.on("tileloadend", function(){
    console.log(loadTime - performance.now());
})