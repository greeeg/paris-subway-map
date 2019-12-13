# Datasources

> Scripts used to generate datasets for the map, from the RATP [real-time API](https://dataratp2.opendatasoft.com/page/temps-reel/) and [static datasets](https://dataratp2.opendatasoft.com/explore/?sort=modified)

## Scripts

The following scripts are embedded with the package:

| Name                   | Description                                        | Output file                                                                           |
| ---------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `generate:lines:metro` | Fetch Metro lines from real-time api               | `json/src/realtime-api/metro-lines.json`                                              |
| `generate:lines:rer`   | Fetch RER lines from real-time api                 | `json/src/realtime-api/rer-lines.json`                                                |
| `generate:lines:tram`  | Fetch Tram lines from real-time api                | `json/src/realtime-api/tram-lines.json`                                               |
| `generate:stations`    | Generate stations list (details, location, a11y)   | `json/generated/stations.json`                                                        |
| `generate:lines`       | Generate lines list (details, color)               | `json/generated/lines.json`                                                           |
| `generate:unified`     | Generate lines & stations lists (unified versions) | `json/generated/lines-unified.json.json`, `json/generated/stations-unified.json.json` |

Only the two final generated files (`json/generated/lines-unified.json.json`, `json/generated/stations-unified.json.json`) can actually be used with the map.

Manual updates for unified stations can be made in the `json/src/unified-stations.json` file:

- To combine stations from different lines into one physical station
- To update the location of a station
