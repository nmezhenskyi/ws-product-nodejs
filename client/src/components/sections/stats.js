import { useEffect, useState } from 'react'
import axios from 'axios'
import {
   ResponsiveContainer,
   BarChart,
   Bar,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Legend
} from 'recharts'
import dayjs from 'dayjs'

export const Stats = () => {
   const [hourlyStats, setHourlyStats] = useState([])
   const [dailyStats, setDailyStats] = useState([])

   useEffect(() => {
      (async () => {
         getHourlyStats()
         getDailyStats()
      })()
   }, [])

   const getHourlyStats = async () => {
      const res = await axios.get(`http://localhost:5555/stats/hourly`)
      if (!res.data) return

      const statsByHour = new Map()
      res.data.forEach(entry => {
         if (statsByHour.has(entry.hour)) {
            let record = statsByHour.get(entry.hour)
            statsByHour.set(entry.hour, {
               hour: parseInt(record.hour),
               impressions: parseInt(record.impressions) + parseInt(entry.impressions),
               clicks: parseInt(record.clicks) + parseInt(entry.clicks),
               revenue: parseFloat(record.revenue) + parseFloat(entry.revenue)
            })
         }
         else {
            statsByHour.set(entry.hour, {
               hour: parseInt(entry.hour),
               impressions: parseInt(entry.impressions),
               clicks: parseInt(entry.clicks),
               revenue: parseFloat(entry.revenue)
            })
         }
      })
      let result = []
      statsByHour.forEach(val => result.push(val))
      result.sort((a, b) => {
         if (a.hour < b.hour) return 1
         if (a.hour < b.hour) return -1
         return 0
      })
      result = result.map(entry => ({
         ...entry,
         hour: `${entry.hour}:00`,
         revenue: parseFloat(parseFloat(entry.revenue).toFixed(2))
      }))

      setHourlyStats(result)
   }

   const getDailyStats = async () => {
      const res = await axios.get(`http://localhost:5555/stats/daily`)
      if (!res.data || res.data.length === 0) return

      res.data.forEach(entry => {
         const formatted = dayjs(entry.date)
         entry.date = formatted.format('DD/MM/YYYY')
         entry.impressions = parseInt(entry.impressions)
         entry.clicks = parseInt(entry.clicks)
         entry.revenue = parseFloat(parseFloat(entry.revenue).toFixed(2))
      })

      setDailyStats(res.data)
   }

   return (
      <section className="container">
         <h1 className="main-heading">Stats</h1>
         <section className="content-section">
            <h2>Hourly Stats</h2>
            <h3>Impressions</h3>
            <div className="chart-container">
               <ResponsiveContainer>
                  <BarChart
                     data={hourlyStats}
                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="hour" />
                     <YAxis />
                     <Tooltip />
                     <Legend wrapperStyle={{ top: -20 }} />
                     <Bar dataKey="impressions" fill="#8884d8" barSize={50} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <h3>Clicks</h3>
            <div className="chart-container">
               <ResponsiveContainer>
                  <BarChart
                     data={hourlyStats}
                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="hour" />
                     <YAxis />
                     <Tooltip />
                     <Legend wrapperStyle={{ top: -20 }} />
                     <Bar dataKey="clicks" fill="#82ca9d" barSize={50} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <h3>Revenue</h3>
            <div className="chart-container">
               <ResponsiveContainer>
                  <BarChart
                     data={hourlyStats}
                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="hour" />
                     <YAxis />
                     <Tooltip />
                     <Legend wrapperStyle={{ top: -20 }} />
                     <Bar dataKey="revenue" fill="#ff7300" barSize={50} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </section>
         <section className="content-section">
            <h2>Daily Stats</h2>
            <h3>Impressions</h3>
            <div className="chart-container">
               <ResponsiveContainer>
                  <BarChart
                     data={dailyStats}
                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="date" />
                     <YAxis />
                     <Tooltip />
                     <Legend wrapperStyle={{ top: -20 }} />
                     <Bar dataKey="impressions" fill="#8884d8" barSize={60} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <h3>Clicks</h3>
            <div className="chart-container">
               <ResponsiveContainer>
                     <BarChart
                        data={dailyStats}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                     >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend wrapperStyle={{ top: -20 }} />
                        <Bar dataKey="clicks" fill="#82ca9d" barSize={60} />
                     </BarChart>
                  </ResponsiveContainer>
            </div>
            <h3>Revenue</h3>
            <div className="chart-container">
               <ResponsiveContainer>
                  <BarChart
                     data={dailyStats}
                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="date" />
                     <YAxis />
                     <Tooltip />
                     <Legend wrapperStyle={{ top: -20 }} />
                     <Bar dataKey="revenue" fill="#ff7300" barSize={60} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </section>
      </section>
   )
}