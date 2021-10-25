import { useEffect, useState } from 'react'
import axios from 'axios'
import {
   ResponsiveContainer,
   AreaChart,
   Area,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Legend
} from 'recharts'
import dayjs from 'dayjs'

export const Events = () => {
   const [hourlyEvents, setHourlyEvents] = useState([])
   const [dailyEvents, setDailyEvents] = useState([])

   useEffect(() => {
      (async () => {
         getHourlyEvents()
         getDailyEvents()
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
      result = result.map(entry => ({ hour: `${entry.hour}:00`, events: parseInt(entry.events) }))

      setHourlyEvents(result)
   }

   const getDailyEvents = async () => {
      const res = await axios.get(`http://localhost:5555/events/daily`)
      if (!res.data) return

      res.data.forEach(entry => {
         const formatted = dayjs(entry.date)
         entry.date = formatted.format('DD/MM/YYYY')
         entry.events = parseInt(entry.events)
      })

      setDailyEvents(res.data)
   }

   return (
      <section className="container">
         <h1 className="main-heading">Events</h1>
         <section className="content-section">
            <h2>Hourly Events</h2>
            <div className="chart-container">
               <ResponsiveContainer>
                  <AreaChart
                     data={hourlyEvents}
                     margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                     <defs>
                        <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                           <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <XAxis dataKey="hour" />
                     <YAxis dataKey="events" />
                     <CartesianGrid strokeDasharray="3 3" />
                     <Tooltip />
                     <Legend wrapperStyle={{ top: -20 }} />
                     <Area
                        name="number of events"
                        type="monotone"
                        dataKey="events"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorEvents)"
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </section>
         <section className="content-section">
            <h2>Daily Events</h2>
            <div className="chart-container">
               <ResponsiveContainer>
                  <AreaChart
                     data={dailyEvents}
                     margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                     <defs>
                        <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                           <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <XAxis dataKey="date" />
                     <YAxis dataKey="events" />
                     <CartesianGrid strokeDasharray="3 3" />
                     <Tooltip />
                     <Legend wrapperStyle={{ top: -20 }} />
                     <Area
                        name="number of events"
                        type="monotone"
                        dataKey="events"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorEvents)"
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </section>
      </section>
   )
}