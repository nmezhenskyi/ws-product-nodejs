import { useState } from 'react'
import PropTypes from 'prop-types'

export const SearchBar = ({ placeholder, getQuery }) => {
    const [text, setText] = useState('')

    const onChange = query => {
        setText(query)
        getQuery(query)
    }

    return (
        <form className="search mb-1">
            <input
                type="text"
                placeholder={placeholder || 'Search'}
                value={text}
                onChange={e => onChange(e.target.value)}
            />
        </form>
    )
}

SearchBar.propTypes = {
    placeholder: PropTypes.string.isRequired,
    getQuery: PropTypes.func.isRequired
}
