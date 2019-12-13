export interface Station {
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
  stations: string[];
  color: string;
}

export type Stations = {
  [key in string]: Station;
};

export type Lines = {
  [key in string]: Line;
};
