export interface StationLiaison {
  id: string;
  uuid: string;
}

export interface Station {
  uuid: string;
  name: string;
  geolocation: number[];
  accessibility: {
    vision: boolean;
    mobility: boolean;
  };
  // List of RATP stations ids
  stations: string[];
}

export interface Line {
  id: string;
  name: string;
  code: string;
  stations: StationLiaison[];
  color: string;
  icon: string;
}

export type Stations = {
  [key in string]: Station;
};

export type Lines = {
  [key in string]: Line;
};
