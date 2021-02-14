// 5 - here's our 404 page
const errorPage = `
<html>
    <head>
        <title>404 - File Not Found!</title>
    </head>
    <body>
        <h1>404 - File Not Found!</h1>
        <p>check your URL, or you typing!</p>
        <p>Perhaps you are looking for <a href="/random-joke">/random-joke</a> or <a href="/random-joke?limit=10">/random-joke?limit=10?</a></p>
    </body>
</html>`;

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' }); // send response headers
  response.write(errorPage); // send content
  response.end(); // close connection
};

module.exports.get404Response = get404Response;
