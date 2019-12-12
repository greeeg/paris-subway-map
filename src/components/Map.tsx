import React, { useEffect } from 'react';
import * as ol from 'ol';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { RegularShape, Fill, Style } from 'ol/style';
import styled from 'styled-components';

import stations from '../data/stations.json';

interface Station {
  name: string;
  geolocation: [number, number];
}

const MapWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Map: React.FC = () => {
  useEffect(() => {
    const map = new ol.Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            features: Object.keys(stations).map(id => {
              const station = (stations as any)[id] as Station;
              const feature = new Feature(
                new Point(fromLonLat(station.geolocation.reverse()))
              );
              return feature;
            })
          }),
          style: new Style({
            image: new RegularShape({
              fill: new Fill({ color: 'red' }),
              points: 4,
              radius: 10,
              angle: Math.PI / 4
            })
          })
        })
      ],
      view: new ol.View({
        center: fromLonLat([2.343501576081387, 48.86187326806126]),
        zoom: 13
      })
    });

    map.on('moveend', event => {
      const view = event.map.getView();
      const center = toLonLat(event.map.getView().getCenter());
      const zoom = view.getZoom();

      console.log(zoom, center);
    });
  }, []);

  return <MapWrapper id="map" />;
};

export default Map;
