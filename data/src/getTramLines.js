const fs = require('fs');
const path = require('path');
const { request } = require('graphql-request');
const config = require('./config');

const query = `{
  lines(reseau: "tram") {
    id
    name
    code
    stations {
      id
      name
    }
  }
}`;

request(config.endpoint, query)
  .then(({ lines }) => {
    fs.writeFileSync(
      path.join('json', 'generated', 'tram-lines.json'),
      JSON.stringify(lines)
    );
  })
  .catch(err => {
    console.log(
      'Unable to request tram lines & stations from GraphQL endpoint',
      err
    );
  });
