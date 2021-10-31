require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rateLimiter = require('./middleware/rate-limiter')
const router = require('./routes/index')
const notFoundHandler = require('./middleware/not-found-handler')
const errorHandler = require('./middleware/error-handler')

const app = express()

app.set('trust proxy', true)
app.use(cors())
app.use(rateLimiter)
app.use(router)
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(process.env.PORT || 5555, (err) => {
   if (err) {
      console.error(err)
      process.exit(1)
   } else {
      console.log(`Running on ${process.env.PORT || 5555}`)
   }
})

// last resorts
process.on('uncaughtException', (err) => {
   console.error(`Caught exception: ${err}`)
   process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
   console.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
   process.exit(1)
})
