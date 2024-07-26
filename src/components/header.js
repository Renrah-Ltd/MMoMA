import * as React from "react"
import { Link } from "gatsby"
import SearchBar from "./SearchBar"

const Header = ({ siteTitle }) => (
  <header
    className="header"
  >
    <Link
      to="/"
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
      }}
    >
      {siteTitle}
    </Link>
      <SearchBar />
  </header>
)

export default Header
