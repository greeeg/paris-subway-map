const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const stations = require('../json/generated/stations.json');
const lines = require('../json/generated/lines.json');
const stationsWithTransfers = require('../json/src/unified-stations.json');
const colors = require('../json/src/colors.json');
const icons = require('../json/src/icons.json');

const stationsToAdd = { ...stations };

const unifiedStations = {};
const unifiedLines = { ...lines };

const updateStationId = (oldId, newId) => {
  Object.keys(unifiedLines).forEach(lineId => {
    unifiedLines[lineId].stations.forEach((stationId, index) => {
      if (stationId === oldId) {
        unifiedLines[lineId].stations[index] = {
          uuid: newId,
          id: oldId
        };
      }
    });
  });
};

const deleteStation = id => {
  delete stationsToAdd[id];
};

stationsWithTransfers.forEach(stationWithTransfers => {
  const uuid = uuidv4();
  const { name, geolocation, accessibility } = stations[
    stationWithTransfers.stations[0]
  ];

  unifiedStations[uuid] = {
    uuid,
    name,
    geolocation,
    accessibility,
    stations: stationWithTransfers.stations
  };

  stationWithTransfers.stations.forEach(id => {
    updateStationId(id, uuid);
    deleteStation(id);
  });
});

Object.keys(stationsToAdd).forEach(id => {
  const uuid = uuidv4();

  const { name, geolocation, accessibility } = stationsToAdd[id];

  unifiedStations[uuid] = {
    uuid,
    name,
    geolocation,
    accessibility,
    stations: [id]
  };

  updateStationId(id, uuid);
});

Object.keys(unifiedLines).forEach(lineId => {
  unifiedLines[lineId].color = colors.lines.metro[unifiedLines[lineId].code];
  unifiedLines[lineId].icon = icons.lines.metro[unifiedLines[lineId].code];
});

fs.writeFileSync(
  path.join('json', 'generated', 'stations-unified.json'),
  JSON.stringify(unifiedStations, null, 2)
);

fs.writeFileSync(
  path.join('json', 'generated', 'lines-unified.json'),
  JSON.stringify(unifiedLines, null, 2)
);

fs.writeFileSync(
  path.join('..', 'src', 'data', 'stations-unified.json'),
  JSON.stringify(unifiedStations, null, 2)
);

fs.writeFileSync(
  path.join('..', 'src', 'data', 'lines-unified.json'),
  JSON.stringify(unifiedLines, null, 2)
);
