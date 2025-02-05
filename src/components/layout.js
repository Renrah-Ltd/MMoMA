/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import Seo from "./seo"
import logo from "../images/mmoma-logo.png"
import Nav from "./nav"

const Layout = ({ children, className }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
    <div className="logo-and-content">
      <div class="site-logo"><Link to="/"><img src={logo} /></Link><div className="mobile-nav"><Nav /></div></div>
      <div
        className={className}
      >
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
  
        <main>{children}</main>
        
      </div>
    </div>
    <footer
    className="footer"
      style={{
        marginTop: `var(--space-5)`,
        fontSize: `var(--font-sm)`,
        textAlign: 'center',
        background: "var(--black)",
        color: "var(--white)"
      }}
    >
      <p>
        © {new Date().getFullYear()} &middot; Built with
        💜 by JackJackSlaps
      </p>
      <small>All Images, Names, and whatever else belong to whoever owns them. Nothing is actually for sale.</small>
    </footer>
    </>
  )
}

export default Layout
