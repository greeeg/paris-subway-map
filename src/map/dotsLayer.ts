import { Layer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { RegularShape, Fill, Style } from 'ol/style';
import { Stations, Station } from '../types';

interface DotsLayerProps {
  stations: Stations;
}

const dotsLayer = ({ stations }: DotsLayerProps): Layer => {
  return new VectorLayer({
    source: new VectorSource({
      features: Object.keys(stations).map(id => {
        const station = stations[id] as Station;
        const feature = new Feature(new Point(fromLonLat(station.geolocation)));
        return feature;
      })
    }),
    style: new Style({
      image: new RegularShape({
        fill: new Fill({ color: 'black' }),
        points: 4,
        radius: 4,
        angle: Math.PI / 4
      })
    })
  });
};

export default dotsLayer;
