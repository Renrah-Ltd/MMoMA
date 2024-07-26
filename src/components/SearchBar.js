import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const SearchBar = () => {
  const data = useStaticQuery(graphql`
    query {
      allItemsJson {
        nodes {
          id
          entityID
          name
        }
      }
    }
  `)

  const items = data.allItemsJson.nodes
  const [query, setQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState([])

  const handleInputChange = event => {
    const value = event.target.value
    setQuery(value)

    const suggestions = items.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredItems(suggestions)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search items..."
        value={query}
        onChange={handleInputChange}
      />
      {query && (
        <ul className="suggestions">
          {filteredItems.map(item => (
            <li key={item.id}>
              <Link to={`/item/${item.entityID.replace('minecraft:', '')}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
