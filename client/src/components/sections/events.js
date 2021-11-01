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
import { Table } from '../common/table'
import { SearchBar } from '../common/search-bar'

export const Events = () => {
   const [isLoading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const [hourlyEvents, setHourlyEvents] = useState([])
   const [dailyEvents, setDailyEvents] = useState([])
   const [eventsPerLocation, setEventsPerLocation] = useState([])
   const [tableQuery, setTableQuery] = useState('')

   useEffect(() => {
      (async () => {
         if (isLoading) {
            getHourlyEvents()
            getDailyEvents()
         }
         getEventsPerLocation(tableQuery)
         setLoading(false)
      })()
   }, [tableQuery, isLoading])

   const getHourlyEvents = async () => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/events/hourly`)

         if (res.status === 429) {
            setError(res.data)
            return
         }

         if (!res.data || res.data.length === 0) {
            setHourlyEvents([])
            return
         }

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
      catch (err) {
         console.error(err)
         setHourlyEvents([])
         if (err.response.status === 429) {
            setError(err.response.data.error)
         }
      }
   }

   const getDailyEvents = async () => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/events/daily`)

         if (res.status === 429) {
            setError(res.data)
            return
         }

         if (!res.data || res.data.length === 0) {
            setDailyEvents([])
            return
         }

         res.data.forEach(entry => {
            const formatted = dayjs(entry.date)
            entry.date = formatted.format('DD/MM/YYYY')
            entry.events = parseInt(entry.events)
         })

         setDailyEvents(res.data)
      }
      catch (err) {
         console.error(err)
         setDailyEvents([])
         if (err.response.status === 429) {
            setError(err.response.data.error)
         }
      }
   }

   const getEventsPerLocation = async (locationName) => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/events/daily?withPlaces=true&name=${locationName}`)

         if (res.status === 429) {
            setError(res.data)
            return
         }

         if (!res.data || res.data.length === 0) {
            setEventsPerLocation([])
            return
         }

         res.data.forEach(entry => {
            const formatted = dayjs(entry.date)
            entry.date = formatted.format('DD/MM/YYYY')
            entry.events = parseInt(entry.events)
         })

         setEventsPerLocation(res.data)
      }
      catch (err) {
         console.error(err)
         setEventsPerLocation([])
         if (err.response.status === 429) {
            setError(err.response.data.error)
         }
      }
   }

   if (error) return (
      <section className="container fvp-content">
         <h1 className="main-heading">Events</h1>
         <h2>{error}</h2>
      </section>
   )

   if (isLoading) return (
      <section className="container">
         <h1 className="main-heading">Events</h1>
         <h2>Loading...</h2>
      </section>
   )

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
         <section className="content-section">
            <h2>Find Daily Events</h2>
            <SearchBar
               getQuery={q => setTableQuery(q)}
               placeholder="Search by location"
            />
            <Table data={{
               cols: ['date', 'location', 'events'],
               rows: eventsPerLocation
            }} />
         </section>
      </section>
   )
}
