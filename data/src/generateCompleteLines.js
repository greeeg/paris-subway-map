const fs = require('fs');
const path = require('path');
const { cleanId } = require('./utils');
const metroLines = require('../json/src/realtime-api/metro-lines.json');
const linesToDisplay = require('../json/src/lines-to-display.json');

const lines = {};

metroLines.forEach(line => {
  if (linesToDisplay.includes(line.id)) {
    lines[line.id] = {
      ...line,
      stations: line.stations.map(station => cleanId(station.id))
    };
  }
});

fs.writeFileSync(
  path.join('json', 'generated', 'lines.json'),
  JSON.stringify(lines, null, 2)
);
