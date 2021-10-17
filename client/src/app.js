//import { useState } from 'react'
import {
   Switch,
   Route,
   useLocation
} from 'react-router-dom'
import { Navigation } from './components/layout/navigation'
import { Landing } from './components/layout/landing'
import { Charts } from './components/charts/charts'
import { Table } from './components/table/table'
import { Map } from './components/map/map'

import './styles.css'

export const App = () => {
   const location = useLocation()

   return (
      <>
         <Navigation bgDark={location.pathname !== "/"} />
         <Switch>
            <Route exact path="/" render={() => <Landing />} />
            <Route exact path="/charts" render={() => <Charts />} />
            <Route exact path="/table" render={() => <Table />} />
            <Route exact path="/map" render={() => <Map />}/>
         </Switch>
      </>
   )
}
