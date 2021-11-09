import { useState, useEffect } from 'react'
import axios from 'axios'
import {
   MapContainer,
   TileLayer,
   Marker,
   Popup
} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { MAP_CENTER } from '../../common/constants'
import { toUSD, toFormattedNumber } from '../../common/utils'

export const Map = () => {
   const [isLoading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const [places, setPlaces] = useState([])

   useEffect(() => {
      (async () => {
         await getPlaces()
         setLoading(false)
      })()
   }, [])

   const getPlaces = async () => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/poi?showMetrics=true`)

         if (!res.data) {
            setPlaces([])
            return
         }

         setPlaces(res.data)
      }
      catch (err) {
         setPlaces([])
         if (err.response.status === 429) {
            setError(err.response.data.message)
         }
      }
   }

   if (error) return (
      <section className="container fvp-content">
         <h1 className="main-heading">Map</h1>
         <h2>{error}</h2>
      </section>
   )

   if (isLoading) return (
      <section className="container">
         <h1 className="main-heading">Map</h1>
         <h2>Loading...</h2>
      </section>
   )

   return (
      <section className="container">
         <h1 className="main-heading">Map</h1>
         <div className="map-container">
            <MapContainer tap={false} style={{ height: '100%', width: '100%', zIndex: '0' }} center={MAP_CENTER} zoom={3}>
               <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <MarkerClusterGroup>
                  {places.map((place, idx) => (
                     <Marker
                        key={idx}
                        position={[place.lat, place.lon]}
                     >
                        <Popup>
                           <div className="popup-info">
                              <h2>{place.name}</h2>
                              <p>Past Events: {toFormattedNumber(place.events)}</p>
                              <p>Impressions: {toFormattedNumber(place.impressions)}</p>
                              <p>Clicks: {toFormattedNumber(place.clicks)}</p>
                              <p>Revenue: {toUSD(place.revenue)}</p>
                           </div>
                        </Popup>
                     </Marker>
                  ))}
               </MarkerClusterGroup>
            </MapContainer>
         </div>
      </section>
   )
}
