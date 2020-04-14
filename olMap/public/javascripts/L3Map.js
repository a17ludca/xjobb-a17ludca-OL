var startTime = performance.now();
var startTimeZoom;
var newTime;
var l3map = L.map('l3Map').setView([37.8, -96.9], 4);
var search = document.getElementById("search");

var mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(l3map);



var svg = d3.select(l3map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

var overlay = "data/countries.geojson";
d3.json(overlay, function(collection) {
    var transform = d3.geo.transform({point: projectPoint}),
        path = d3.geo.path().projection(transform);
    
    var feature = g.selectAll("path")
        .data(collection.features)
        .enter().append("path")
        .on("click", function(b){findCountry(b); clicked.call(this);});

    l3map.on("zoom", function(){startZoom(); reset();});
    reset();

    function reset(){
        var bounds = path.bounds(collection),
            topLeft = bounds[0],
            bottomRight = bounds[1];
        svg .attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");
            
        svg.selectAll("g")
            .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")")    
        feature.attr("d", path);
    }
    
    function projectPoint(x, y) {
        var point = l3map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
    }
    measureLoad();
});
function startZoom(){
    startTimeZoom = performance.now();
}
function measureLoad(){
    newTime = performance.now();
    var rfshLoad = newTime - startTime;
    var temp = rfshLoad.toFixed(2);
    console.log("Refresh loadtime: " + temp + " ms");
}
function measureZoom(){
    newTime = performance.now();
    var zoomLoad = newTime - startTimeZoom;
    var temp = zoomLoad.toFixed(2);
    console.log("Refresh loadtime: " + temp + " ms");
}

mapLayer.on('load', measureZoom);

function clicked(){
    if(!d3.select(this).classed('clicked')){
        d3.select('.clicked').classed('clicked', false);
        d3.select(this).classed('clicked', true);
    }else{
        d3.select(this).classed('clicked', false);
        search.value = "";
    }
}
function findCountry(b){
    term = b.properties.ADMIN;
    search.value = term;
}

