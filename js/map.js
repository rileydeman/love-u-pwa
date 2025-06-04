mapboxgl.accessToken = secrets.api.mapbox;

const sw = [5.053652, 52.070356]; // South-West
const ne = [5.064011, 52.079448]; // North-East

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [5.059045, 52.075577],
    zoom: 15.25,
    maxBounds: [sw, ne]
});

map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

map.on("load", () => {
    map.addSource('festival-map-overlay', {
        type: 'image',
        url: 'https://loveufestival.rileydeman.com/assets/img/map/map-loveufestival.png',
        coordinates: [
            [sw[0], ne[1]], // top-left
            [ne[0], ne[1]], // top-right
            [ne[0], sw[1]], // bottom-right
            [sw[0], sw[1]]  // bottom-left
        ]
    });

    map.addLayer({
        id: 'festival-map-overlay-layer',
        type: 'raster',
        source: 'festival-map-overlay',
        paint: {
            'raster-opacity': 1.0
        }
    });
});
