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
   const [places, setPlaces] = useState([])
   const [activePlace, setActivePlace] = useState(null)

   useEffect(() => {
      (async () => getPlaces())()
   }, [])

   const getPlaces = async () => {
      const res = await axios.get(`http://localhost:5555/map/events`)
      if (!res.data) return
      setPlaces(res.data)
   }

   return (
      <section className="container">
         <h1 className="main-heading">Map</h1>
         <div style={{ height: '600px', width: '100%' }}>
            <MapContainer tap={false} style={{ height: '100%', width: '100%' }} center={MAP_CENTER} zoom={5}>
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
