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

apiRouter.route("test").get((req, res) => {
    res.json({"status":"The API is working"})
})

module.exports = apiRouter;


