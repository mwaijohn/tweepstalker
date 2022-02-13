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

module.exports = twitterClient