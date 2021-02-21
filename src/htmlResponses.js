const fs = require('fs'); // pull in the file system module

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const CSS = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' }); // send response headers
  response.write(errorPage); // send content
  response.end(); // close connection
};

const getCSS = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/css' }); // send response headers
  response.write(CSS); // send content
  response.end(); // close connection
};

module.exports.get404Response = get404Response;
module.exports.getCSS = getCSS;
