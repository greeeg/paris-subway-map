import { AppState } from '.';

export interface MapState {
  zoom: number;
}

export const initialMapState: Readonly<MapState> = {
  zoom: 13
};

const map = {
  state: initialMapState,
  reducers: {
    setZoom(state: MapState, zoom: number) {
      return {
        ...state,
        zoom
      };
    }
  },
  effects: (dispatch: any) => ({})
};

export default map;
