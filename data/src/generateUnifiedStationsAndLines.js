const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const stations = require('../json/generated/stations.json');
const lines = require('../json/generated/lines.json');
const stationsWithTransfers = require('../json/src/stations-with-transfers.json');

const stationsToAdd = { ...stations };

const unifiedStations = {};
const unifiedLines = { ...lines };

const updateStationId = (oldId, newId) => {
  Object.keys(unifiedLines).forEach(lineId => {
    unifiedLines[lineId].stations.forEach((stationId, index) => {
      if (stationId === oldId) {
        unifiedLines[lineId].stations[index] = newId;
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
    name,
    geolocation,
    accessibility,
    stations: stationWithTransfers
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
    name,
    geolocation,
    accessibility,
    stations: [id]
  };

  updateStationId(id, uuid);
});

fs.writeFileSync(
  path.join('json', 'generated', 'stations-unified.json'),
  JSON.stringify(unifiedStations, null, 2)
);

fs.writeFileSync(
  path.join('json', 'generated', 'lines-unified.json'),
  JSON.stringify(unifiedLines, null, 2)
);
