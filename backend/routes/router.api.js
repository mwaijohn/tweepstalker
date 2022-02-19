const express = require('express');
const { getStatuses, logout, requestAccessTokens, requestAuthToken, authenticateToken } = require('../controllers/controller.authenticater');

const apiRouter = express.Router();


apiRouter.route('/twitter/oauth/request_token').post(requestAuthToken)
apiRouter.route('/twitter/oauth/access_token').post(requestAccessTokens)
apiRouter.route('/twitter/logout').get(logout)
apiRouter.route('/statuses/:username',authenticateToken).get(getStatuses)

module.exports = apiRouter;


