import { useEffect, useState } from 'react'
import axios from 'axios'
import {
   LineChart,
   Line,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Legend,
   ResponsiveContainer
} from 'recharts'

export const Charts = () => {
   const [hourlyEvents, setHourlyEvents] = useState([])
   const [dailyEvents, setDailyEvents] = useState([])
   const [hourlyStats, setHourlyStats] = useState([])
   const [dailyStats, setDailyStats] = useState([])

   useEffect(() => {
      (async () => {
         getHourlyEvents()
         const fetchedDailyEvents = await axios.get(`http://localhost:5555/events/daily`)
         const fetchedHourlyStats = await axios.get(`http://localhost:5555/stats/hourly`)
         const fetchedDailyStats = await axios.get(`http://localhost:5555/stats/daily`)

         setDailyEvents(fetchedDailyEvents.data)
         setHourlyStats(fetchedHourlyStats.data)
         setDailyStats(fetchedDailyStats.data)
      })()
   }, [])

   const getHourlyEvents = async () => {
      const res = await axios.get(`http://localhost:5555/events/hourly`)
      if (!res.data) return

      const eventsByHour = new Map()
      res.data.forEach(entry => {
         if (eventsByHour.has(entry.hour))
            eventsByHour.set(entry.hour, eventsByHour.get(entry.hour) + entry.events)
         else
            eventsByHour.set(entry.hour, entry.events)
      })

      let result = []
      eventsByHour.forEach((val, key) => {
         result.push({ hour: key, events: val })
      })
      result.sort((a, b) => {
         if (a.hour > b.hour) return 1
         if (a.hour < b.hour) return -1
         return 0
      })
      result = result.map(entry => ({ ...entry, hour: entry.hour + ':00' }))

      setHourlyEvents(result)
   }

   return (
      <section className="container">
         <h1 className="main-heading">Chart Visualizations</h1>
         <section className="content-section">
            <h2>Hourly Events</h2>
            <div style={{ width: '100%', height: 450 }}>
               <ResponsiveContainer>
                  <LineChart data={hourlyEvents}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="hour" />
                     <YAxis dataKey="events" />
                     <Tooltip />
                     <Legend verticalAlign="top" />
                     <Line name="number of events" type="monotone" dataKey="events" stroke="#8884d8" />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </section>
      </section>
   )
}
