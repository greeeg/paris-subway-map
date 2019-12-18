import { Geolocation } from 'ol';
import { Layer, Vector as VectorLayer } from 'ol/layer';
import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { Fill, Style, Circle } from 'ol/style';

interface GeolocationLayerProps {
  geolocation: Geolocation;
}

const geolocationLayer = ({ geolocation }: GeolocationLayerProps): Layer => {
  const feature = new Feature();

  geolocation.on('change:position', function() {
    var coordinates = geolocation.getPosition();

    if (coordinates) {
      feature.setGeometry(new Point(coordinates));
    }
  });

  return new VectorLayer({
    source: new VectorSource({
      features: [feature]
    }),
    style: geolocation
      ? new Style({
          image: new Circle({
            radius: 5,
            fill: new Fill({
              color: 'rgba(0, 79, 255, 1)'
            })
          })
        })
      : new Style()
  });
};

export default geolocationLayer;
