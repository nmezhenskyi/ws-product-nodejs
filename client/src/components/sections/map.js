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

export const Map = () => {
   const [isLoading, setLoading] = useState(true)
   const [places, setPlaces] = useState([])

   useEffect(() => {
      (async () => {
         getPlaces()
         setLoading(false)
      })()
   }, [])

   const getPlaces = async () => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/events/map`)

         if (!res.data) {
            setPlaces([])
            return
         }

         setPlaces(res.data)
      }
      catch (err) {
         console.error(err)
         setPlaces([])
      }
   }

   if (isLoading) return (
      <section className="container">
         <h1 className="main-heading">Map</h1>
         <h2>Loading...</h2>
      </section>
   )

   return (
      <section className="container">
         <h1 className="main-heading">Map</h1>
         <div style={{ height: '600px', width: '100%', marginBottom: '3rem' }}>
            <MapContainer tap={false} style={{ height: '100%', width: '100%', zIndex: '0' }} center={MAP_CENTER} zoom={4}>
               <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <MarkerClusterGroup>
                  {places.map(place => (
                     <Marker
                        key={place.poi_id}
                        position={[place.lat, place.lon]}
                     >
                        <Popup>
                           <div className="popup-info">
                              <h2>{place.name}</h2>
                              <p>Past Events: {place.events}</p>
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
