const jwt = require('jsonwebtoken')
const PRIVATE_KEY = 'secret'

const generateToken = (value) =>
  jwt.sign({ ...value }, PRIVATE_KEY, { expiresIn: 60 * 60 })

const verifyToken = (token) => jwt.verify(token, PRIVATE_KEY)

const verifyLoginPassword = ({ login, password }) => false

module.exports.login = async (event) => {
  const credentials = JSON.parse(event.body)
  if (verifyLoginPassword(credentials)) {
    return {
      statusCode: 200,
      body: JSON.stringify(generateToken(credentials.login)),
    }
  } else return { statusCode: 403, body: 'unauthorized' }
}

module.exports.generate = generateToken
module.exports.verify = verifyToken
