// array of jokes
const _ = require('underscore');

const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny! >:)' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff! >:)' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny! >:)' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect! >:)" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing! >:)' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst. >:)' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie. >:)' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers. >:)' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends. >:)' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me. >:)' },
];

// function to get jokes for JSON
const getRandomJokeJSON = (numberOfJokes) => {
  // first make sure that the number of jokes is a number we can actually use
  let limit = Number(numberOfJokes); // cast 'limit' to a Number
  limit = !limit ? 1 : limit; // if limit is not a number because it is the "falsy" NAN default to 1
  limit = limit < 1 ? 1 : limit; // if limit is less than 1 default it to 1
  limit = limit > jokes.length ? jokes.length : limit; // make limit length

  // next shuffel the jokes in the array and sav to new array
  const jokes2 = _.shuffle(jokes);

  const jokes3 = []; // new array to reutrn

  // loop through and add the jokes to the array that will be returned
  for (let i = 0; i < limit; i++) {
    jokes3[i] = jokes2[i];
  }

  // return the array as JSON
  return JSON.stringify(jokes3);
};

// function to get jokes for XML
const getRandomJokeXML = (numberOfJokes) => {
  // first make sure that the number of jokes is a number we can actually use
  let limit = Number(numberOfJokes); // cast 'limit' to a Number
  limit = !limit ? 1 : limit; // if limit is not a number because it is the "falsy" NAN default to 1
  limit = limit < 1 ? 1 : limit; // if limit is less than 1 default it to 1
  limit = limit > jokes.length ? jokes.length : limit; // make limit length

  // next shuffel the jokes in the array and sav to new array
  const jokes2 = _.shuffle(jokes);

  const jokes3 = []; // new array to reutrn

  // loop through and add the jokes to the array that will be returned
  for (let i = 0; i < limit; i++) {
    jokes3[i] = `<joke><q>${jokes2[i].q}</q><a>${jokes2[i].a}</a></joke>`;
  }

  if (limit === 1) return jokes3[0];

  return `<jokes>${jokes3}</jokes>`;
};

const getRandomJokeResponse = (request, response, params = 1, acceptedTypes = 'application/json') => {
  // check to see that "text/xml" is in the acceptedTypes
  if (acceptedTypes.includes('text/xml')) {
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.write(getRandomJokeXML(params));
    response.end();
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' }); // send response headers
    response.write(getRandomJokeJSON(params)); // send content
    response.end(); // close conection
  }
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
