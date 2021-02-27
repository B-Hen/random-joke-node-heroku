// console.log("First web service starting up ...");
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// 1 - pull in the HTTP server module

// 2 - pull in URL and query modules (for URL parsing)

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/random-joke': jsonHandler.getRandomJokeResponse,
  '/random-jokes': jsonHandler.getRandomJokeResponse,
  '/getBudget': jsonHandler.getBudget,
  '/default-styles.css': htmlHandler.getCSS,
  '/joke-client.html': htmlHandler.getJokes,
  notFound: htmlHandler.get404Response,
};

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addBudget') {
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addBudget(request, response, bodyParams);
    });
  }
};

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  // console.log(request.headers);
  const parseURL = url.parse(request.url);
  const { pathname } = parseURL;
  const paramas = query.parse(parseURL.query);
  const { limit } = paramas;
  const httpMethod = request.method;

  // post request
  if (httpMethod === 'POST') {
    handlePost(request, response, parseURL);
  } else {
    // get the contents of request.headers then split into array of strings
    let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
    acceptedTypes = acceptedTypes || [];

    if (urlStruct[pathname]) {
      urlStruct[pathname](request, response, limit, acceptedTypes, httpMethod);
    } else {
      urlStruct.notFound(request, response);
    }
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
