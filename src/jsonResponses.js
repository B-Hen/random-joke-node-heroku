// array of jokes
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

// function to get jokes
const getRandomJokeJSON = (numberOfJokes) => {
  // first get a random number between 1 and the number of jokes in the array
  const number = Math.floor(Math.random() * 10); // return a random number from 0 to 9.

  // return the joke
  return JSON.stringify(jokes[number]);
};

const getRandomJokeResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' }); // send response headers
  response.write(getRandomJokeJSON(jokes.length)); // send content
  response.end(); // close conection
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
