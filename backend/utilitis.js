const jwt = require('jsonwebtoken')
// authentication
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = {
    generateAccessToken
}

