mapboxgl.accessToken = secrets.api.mapbox;

const sw = [5.053652, 52.070356]; // South-West
const ne = [5.064011, 52.079448]; // North-East
const nw = [sw[0], ne[1]]; // North-West
const se = [ne[0], sw[1]]; // South-East

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [5.059045, 52.075577],
    zoom: 14.75,
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

    // Stage 2
    const dom = new stage("De Dom", "#A100FE", 2);

    dom.addAreaCoords(52.076270, 5.060228);
    dom.addAreaCoords(52.076174, 5.060442);
    dom.addAreaCoords(52.075119, 5.059975);
    dom.addAreaCoords(52.075244, 5.059498);
    dom.addAreaCoords(52.076032, 5.059547);

    dom.setPointerCoords(52.075845, 5.059938);

    // Stage 3
    const austerlitz = new stage("Pyramide van Austerlitz", "#808080", 3);

    austerlitz.addAreaCoords(52.078321, 5.058726);
    austerlitz.addAreaCoords(52.078433, 5.059069);
    austerlitz.addAreaCoords(52.078344, 5.059616);
    austerlitz.addAreaCoords(52.078113, 5.059653);
    austerlitz.addAreaCoords(52.077908, 5.058774);
    austerlitz.addAreaCoords(52.078024, 5.058544);

    austerlitz.setPointerCoords(52.078222, 5.059042);

    // Stage 4
    const domUnder = new stage("Dom Under", "#FF008A", 4);

    domUnder.addAreaCoords(52.074563, 5.061625);
    domUnder.addAreaCoords(52.074451, 5.062278);
    domUnder.addAreaCoords(52.073976, 5.062085);
    domUnder.addAreaCoords(52.074062, 5.061378);

    domUnder.setPointerCoords(52.074267, 5.061807);


    mainstage.buildStageArea();
    dom.buildStageArea();
    austerlitz.buildStageArea();
    domUnder.buildStageArea();
    buildFacilities();
    mainstage.addPointer();
    dom.addPointer();
    austerlitz.addPointer();
    domUnder.addPointer();
});


