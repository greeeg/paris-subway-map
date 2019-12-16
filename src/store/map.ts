import { createModel } from '@rematch/core';
import { fromLonLat } from 'ol/proj';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../config';

export interface MapState {
  zoom: number;
  center: number[];
}

export const initialMapState: Readonly<MapState> = {
  zoom: DEFAULT_ZOOM,
  center: fromLonLat(DEFAULT_CENTER)
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
    }
  }
});

export default map;
