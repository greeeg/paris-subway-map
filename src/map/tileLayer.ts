import { Layer } from 'ol/layer';
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';

const tileLayer = (): Layer => {
  return new Tile({
    source: new OSM()
  });
};

export default tileLayer;
