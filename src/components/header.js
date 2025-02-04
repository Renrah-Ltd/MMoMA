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
    <Link
    className="gift-shop-button"
      to="/gift-shop"
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
      }}
    >
      Gift Shop
    </Link>
  </header>
)

export default Header
