require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pg = require('pg')
const rateLimiter = require('./middleware/rate-limiter')
const errorHandler = require('./middleware/error-handler')

const app = express()

const pool = new pg.Pool()

const eventsDaily = require('./.temp/events-daily.json')
const eventsHourly = require('./.temp/events-hourly.json')
const statsDaily = require('./.temp/stats-daily.json')
const statsHourly = require('./.temp/stats-hourly.json')
const poi = require('./.temp/poi.json')

const queryHandler = (req, res, next) => {
   pool.query(req.sqlQuery).then((r) => {
      return res.json(r.rows || [])
   }).catch(next)
}

app.set('trust proxy', true)
app.use(cors())
//app.use(rateLimiter)

app.get('/', (req, res) => {
   res.send('Welcome to EQ Works 😎')
})

// app.get('/events/hourly', (req, res, next) => {
//    req.sqlQuery = `
//       SELECT date, hour, events
//       FROM public.hourly_events
//       ORDER BY date, hour
//       LIMIT 168;
//    `
//    return next()
// }, queryHandler)

// app.get('/events/daily', (req, res, next) => {
//    req.sqlQuery = `
//       SELECT date, SUM(events) AS events
//       FROM public.hourly_events
//       GROUP BY date
//       ORDER BY date
//       LIMIT 7;
//    `
//    return next()
// }, queryHandler)

// app.get('/stats/hourly', (req, res, next) => {
//    req.sqlQuery = `
//       SELECT date, hour, impressions, clicks, revenue
//       FROM public.hourly_stats
//       ORDER BY date, hour
//       LIMIT 168;
//    `
//    return next()
// }, queryHandler)

// app.get('/stats/daily', (req, res, next) => {
//    req.sqlQuery = `
//       SELECT date,
//          SUM(impressions) AS impressions,
//          SUM(clicks) AS clicks,
//          SUM(revenue) AS revenue
//       FROM public.hourly_stats
//       GROUP BY date
//       ORDER BY date
//       LIMIT 7;
//    `
//    return next()
// }, queryHandler)

// app.get('/poi', (req, res, next) => {
//    req.sqlQuery = `
//       SELECT *
//       FROM public.poi;
//    `
//    return next()
// }, queryHandler)

app.get('/events/hourly', (req, res, next) => res.json(eventsHourly))
app.get('/events/daily', (req, res, next) => res.json(eventsDaily))
app.get('/stats/hourly', (req, res, next) => res.json(statsHourly))
app.get('/stats/daily', (req, res, next) => res.json(statsDaily))
app.get('/poi', (req, res, next) => res.json(poi))

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
