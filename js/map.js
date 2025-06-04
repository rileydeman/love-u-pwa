mapboxgl.accessToken = secrets.api.mapbox;

const sw = [5.053652, 52.070356]; // South-West
const ne = [5.064011, 52.079448]; // North-East

const mapBounds = [
    sw, // South-West
    ne // North-East
];

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/satellite-v9',
    // style: 'mapbox://styles/rileydeman/cmb7z5apf00qd01sc7q9431p5', // style URL
    center: [5.059045, 52.075577], // starting position [lng, lat]
    zoom: 15.25, // starting zoom
    maxBounds: mapBounds
});


map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

map.on("load", () => {

    // setTimeout(() => {
    //     const canvas = map.getCanvas();
    //     const dataURL = canvas.toDataURL('image/png');
    //
    //     // Create a download link
    //     const link = document.createElement('a');
    //     link.href = dataURL;
    //     link.download = 'map-export.png';
    //     link.click();
    // }, 1000);


    map.addSource('map', {
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
        id: 'map',
        type: 'raster',
        source: 'map',
        paint: {
            'raster-opacity': 1.0
        }
    });


    // map.loadImage(
    //     'https://loveufestival.rileydeman.com/assets/img/map/marker-stage1.png',
    //     (error, image) => {
    //         if (error) throw error;
    //
    //         // Add the image to the map style.
    //         map.addImage('cat', image, { sdf: false });
    //
    //         // Add a data source containing one point feature.
    //         map.addSource('point', {
    //             'type': 'geojson',
    //             'data': {
    //                 'type': 'FeatureCollection',
    //                 'features': [
    //                     {
    //                         'type': 'Feature',
    //                         'geometry': {
    //                             'type': 'Point',
    //                             'coordinates': [5.060272, 52.073172]
    //                         }
    //                     }
    //                 ]
    //             }
    //         });
    //
    //         // Add a layer to use the image to represent the data.
    //         map.addLayer({
    //             'id': 'points',
    //             'type': 'symbol',
    //             'source': 'point', // reference the data source
    //             'layout': {
    //                 'icon-image': 'cat', // reference the image
    //                 'icon-size': 0.5,
    //                 'icon-allow-overlap': true,
    //                 'icon-ignore-placement': true
    //             }
    //         });
    //     }
    // );

});