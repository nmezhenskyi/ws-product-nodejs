import PropTypes from 'prop-types'

export const Table = ({ data }) => {
   return (
      <table>
         <thead>
            <tr>
               {data.cols.map((col, idx) => (<th key={idx}>{col}</th>))}
            </tr>
         </thead>
         <tbody>
            {data.rows.map((row, rowIdx) => (
               <tr key={rowIdx}>
                  {Object.values(row).map((val, valIdx) => (<td key={valIdx}>{val}</td>))}
               </tr>
            ))}
         </tbody>
      </table>
   )
}

Table.propTypes = {
   data: PropTypes.object.isRequired
}
