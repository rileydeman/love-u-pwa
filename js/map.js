mapboxgl.accessToken = secrets.api.mapbox;

const sw = [5.053652, 52.070356]; // South-West
const ne = [5.064011, 52.079448]; // North-East
const nw = [sw[0], ne[1]]; // North-West
const se = [ne[0], sw[1]]; // South-East

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

// setInterval(() => {
//     console.log(map.getZoom());
// }, 1000);

map.on("load", () => {
    // Stage 1
    const mainstage = new stage("Mainstage", "#FF0000", 1);

    mainstage.addAreaCoords(52.073401, 5.060822);
    mainstage.addAreaCoords(52.072768, 5.060544);
    mainstage.addAreaCoords(52.072894, 5.059750);
    mainstage.addAreaCoords(52.073134, 5.059847);
    mainstage.addAreaCoords(52.073273, 5.059778);
    mainstage.addAreaCoords(52.073870, 5.060072);
    mainstage.addAreaCoords(52.073771, 5.060324);
    mainstage.addAreaCoords(52.073451, 5.060662);

    mainstage.setPointerCoords(52.073203, 5.060356);

    mainstage.buildStageArea();
    mainstage.addPointer();

    // Stage 2
    const dom = new stage("De Dom", "#A100FE", 2);

    dom.addAreaCoords(52.076270, 5.060228);
    dom.addAreaCoords(52.076174, 5.060442);
    dom.addAreaCoords(52.075119, 5.059975);
    dom.addAreaCoords(52.075244, 5.059498);
    dom.addAreaCoords(52.076032, 5.059547);

    dom.setPointerCoords(52.075845, 5.059938);

    dom.buildStageArea();
    dom.addPointer();

    // Stage 3
    const austerlitz = new stage("Pyramide van Austerlitz", "#808080", 3);

    austerlitz.addAreaCoords(52.078482, 5.058801);
    austerlitz.addAreaCoords(52.078439, 5.059170);
    austerlitz.addAreaCoords(52.078271, 5.059256);
    austerlitz.addAreaCoords(52.077997, 5.059031);
    austerlitz.addAreaCoords(52.078037, 5.058565);

    austerlitz.setPointerCoords(52.078261, 5.058919);

    austerlitz.buildStageArea();
    austerlitz.addPointer();

    // Stage 4
    const domUnder = new stage("Dom Under", "#FF008A", 4);

    domUnder.addAreaCoords(52.074563, 5.061625);
    domUnder.addAreaCoords(52.074451, 5.062278);
    domUnder.addAreaCoords(52.073976, 5.062085);
    domUnder.addAreaCoords(52.074062, 5.061378);

    domUnder.setPointerCoords(52.074267, 5.061807);

    domUnder.buildStageArea();
    domUnder.addPointer();

    const toilets = [];

    toilets[0] = new facility(0);

    toilets[0].addAreaCoords(52.073589, 5.062019);
    toilets[0].addAreaCoords(52.073527, 5.062383);
    toilets[0].addAreaCoords(52.073217, 5.062201);
    toilets[0].addAreaCoords(52.073273, 5.061847);

    toilets[0].setPointerCoords(52.073405, 5.062126);

    toilets[0].buildArea();
    toilets[0].addPointer();
});


class stage {
    constructor(name, colour, nr) {
        this.id = name.replace(" ", "").toLowerCase();
        this.fillId = `${this.id}-fill`;
        this.pointerId = `${this.id}-pointer`;
        this.name = name;
        this.colour = colour;
        this.stageNr = nr;
        this.areaCoords = [];
        this.pointerCoords = [];
    }

    addAreaCoords(lat, long) {
        this.areaCoords.push([long, lat]);
    }

    setPointerCoords(lat, long) {
        this.pointerCoords = [long, lat];
    }

    buildStageArea() {
        map.addSource(`${this.id}`, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        this.areaCoords,
                        this.areaCoords[0] // closed loop
                    ]
                }
            }
        });

        map.addLayer({
            'id': `${this.fillId}`,
            'type': 'fill',
            'source': `${this.id}`,
            'layout': {},
            'paint': {
                'fill-color': this.colour,
                'fill-opacity': 0.5
            }
        });
    }

    addPointer() {
        map.addSource(`${this.pointerId}`, {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: this.pointerCoords
                    },
                    properties: {
                        number: `${this.stageNr}`
                    }
                }]
            }
        });

        map.addLayer({
            id: `${this.id}-circle-layer`,
            type: 'circle',
            source: `${this.pointerId}`,
            paint: {
                'circle-radius': 18,
                'circle-color': '#E3B505',
                'circle-opacity': 0.8,
                'circle-stroke-color': '#247BA0',
                'circle-stroke-width': 2
            }
        });

        map.addLayer({
            id: `${this.id}-number-layer`,
            type: 'symbol',
            source: `${this.pointerId}`,
            layout: {
                'text-field': ['get', 'number'],
                'text-size': 19,
                'text-font': ["DIN Pro Bold"]
            },
            paint: {
                'text-color': '#ffffff'
            }
        });
    }
}

const facilityTypes = [
    {
        name: "Toilet",
        img: "toilet-pointer.png",
        total: 0
    },
    {
        name: "Food",
        img: "food-pointer.png",
        total: 0
    },
    {
        name: "Bar",
        img: "bar-pointer.png",
        total: 0
    },
    {
        name: "Lockers",
        img: "lockers-pointer.png",
        total: 0
    },
    {
        name: "Ice Creams",
        img: "ice-cream-pointer.png",
        total: 0
    },
    {
        name: "First Aid",
        img: "first-aid-pointer.png",
        total: 0
    }
];

class facility {
    constructor(type) {
        facilityTypes[type].total++;
        this.id = facilityTypes[type].name.replace(" ", "").toLowerCase() + facilityTypes[type].total;
        this.fillId = `${this.id}-fill`;
        this.pointerId = `${this.id}-pointer`;
        this.name = facilityTypes[type].name;
        this.img = facilityTypes[type].img;
        this.areaCoords = [];
        this.pointerCoords = [];
    }

    addAreaCoords(lat, long) {
        this.areaCoords.push([long, lat]);
    }

    setPointerCoords(lat, long) {
        this.pointerCoords = [long, lat];
    }

    buildArea() {
        map.addSource(`${this.id}`, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        this.areaCoords,
                        this.areaCoords[0] // closed loop
                    ]
                }
            }
        });

        // Add a fill layer to color the polygon
        map.addLayer({
            'id': `${this.fillId}`,
            'type': 'fill',
            'source': `${this.id}`,
            'layout': {},
            'paint': {
                'fill-color': "#98FF98",
                'fill-opacity': 0.5
            }
        });
    }

    addPointer() {
        map.loadImage(`https://loveufestival.rileydeman.com/assets/img/map/${this.img}`, (error, image) => {
            if (error) throw error;
            map.addImage(`${this.pointerId}`, image);

            // Add GeoJSON source
            map.addSource(`${this.pointerId}`, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: this.pointerCoords
                        }
                    }]
                }
            });

            // Add the image symbol layer
            map.addLayer({
                id: `${this.pointerId}`,
                type: 'symbol',
                source: `${this.pointerId}`,
                layout: {
                    'icon-image': `${this.pointerId}`,
                    'icon-size': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        14, 0.15,
                        15.74, 0.15,
                        15.75, 0.45,
                        22, 0.45
                    ],
                    'icon-allow-overlap': true
                }
            });
        });
    }
}