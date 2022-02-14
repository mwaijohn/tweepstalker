const { TwitterClient } = require('twitter-api-client')

const twitterClient = (accessToken, accessTokenSecret) => new TwitterClient({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_KEY_SECRET,
  accessToken: accessToken,
  accessTokenSecret: accessTokenSecret,
  ttl: 120, // seconds. Defaults to 360
  disableCache: true, // Disables the caching behavior. Defaults to 'false'
  maxByteSize: 32000000, // Maximum (approximated) memory size for cache store. Defaults to 16000000.
});

// const twitterClient = (accessToken, accessTokenSecret) => new TwitterClient({
//   apiKey: "eULucQ0IXa0HCuKPOB8dsiAPr",
//   apiSecret: "luP161gkzXGz9ggf33OdHmMnJE3OwQEbSQs1OPUf8H1MR3e3kS",
//   accessToken: "2930251982-GhseF6crzT5M5IGPhJ1ptu9b0aS2f7xadobarHi",
//   accessTokenSecret: "I8VaTdS7prfZyPgiaNYpqw39fyOdT8S2Z6DJkTboNEyaL",
//   ttl: 120, // seconds. Defaults to 360
//   disableCache: true, // Disables the caching behavior. Defaults to 'false'
//   maxByteSize: 32000000, // Maximum (approximated) memory size for cache store. Defaults to 16000000.
// });

module.exports = twitterClient