import PropTypes from 'prop-types'

export const Table = ({ data, query, searchBy }) => {
   const { rows, cols } = data
   
   // Highlight matching values:
   if (query && query.replace(/\s/g, '').length) {
      rows.forEach(row => {
         if (row[searchBy].toLowerCase().includes(query.trim().toLowerCase()))
            row.highlight = true
         else
            row.highlight = false
      })
   }
   else {
      rows.forEach(row => row.highlight = false)
   }

   return (
      <table>
         <thead>
            <tr>
               {cols.map((col, idx) => (<th key={idx}>{col}</th>))}
            </tr>
         </thead>
         <tbody>
            {rows.map((row, rowIdx) => (
               <tr key={rowIdx} className={`${row.highlight ? 'highlight' : ''}`}>          
                  {data.keys.map((key, keyIdx) => (<td key={keyIdx}>{row[key]}</td>))}
               </tr>
            ))}
         </tbody>
      </table>
   )
}

Table.propTypes = {
   data: PropTypes.object.isRequired,
   query: PropTypes.string,
   searchBy: PropTypes.string
}
