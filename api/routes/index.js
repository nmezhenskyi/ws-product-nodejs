const Router = require('express').Router
const queryHandler = require('../middleware/query-handler')

/**
 * Provides routing for the whole API.
 */
const router = new Router()

router.get('/', (req, res) => {
    return res.json({
        message: 'Work Sample for EQ Works by Nikita Mezhenskyi'
    })
})

router.get('/events/hourly', (req, res, next) => {
    req.sqlQuery = `
        SELECT date, hour, events
        FROM public.hourly_events
        ORDER BY date, hour
        LIMIT 168;
    `
    return next()
}, queryHandler)

router.get('/events/daily', (req, res, next) => {
    if (req.query.withPlaces && req.query.withPlaces === 'true') {
        req.sqlQuery = `
            SELECT date, name, SUM(events) AS events
            FROM public.hourly_events
                LEFT JOIN public.poi ON public.hourly_events.poi_id = public.poi.poi_id
            GROUP BY date, name
            ORDER BY date DESC
            LIMIT 10;
        `
    }
    else {
        req.sqlQuery = `
            SELECT date, SUM(events) AS events
            FROM public.hourly_events
            GROUP BY date
            ORDER BY date
            LIMIT 7;
        `
    }
    return next()
}, queryHandler)

router.get('/stats/hourly', (req, res, next) => {
    req.sqlQuery = `
        SELECT date, hour, impressions, clicks, revenue
        FROM public.hourly_stats
        ORDER BY date, hour
        LIMIT 168;
    `
    return next()
}, queryHandler)

router.get('/stats/daily', (req, res, next) => {
    if (req.query.withPlaces && req.query.withPlaces === 'true') {
        req.sqlQuery = `
            SELECT date, name,
                SUM(impressions) AS impressions,
                SUM(clicks) AS clicks,
                SUM(revenue) AS revenue
            FROM public.hourly_stats
                LEFT JOIN public.poi ON public.hourly_stats.poi_id = public.poi.poi_id
            GROUP BY date, name
            ORDER BY date DESC
            LIMIT 10;
        `
    }
    else {
        req.sqlQuery = `
            SELECT date,
                SUM(impressions) AS impressions,
                SUM(clicks) AS clicks,
                SUM(revenue) AS revenue
            FROM public.hourly_stats
            GROUP BY date
            ORDER BY date
            LIMIT 7;
        `
    }
    return next()
}, queryHandler)

router.get('/poi', (req, res, next) => {
    if (req.query.showMetrics && req.query.showMetrics === 'true') {
        req.sqlQuery = `
            SELECT name, lat, lon,
                SUM(events) AS events,
                SUM(impressions) AS impressions,
                SUM(clicks) AS clicks,
                SUM(revenue) AS revenue
            FROM public.poi
                LEFT JOIN (SELECT poi_id, events FROM public.hourly_events LIMIT 50) e
                    ON public.poi.poi_id = e.poi_id
                LEFT JOIN (SELECT poi_id, impressions, clicks, revenue
                            FROM public.hourly_stats LIMIT 50) s
                    ON public.poi.poi_id = s.poi_id
            GROUP BY public.poi.poi_id, name, lat, lon
            ORDER BY public.poi.poi_id
        `
    }
    else {
        req.sqlQuery = `
            SELECT *
            FROM public.poi;
        `
    }
    return next()
}, queryHandler) 

module.exports = router
