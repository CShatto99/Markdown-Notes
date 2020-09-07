require('dotenv').config()
const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
  const token = req.headers['x-auth-token']

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)

    req.user = decoded

    next()
  } catch(err) {
    console.error(err)
    res.status(401).json({ msg: 'Session expired, try again' })
  }
}

module.exports = auth
