const fs = require('fs');
const path = require('path');
const { cleanId } = require('./utils');
const metroLines = require('../json/src/realtime-api/metro-lines.json');
const geoPositions = require('../json/src/datasets/positions-geographiques-des-stations-du-reseau-ratp.json');
const accessibilityPlaces = require('../json/src/datasets/accessibilite-des-gares-et-stations-metro-et-rer-ratp.json');

const stations = {};

metroLines.forEach(line => {
  line.stations.forEach(station => {
    /*
     * The `id` property is made of two
     * stations ids, one for each direction
     * eg: `2035-2154`
     * note: `-1797` is possible
     */
    const [firstId, secondId] = station.id.split('-');
    const id = !!firstId ? firstId : secondId;

    const matchingGeoPosition = geoPositions.find(
      position => position.fields.stop_id === id
    );

    const matchingAccessibilityPlace = accessibilityPlaces.find(
      place => place.fields.idptar === id
    );

    const mobilityDisabilityCompliant =
      matchingAccessibilityPlace.fields.ufr === 1 &&
      matchingAccessibilityPlace.fields.accessibilitequaitrain === 1;

    const visionDisabilityCompliant =
      matchingAccessibilityPlace.fields.annoncesonoreprochainpassage === 1 &&
      matchingAccessibilityPlace.fields.annoncesonoresituationsperturbees === 1;

    stations[cleanId(station.id)] = {
      ...station,
      lineId: line.id,
      // LonLat instead of LatLon
      geolocation: matchingGeoPosition.fields.stop_coordinates.reverse(),
      accessibility: {
        vision: visionDisabilityCompliant,
        mobility: mobilityDisabilityCompliant
      }
    };
  });
});

fs.writeFileSync(
  path.join('json', 'generated', 'stations.json'),
  JSON.stringify(stations, null, 2)
);
