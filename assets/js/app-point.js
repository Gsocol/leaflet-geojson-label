var map = L.map('map').setView([-7.9008559,110.4345703],10);

var basemap = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
  attribution: 'Google | <a href="#">unsorry@2020</a>'
});
basemap.addTo(map);

var titikdesa = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({
        className: 'leaflet-mouse-marker',
      }),
      interactive: false
    });
  },
  onEachFeature: function (feature, layer) {
    var content = layer.feature.properties.Desa.toString();
    layer.bindTooltip(content, {
      direction: 'center',
      permanent: true,
      className: 'styleLabelDesa'
    });
  }  
});
$.getJSON("data/titikdesa.geojson", function (data) {
  titikdesa.addData(data);
  map.addLayer(titikdesa);
  map.fitBounds(titikdesa.getBounds());
});

var titikkecamatan = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({
        className: 'leaflet-mouse-marker',
      }),
      interactive: false
    })
  },
  onEachFeature: function (feature, layer) {
    var content = "Kec. " + layer.feature.properties.Kecamatan.toString();
    layer.bindTooltip(content, {
      direction: 'center',
      permanent: true,
      className: 'styleLabelKecamatan'
    });
  }  
});
$.getJSON("data/titikkecamatan.geojson", function (data) {
  titikkecamatan.addData(data);
  map.addLayer(titikkecamatan);
});

resetLabels([titikdesa, titikkecamatan]);
map.on("zoomend", function(){
  resetLabels([titikdesa, titikkecamatan]);
});
map.on("move", function(){
  resetLabels([titikdesa, titikkecamatan]);
});
map.on("layeradd", function(){
  resetLabels([titikdesa, titikkecamatan]);
});
map.on("layerremove", function(){
  resetLabels([titikdesa, titikkecamatan]);
});

L.control.scale({
  maxWidth: 150,
  imperial: false,
}).addTo(map);