function buildFacilities() {
    const toilets = [];

    // Toilets stage 1 and 4
    toilets[0] = new facility(0);

    toilets[0].addAreaCoords(52.073589, 5.062019);
    toilets[0].addAreaCoords(52.073527, 5.062383);
    toilets[0].addAreaCoords(52.073217, 5.062201);
    toilets[0].addAreaCoords(52.073273, 5.061847);

    toilets[0].setPointerCoords(52.073405, 5.062126);

    toilets[0].buildArea();
    toilets[0].addPointer();

    // Toilets stage 4
    toilets[1] = new facility(0);

    toilets[1].addAreaCoords(52.074621, 5.061327);
    toilets[1].addAreaCoords(52.074598, 5.061510);
    toilets[1].addAreaCoords(52.074460, 5.061456);
    toilets[1].addAreaCoords(52.074496, 5.061263);

    toilets[1].setPointerCoords(52.074529, 5.061392);

    toilets[1].buildArea();
    toilets[1].addPointer();

    // Toilets stage 3

    toilets[2] = new facility(0);

    toilets[2].addAreaCoords(52.078017, 5.058365);
    toilets[2].addAreaCoords(52.078007, 5.058526);
    toilets[2].addAreaCoords(52.077803, 5.058328);
    toilets[2].addAreaCoords(52.077823, 5.058253);

    toilets[2].setPointerCoords(52.077968, 5.058403);

    toilets[2].buildArea();
    toilets[2].addPointer();

    // Toilets stage 2
    toilets[3] = new facility(0);

    toilets[3].addAreaCoords(52.076128, 5.061064);
    toilets[3].addAreaCoords(52.076095, 5.061182);
    toilets[3].addAreaCoords(52.075983, 5.061134);
    toilets[3].addAreaCoords(52.076016, 5.061021);

    toilets[3].setPointerCoords(52.076049, 5.061096);

    toilets[3].buildArea();
    toilets[3].addPointer();


    // Food
    const food = [];

    // Foodhal (stage 1 and 4)
    food[0] = new facility(1);

    food[0].addAreaCoords(52.074047, 5.060634);
    food[0].addAreaCoords(52.073942, 5.061259);
    food[0].addAreaCoords(52.073579, 5.061109);
    food[0].addAreaCoords(52.073683, 5.060473);

    food[0].setPointerCoords(52.073821, 5.060857);

    food[0].buildArea();
    food[0].addPointer();

    // Food field (behind stage 2) (serves stage 2 and 3)
    food[1] = new facility(1);

    food[1].addAreaCoords(52.076622, 5.060195);
    food[1].addAreaCoords(52.076539, 5.060681);
    food[1].addAreaCoords(52.076335, 5.060560);
    food[1].addAreaCoords(52.076379, 5.060174);
    food[1].addAreaCoords(52.076508, 5.060045);

    food[1].setPointerCoords(52.076504, 5.060348);

    food[1].buildArea();
    food[1].addPointer();

    // Bars
    const bars = [];

    // Bar 1 mainstage (stage 1)
    bars[0] = new facility(2);
    bars[0].setPointerCoords(52.073197, 5.060655);
    bars[0].addPointer();

    // Bar 2 mainstage (stage 1)
    bars[1] = new facility(2);
    bars[1].setPointerCoords(52.073371, 5.059816);
    bars[1].addPointer();

    // Bar stage 4
    bars[2] = new facility(2);
    bars[2].setPointerCoords(52.074195, 5.061151);
    bars[2].addPointer();

    // Bar 1 stage 2
    bars[3] = new facility(2);
    bars[3].setPointerCoords(52.076175, 5.059832);
    bars[3].addPointer();

    // Bar 2 stage 2
    bars[4] = new facility(2);
    bars[4].setPointerCoords(52.075502, 5.060001);
    bars[4].addPointer();

    // Bar 1 stage 3
    bars[5] = new facility(2);
    bars[5].setPointerCoords(52.078104, 5.058594);
    bars[5].addPointer();

    // Bar 2 stage 3
    bars[6] = new facility(2);
    bars[6].setPointerCoords(52.078345, 5.059624);
    bars[6].addPointer();

    // Lockers
    const lockers = new facility(3);

    lockers.addAreaCoords(52.077249, 5.057899);
    lockers.addAreaCoords(52.077239, 5.057995);
    lockers.addAreaCoords(52.077120, 5.057899);
    lockers.addAreaCoords(52.077130, 5.057792);

    lockers.setPointerCoords(52.077186, 5.057899);

    lockers.buildArea();
    lockers.addPointer();

    // Ice Creams
    const iceCreams = [];

    // Foodhal
    iceCreams[0] = new facility(4);
    iceCreams[0].setPointerCoords(52.073996, 5.060678);
    iceCreams[0].addPointer();

    // Food field
    iceCreams[1] = new facility(4);
    iceCreams[1].setPointerCoords(52.076355, 5.060185);
    iceCreams[1].addPointer();

    // Stage 3
    iceCreams[2] = new facility(4);
    iceCreams[2].setPointerCoords(52.078287, 5.059933);
    iceCreams[2].addPointer();

    // First Aid
    const firstAid = new facility(5);

    firstAid.addAreaCoords(52.077715, 5.061462);
    firstAid.addAreaCoords(52.077704, 5.061520);
    firstAid.addAreaCoords(52.077632, 5.061508);
    firstAid.addAreaCoords(52.077631, 5.061435);

    firstAid.setPointerCoords(52.077666, 5.061481);

    firstAid.buildArea();
    firstAid.addPointer();
}


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

        this.setClickEvent("polygon");
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

        this.setClickEvent("pointer");
    }

    setClickEvent(type) {
        const layerId = type === "polygon" ? this.fillId : `${this.id}-circle-layer`;

        map.on('mouseenter', layerId, () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', layerId, () => {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', layerId, (e) => {
            // Pass relevant data to your modal function
            openStageModal((this.stageNr - 1));
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
        this.typeIndex = type;
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
                'fill-opacity': 0.25
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
                        14, this.typeIndex != 2 ? this.typeIndex != 4 ? 0.15 : 0 : 0,
                        15.74, this.typeIndex != 2 ? this.typeIndex != 4 ? 0.15 : 0 : 0,
                        15.75, 0.45,
                        22, 0.45
                    ],
                    'icon-allow-overlap': false
                }
            });
        });
    }
}