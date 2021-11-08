const Redis = require('ioredis')

const redisClient = new Redis({
   host: process.env.REDISHOST,
   port: process.env.REDISPORT,
   password: process.env.REDISPASSWORD
})

module.exports = redisClient
