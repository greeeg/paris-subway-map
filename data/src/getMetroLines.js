const fs = require('fs');
const path = require('path');
const { request } = require('graphql-request');
const config = require('./config');

const query = `{
  lines(reseau: "metro") {
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
      path.join('json', 'src', 'metro-lines.json'),
      JSON.stringify(lines)
    );
  })
  .catch(err => {
    console.log(
      'Unable to request metro lines & stations from GraphQL endpoint',
      err
    );
  });
