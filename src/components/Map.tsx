import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import * as ol from 'ol';
import { defaults as interactionDefaults } from 'ol/interaction';
import { fromLonLat, toLonLat } from 'ol/proj';
import { MultiLineString } from 'ol/geom';
import { Station, Line } from '../types';
import { StoreState, Dispatch } from '../store';
import tileLayer from '../map/tileLayer';
import linesLayer from '../map/linesLayer';
import dotsLayer from '../map/dotsLayer';
import labelsLayer from '../map/labelsLayer';
import geolocationLayer from '../map/geolocationLayer';
import { Layer } from 'ol/layer';

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
  const olmapRef = useRef<ol.Map>();
  const map = useSelector((state: StoreState) => state.map);
  const { map: mapDispatch } = useDispatch<Dispatch>();

  useEffect(() => {
    const geolocationAPI = new ol.Geolocation({
      trackingOptions: {
        enableHighAccuracy: true
      }
    });

    geolocationAPI.setTracking(true);

    const olmap = new ol.Map({
      target: 'map',
      layers: [
        tileLayer(),
        linesLayer({ lines: map.lines, stations: map.stations }),
        dotsLayer({ stations: map.stations }),
        labelsLayer({ stations: map.stations }),
        geolocationLayer({ geolocation: geolocationAPI })
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

    olmapRef.current = olmap;

    geolocationAPI.setProjection(olmap.getView().getProjection());

    geolocationAPI.on('change:position', () => {
      const coordinates = geolocationAPI.getPosition() || [];
      const geolocation = toLonLat(coordinates);
      mapDispatch.setGeolocation(geolocation);
    });

    olmap.on('singleclick', e => {
      const feature = olmap.getFeaturesAtPixel(e.pixel, {
        layerFilter: () => true,
        hitTolerance: 0
      })[0];

      if (feature) {
        const type = feature.get('type');

        if (type === 'label' || type === 'dot') {
          const station = feature.get('station') as Station;
          mapDispatch.setSelectedLine(undefined);
          mapDispatch.setSelectedStation(station.uuid);
        } else if (type === 'line') {
          const line = feature.get('line') as Line;
          mapDispatch.setSelectedLine(line.id);
          mapDispatch.setSelectedStation(undefined);
        }
      }
    });

    olmap.on('moveend', event => {
      const view = event.map.getView();
      const center = event.map.getView().getCenter() || [0, 0];
      const zoom = view.getZoom() as number;

      mapDispatch.setCenter(center);
      mapDispatch.setZoom(zoom);
    });
  }, []);

  useEffect(() => {
    if (!olmapRef.current || !map.selectedStation) {
      return;
    }

    olmapRef.current.getView().animate({
      center: fromLonLat(map.stations[map.selectedStation].geolocation),
      zoom: 16
    });
  }, [map.selectedStation]);

  useEffect(() => {
    if (!olmapRef.current || !map.selectedLine) {
      return;
    }

    const line = map.lines[map.selectedLine];
    const lineGeometry = new MultiLineString([
      line.stations.map(stationLiaison => {
        const { geolocation } = map.stations[stationLiaison.uuid];
        return fromLonLat(geolocation);
      })
    ]);

    olmapRef.current.getView().fit(lineGeometry, {
      padding: [30, 30, 30, 30],
      duration: 1000,
      constrainResolution: false
    });
  }, [map.selectedLine]);

  return <MapWrapper id="map" />;
};

export default Map;
