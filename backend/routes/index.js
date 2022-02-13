var express = require('express');
var router = express.Router();
// var twitterClient = require('../src/twitterclient')
const jwt = require('jsonwebtoken')

const oauthCallback = process.env.FRONTEND_URL;
const oauth = require('../src/lib/oauth-promise')(oauthCallback);
const COOKIE_NAME = 'oauth_token';


// authentication
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

//our in-memory secrets database.
//Can be a key-value store or a relational database
let tokens = {};
let main_oauth_token = null;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//OAuth Step 1
router.post('/twitter/oauth/request_token', async (req, res) => {
  const { oauth_token, oauth_token_secret } = await oauth.getOAuthRequestToken();
  main_oauth_token = oauth_token
  tokens[oauth_token] = { oauth_token_secret };
  res.json({ oauth_token });
});


//OAuth Step 3
router.post('/twitter/oauth/access_token', async (req, res) => {
  // const oauth_tokenn = req.cookies[COOKIE_NAME];

  // res.json({ successjj: JSON.stringify({ "oauth_token_secret": oauth_token_secret,
  //  "oauth_token": oauth_token, "oauth_verifier": oauth_verifier }) });

  try {

    // console.log(oauth_token,oauth_token_secret);
    const { oauth_token, oauth_verifier } = req.body;
    const oauth_token_secret = tokens[oauth_token].oauth_token_secret;

    // if (oauth_token !== req_oauth_token) {
    //   res.status(403).json({ message: "Request tokens do not match" });
    //   return;
    // }

    const { oauth_access_token, oauth_access_token_secret } = await oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier);
    tokens[oauth_token] = { ...tokens[oauth_token], oauth_access_token, oauth_access_token_secret };

    const response = await oauth.getProtectedResource("https://api.twitter.com/1.1/account/verify_credentials.json", "GET", oauth_access_token, oauth_access_token_secret);

    var user = {
      "access_token": oauth_access_token,
      "access_token_secret": oauth_access_token_secret,
      "user": JSON.stringify(response.data)
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    // refreshTokens.push(refreshToken)

    res.json({ accessToken: accessToken, refreshToken: refreshToken, user: JSON.stringify(response.data) })
    // res.json({ success: true, tokens: JSON.stringify(data) });

  } catch (error) {
    res.status(403).json({ message: `Missing access token ${error} ${JSON.stringify(req.body)} ${JSON.stringify(tokens)}` });
  }
});


router.post("/twitter/logout", async (req, res) => {
  try {
    const oauth_token = req.cookies[COOKIE_NAME];
    delete tokens[oauth_token];
    res.cookie(COOKIE_NAME, {}, { maxAge: -1 });
    res.json({ success: true });
  } catch (error) {
    res.status(403).json({ message: "Missing, invalid, or expired tokens" });
  }

});


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

//Authenticated resource access
router.get("/twitter/users/profile_banner", authenticateToken ,async (req, res) => {

  try {
    // const oauth_token = req.cookies['cookieName'];

    const { access_token, access_token_secret } = req.user;
    const response = await oauth.getProtectedResource("https://api.twitter.com/1.1/account/verify_credentials.json", "GET", access_token, access_token_secret);
    res.json(JSON.parse(response.data));
  } catch (error) {
    res.status(403).json({ message: `Missing, invalid, or expired tokens ${JSON.stringify(tokens)}` });
  }

});

module.exports = router;
