import { createModel } from '@rematch/core';
import { fromLonLat } from 'ol/proj';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../config';
import { Lines, Stations } from '../types';
import stations from '../data/stations-unified.json';
import lines from '../data/lines-unified.json';

export interface MapState {
  selectedLine?: string;
  selectedStation?: string;
  lines: Lines;
  stations: Stations;
  zoom: number;
  center: number[];
}

export const initialMapState: Readonly<MapState> = {
  zoom: DEFAULT_ZOOM,
  center: fromLonLat(DEFAULT_CENTER),
  lines,
  stations
};

const map = createModel({
  state: initialMapState,
  reducers: {
    setZoom(state: MapState, zoom: number) {
      return {
        ...state,
        zoom
      };
    },
    setCenter(state: MapState, center: number[]) {
      return {
        ...state,
        center
      };
    },
    setSelectedLine(state: MapState, selectedLine: string | undefined) {
      return {
        ...state,
        selectedLine
      };
    },
    setSelectedStation(state: MapState, selectedStation: string | undefined) {
      return {
        ...state,
        selectedStation
      };
    }
  }
});

export default map;
