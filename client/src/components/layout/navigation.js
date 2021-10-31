import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const Navigation = ({ bgDark }) => {
   return (
      <nav className={`navbar ${bgDark && 'bg-dark'}`}>
         <h1>
            <Link to="/">Data Visualizer</Link>
         </h1>
         <ul>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/stats">Stats</Link></li>
            <li><Link to="/map">Map</Link></li>
         </ul>
      </nav>
   )
}

Navigation.propTypes = {
   bgDark: PropTypes.bool
}
