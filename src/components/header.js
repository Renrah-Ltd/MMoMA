import * as React from "react"
import { Link } from "gatsby"
import SearchBar from "./SearchBar"
import Nav from "./nav"

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
    <div class="desktop-nav">
      <Nav/>
    </div>
  </header>
)

export default Header
