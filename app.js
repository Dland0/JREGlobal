const csv = require('csvtojson');
const vd = require('./validation/validators');
const vdm = require('./validation/validationMaps');
const http = require('http');
const fs = require('fs');
const LineError = require('./models/LineError');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  csv().fromFile('./equipment_list.csv').then(
    async (jsonArray) => {
    let errors = [];
    await vd.validateEquipment(jsonArray, vdm.equipmentMap, errors);

    let errorHTML = '';
    for (const error of errors) {
      errorHTML += error.toHTML();
    }

    // Read the errors.html template and replace <%= errorHTML %> with the generated error card HTML
    fs.readFile('errors.html', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading HTML template:', err);
        res.end('Error reading HTML template');
      } else {
        const renderedHTML = data.replace('<%= errorHTML %>', errorHTML);
        res.end(renderedHTML);
      }
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
