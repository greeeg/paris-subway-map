import React, { useEffect } from 'react';
import * as ol from 'ol';
import { fromLonLat, toLonLat } from 'ol/proj';
import styled from 'styled-components';
import tileLayer from '../map/tileLayer';
import linesLayer from '../map/linesLayer';
import dotsLayer from '../map/dotsLayer';
import stations from '../data/stations-unified.json';
import lines from '../data/lines-unified.json';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../config';

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
        dotsLayer({ stations })
      ],
      view: new ol.View({
        center: fromLonLat(DEFAULT_CENTER),
        zoom: DEFAULT_ZOOM
      })
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
