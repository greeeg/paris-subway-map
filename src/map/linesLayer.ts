import { Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source';
import { LineString } from 'ol/geom';
import { Stroke, Style } from 'ol/style';
import { Layer } from 'ol/layer';
import { FeatureLike } from 'ol/Feature';
import { Lines, Stations, StationLiaison, Station, Line } from '../types';
import { clamp } from './utils';

interface LinesLayerProps {
  lines: Lines;
  stations: Stations;
}

const getCenteredIndex = (index: number, length: number): number => {
  if (length === 2) {
    if (index === 0) {
      return -0.25;
    } else if (index === 1) {
      return 0.25;
    }
  } else if (length === 3) {
    if (index === 0) {
      return -0.5;
    } else if (index === 1) {
      return 0;
    } else if (index === 2) {
      return 0.5;
    }
  } else if (length === 4) {
    if (index === 0) {
      return -0.75;
    } else if (index === 1) {
      return -0.25;
    } else if (index === 2) {
      return 0.25;
    } else if (index === 3) {
      return 0.75;
    }
  } else if (length === 5) {
    if (index === 0) {
      return -1;
    } else if (index === 1) {
      return -0.5;
    } else if (index === 2) {
      return 0;
    } else if (index === 3) {
      return 0.5;
    } else if (index === 4) {
      return 1;
    }
  }

  return 0;
};

const getPositionAtStation = (
  station: Station,
  stationIdForLine: string
): number[] => {
  const index = station.stations.findIndex(id => id === stationIdForLine);
  const position = fromLonLat(station.geolocation);

  return [
    position[0] + getCenteredIndex(index, station.stations.length) * 10,
    position[1]
  ];
};

const getLinesLayerStyle = (
  feature: FeatureLike,
  resolution: number
): Style => {
  const line = feature.get('line') as Line;

  return new Style({
    stroke: new Stroke({
      color: line.color,
      width: clamp(20 * (1 / resolution), 8, 14)
    })
  });
};

const linesLayer = ({ lines, stations }: LinesLayerProps): Layer => {
  return new VectorLayer({
    source: new VectorSource({
      features: Object.keys(lines)
        .map(lineId => {
          const line = lines[lineId];
          return line.stations.map(
            (stationLiaison: StationLiaison, index: number) => {
              if (index === line.stations.length - 1) {
                return new Feature();
              }

              const nextStationLiaison = line.stations[index + 1];
              const station = stations[stationLiaison.uuid];
              const nextStation = stations[nextStationLiaison.uuid];

              const feature = new Feature({
                geometry: new LineString([
                  getPositionAtStation(station, stationLiaison.id),
                  getPositionAtStation(nextStation, nextStationLiaison.id)
                ])
              });

              feature.set('type', 'line');
              feature.set('line', line);

              return feature;
            }
          );
        })
        .flat()
    }),
    style: getLinesLayerStyle
  });
};

export default linesLayer;
