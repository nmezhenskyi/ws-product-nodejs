import { useState, useEffect } from 'react'
import axios from 'axios'
import GoogleMapReact from 'google-map-react'

const handleApiLoaded = (map, maps, places) => {
   const markers = []
   const infowindows = []

   // places.forEach(place => {
   //    markers.push()
   // })
}

export const Map = () => {
   const [places, setPlaces] = useState([])

   useEffect(() => {
      (async () => getPlaces())()
   }, [])

   const getPlaces = async () => {
      const res = await axios.get(`http://localhost:5555/poi`)
      if (!res.data) return
      setPlaces(res.data)
   }

   const defaultProps = {
      center: {
         lat: 10.99835602,
         lng: 77.01502627
      },
      zoom: 11
   }

   return (
      <section className="container">
         <h1 className="main-heading">Map</h1>
         <div style={{ height: '600px', width: '100%' }}>
            <GoogleMapReact
               bootstrapURLKeys={{ key: "" }}
               defaultCenter={defaultProps.center}
               defaultZoom={defaultProps.zoom}
               yesIWantToUseGoogleMapApiInternals
               onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            />
         </div>
      </section>
   )
}
