const redis = require('redis')

const redisClient = redis.createClient({
   host: process.env.REDISHOST,
   port: process.env.REDISPORT,
   password: process.env.REDISPASSWORD
})

module.exports = redisClient
