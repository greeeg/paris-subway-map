import React, { useEffect } from 'react';
import * as ol from 'ol';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Select } from 'ol/interaction';
import styled from 'styled-components';
import tileLayer from '../map/tileLayer';
import linesLayer from '../map/linesLayer';
import dotsLayer from '../map/dotsLayer';
import labelsLayer from '../map/labelsLayer';
import stations from '../data/stations-unified.json';
import lines from '../data/lines-unified.json';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../config';
import { Station } from '../types';

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
        tileLayer(),
        linesLayer({ lines, stations }),
        dotsLayer({ stations }),
        labelsLayer({ stations })
      ],
      view: new ol.View({
        center: fromLonLat(DEFAULT_CENTER),
        zoom: DEFAULT_ZOOM
      })
    });

    map.on('singleclick', e => {
      map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        const type = feature.get('type');
        if (type === 'label' || type === 'dot') {
          const station = feature.get('station') as Station;
          console.log(station.name);
        }
      });
    });

    map.on('moveend', event => {
      const view = event.map.getView();
      const center = toLonLat(event.map.getView().getCenter() || []);
      const zoom = view.getZoom();
    });
  }, []);

  return <MapWrapper id="map" />;
};

export default Map;
