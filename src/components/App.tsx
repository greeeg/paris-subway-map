import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { StoreState, Dispatch } from '../store';
import Map from './Map';
import Menu from './Menu';
import linesToDisplay from '../data/lines-to-display.json';

const Icon = styled.img`
  width: 40px;
  height: auto;
`;

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
        {!map.selectedLine && !map.selectedStation && (
          <div>
            {linesToDisplay.map(lineId => (
              <button onClick={() => onSelectLine(lineId)}>
                <Icon
                  src={`/assets/icons/${map.lines[lineId].icon}`}
                  alt={map.lines[lineId].name}
                />
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
