const express = require('express');
const {
    apiGetStatuses,
    requestAccessTokens,
    requestAuthToken,
    authenticateToken,
    userProfile } = require('../controllers/controller.authenticater');

const apiRouter = express.Router();


apiRouter.route('/twitter/oauth/request_token').post(requestAuthToken);
apiRouter.route('/twitter/oauth/access_token').post(requestAccessTokens);
apiRouter.route('/statuses/:username').get(authenticateToken, apiGetStatuses);
apiRouter.route('/statuses').get(authenticateToken, apiGetStatuses);
apiRouter.route('/twitter/users/profile_banner').get(authenticateToken, userProfile);

apiRouter.route('/home').get((req,res)=>{
    const CONSUMER_KEY = process.env.API_KEY;
    const CONSUMER_SECRET = process.env.API_KEY_SECRET;
    const CALLBACK_URL = process.env.CALLBACK_URL;
    res.json({"KEY": CONSUMER_KEY,"SEC":`${CONSUMER_SECRET}`,"CALLB":`${CALLBACK_URL}`,"jhjhj":"hhghghg"})
});

module.exports = apiRouter;


