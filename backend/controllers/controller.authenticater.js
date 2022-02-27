const jwt = require('jsonwebtoken')
const { generateAccessToken } = require('../utilities')
const twitterClient = require('../src/twitterclient')
var getStatuses = require('../src/client')


let tokens = {};
const oauth = require('../src/lib/oauth-promise')();

// generate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        // console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

//OAuth Step 1
const requestAuthToken = async (req, res) => {

    try {
        const { oauth_token, oauth_token_secret } = await oauth.getOAuthRequestToken();
        tokens[oauth_token] = { oauth_token_secret };
        res.json({ oauth_token });
    } catch (error) {
        res.json({ "msg": error });
    }

}

const requestAccessTokens = async (req, res) => {
    const { oauth_token, oauth_verifier } = req.body;
    try {

        const oauth_token_secret = tokens[oauth_token].oauth_token_secret;

        const { oauth_access_token, oauth_access_token_secret } = await oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier);
        tokens[oauth_token] = { ...tokens[oauth_token], oauth_access_token, oauth_access_token_secret };

        const response = await oauth.getProtectedResource("https://api.twitter.com/1.1/account/verify_credentials.json", "GET", oauth_access_token, oauth_access_token_secret);

        var user = {
            "access_token": oauth_access_token,
            "access_token_secret": oauth_access_token_secret,
            "user": response.data
        }

        console.log("response data", JSON.stringify(response.data))

        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

        res.json({ accessToken: accessToken, refreshToken: refreshToken, user: JSON.stringify(response.data) })
    } catch (error) {
        res.status(403).json({ message: `Missing access token ${error} ${JSON.stringify(req.body)} ${oauth_token} ${JSON.stringify(tokens)}` });
    }
}

const apiGetStatuses = async (req, res) => {
    try {

        const { access_token, access_token_secret, user } = req.user;
        // console.log(access_token, access_token_secret)
        const username = req.params.username || JSON.parse(user).screen_name;

        let client = twitterClient(access_token, access_token_secret);
        let data = await getStatuses(username, client)

        res.json(data);

    } catch (error) {
        res.status(403).json({ message: `Missing, invalid, or expired tokens ${error}` });
    }
}

const userProfile = async (req, res) => {
    try {
        const { access_token, access_token_secret } = req.user;
        console.log("profile_banner", access_token, access_token_secret)
        const response = await oauth.getProtectedResource("https://api.twitter.com/1.1/account/verify_credentials.json", "GET", access_token, access_token_secret);
        res.json(JSON.parse(response.data));
    } catch (error) {
        res.status(403).json({ message: `Missing, invalid, or expired tokens ${JSON.stringify(tokens)}` });
    }
}

module.exports = { authenticateToken, requestAuthToken, requestAccessTokens, apiGetStatuses, userProfile }