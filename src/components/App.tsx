import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState, Dispatch } from '../store';
import Map from './Map';
import Menu from './Menu';

const App: React.FC = () => {
  const map = useSelector((state: StoreState) => state.map);
  const { map: mapDispatch } = useDispatch<Dispatch>();

  const onSelectLine = (lineId: string) => mapDispatch.setSelectedLine(lineId);
  const onSelectStation = (stationId: string) =>
    mapDispatch.setSelectedStation(stationId);

  return (
    <div>
      <Map />
      <Menu>
        {!map.selectedLine && (
          <div>
            {Object.keys(map.lines).map(lineId => (
              <button onClick={() => onSelectLine(lineId)}>
                {map.lines[lineId].code}
              </button>
            ))}
          </div>
        )}

        {map.selectedLine && !map.selectedStation && (
          <div>
            {map.lines[map.selectedLine].stations.map(stationLiaison => (
              <button onClick={() => onSelectStation(stationLiaison.uuid)}>
                {map.stations[stationLiaison.uuid].name}
              </button>
            ))}
          </div>
        )}
      </Menu>
    </div>
  );
};

export default App;
