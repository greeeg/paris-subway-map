import { Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source';
import { LineString } from 'ol/geom';
import { Stroke, Style } from 'ol/style';
import { Layer } from 'ol/layer';
import { Lines, Stations, StationLiaison } from '../types';

interface LinesLayerProps {
  lines: Lines;
  stations: Stations;
}

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
                  fromLonLat(station.geolocation),
                  fromLonLat(nextStation.geolocation)
                ])
              });

              feature.setStyle(
                new Style({
                  stroke: new Stroke({
                    color: line.color,
                    width: 10
                  })
                })
              );

              return feature;
            }
          );
        })
        .flat()
    })
  });
};

export default linesLayer;
