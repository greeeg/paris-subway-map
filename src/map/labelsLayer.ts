import { Layer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { Text, Style } from 'ol/style';
import { FeatureLike } from 'ol/Feature';
import { Stations, Station } from '../types';
import { cleanLabel } from './utils';

interface LabelsLayerProps {
  stations: Stations;
}

const getLabelsLayerStyle = (
  feature: FeatureLike,
  resolution: number
): Style => {
  if (resolution > 8) {
    return new Style();
  }

  const station = feature.get('station') as Station;
  return new Style({
    text: new Text({
      text: cleanLabel(station.name),
      textAlign: 'left',
      font: 'bold 16px Helvetica',
      offsetX: 10
    })
  });
};

const labelsLayer = ({ stations }: LabelsLayerProps): Layer => {
  return new VectorLayer({
    source: new VectorSource({
      features: Object.keys(stations).map(id => {
        const station = stations[id] as Station;
        const feature = new Feature(new Point(fromLonLat(station.geolocation)));
        feature.set('station', station);
        return feature;
      })
    }),
    style: getLabelsLayerStyle
  });
};

export default labelsLayer;
