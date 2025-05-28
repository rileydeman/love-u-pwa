mapboxgl.accessToken = secrets.api.mapbox;

const mapBounds = [
    [5.053652, 52.070356],
    [5.068031, 52.079411]
];

const map = new mapboxgl.Map({
    container: 'map', // container id
    //style: 'mapbox://styles/mapbox/streets-v12',
    style: 'mapbox://styles/rileydeman/cmb7z5apf00qd01sc7q9431p5', // style URL
    center: [5.059045, 52.075377], // starting position [lng, lat]
    zoom: 15.25, // starting zoom
    maxBounds: mapBounds
});