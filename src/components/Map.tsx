import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import * as ol from 'ol';
import { defaults as interactionDefaults } from 'ol/interaction';
import { Station } from '../types';
import { StoreState, Dispatch } from '../store';
import tileLayer from '../map/tileLayer';
import linesLayer from '../map/linesLayer';
import dotsLayer from '../map/dotsLayer';
import labelsLayer from '../map/labelsLayer';
import stations from '../data/stations-unified.json';
import lines from '../data/lines-unified.json';

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
  const map = useSelector((state: StoreState) => state.map);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    const olmap = new ol.Map({
      target: 'map',
      layers: [
        tileLayer(),
        linesLayer({ lines, stations }),
        dotsLayer({ stations }),
        labelsLayer({ stations })
      ],
      view: new ol.View({
        center: map.center,
        zoom: map.zoom
      }),
      interactions: interactionDefaults({
        altShiftDragRotate: false,
        pinchRotate: false
      })
    });

    olmap.on('singleclick', e => {
      olmap.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        const type = feature.get('type');
        if (type === 'label' || type === 'dot') {
          const station = feature.get('station') as Station;
          console.log(station.name);
        }
      });
    });

    olmap.on('moveend', event => {
      const view = event.map.getView();
      const center = event.map.getView().getCenter() || [0, 0];
      const zoom = view.getZoom() as number;

      dispatch.map.setCenter(center);
      dispatch.map.setZoom(zoom);
    });
  }, []);

  return <MapWrapper id="map" />;
};

export default Map;
