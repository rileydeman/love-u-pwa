mapboxgl.accessToken = secrets.api.mapbox;

const mapBounds = [
    [5.053652, 52.070356], // South-West
    [5.064011, 52.079448] // North-East
];

const map = new mapboxgl.Map({
    container: 'map', // container id
    //style: 'mapbox://styles/mapbox/streets-v12',
    style: 'mapbox://styles/rileydeman/cmb7z5apf00qd01sc7q9431p5', // style URL
    center: [5.059045, 52.075577], // starting position [lng, lat]
    zoom: 15.25, // starting zoom
    maxBounds: mapBounds
});

map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right');