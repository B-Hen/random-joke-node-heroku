//console.log("First web service starting up ...");

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 5 - here's our 404 page
const errorPage = `
<html>
    <head>
        <title>404 - File Not Found!</title>
    </head>
    <body>
        <h1>404 - File Not Found!</h1>
        <p>check your URL, or you typing!</p>
        <p>:-0</p>
    </body>
</html>`;

//array of jokes
let jokes = [
    {q:"What do you call a very small valentine?", a:"A valen-tiny!"},
    {q:"What did the dog say when he rubbed his tail on the sandpaper?", a:"Ruff, Ruff!"},
    {q:"Why don't sharks like to eat clowns?", a:"Because they taste funny!"},
    {q:"What did the boy cat say to the girl cat?", a:"You're Purr-fect!"},
    {q:"What is a frog's favorite outdoor sport?", a:"Fly Fishing!"},
    {q:"I hate jokes about German sausages.", a:"Theyre the wurst."},
    {q:"Did you hear about the cheese factory that exploded in France?", a:"There was nothing left but de Brie."},
    {q:"Our wedding was so beautiful ", a:"Even the cake was in tiers."},
    {q:"Is this pool safe for diving?", a:"It deep ends."},
    {q:"Dad, can you put my shoes on?", a:"I dont think theyll fit me."}
]

//function to get jokes
const getRandomJokeJSON = (numberOfJokes) => {
    //first get a random number between 1 and the number of jokes in the array
    const number = Math.floor(Math.random() * 10); // return a random number from 0 to 9.

    //return the joke
    return JSON.stringify(jokes[number]);
}

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  //console.log(request.headers);
  const parseURL = url.parse(request.url);
  const pathname = parseURL.pathname;
  console.log("parsedUrl=", parseURL);
  console.log("pathname=", pathname);

  if(pathname == "/"){
      response.writeHead(200, { 'Content-Type': 'text/html'}); //send response headers
      response.write(getRandomJokeJSON(jokes.length)); //send content
      response.end(); //close conection
  }
  else{
      response.writeHead(404, { 'Content-Type': 'text/html'}); //send response headers 
      response.write(errorPage); //send content
      response.end(); //close connection
  }
   
};


// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
