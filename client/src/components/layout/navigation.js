import { Link } from 'react-router-dom'

export const Navigation = () => {
   return (
      <nav className="navbar">
         <h1>
            <Link to="/">Data Visualizer</Link>
         </h1>
         <ul>
            <li><Link to="/charts">Charts</Link></li>
            <li><Link to="/table">Table</Link></li>
            <li><Link to="/map">Map</Link></li>
         </ul>
      </nav>
   )
}
