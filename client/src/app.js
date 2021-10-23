import {
   Switch,
   Route,
   useLocation
} from 'react-router-dom'
import { Navigation } from './components/layout/navigation'
import { Landing } from './components/layout/landing'
import { Events } from './components/sections/events'
import { Stats } from './components/sections/stats'
import { Map } from './components/map/map'

import './styles.css'

export const App = () => {
   const location = useLocation()

   return (
      <>
         <Navigation bgDark={location.pathname !== "/"} />
         <Switch>
            <Route exact path="/" render={() => <Landing />} />
            <Route exact path="/events" render={() => <Events />} />
            <Route exact path="/stats" render={() => <Stats />} />
            <Route exact path="/map" render={() => <Map />}/>
         </Switch>
      </>
   )
}
