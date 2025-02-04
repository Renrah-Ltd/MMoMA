import React from "react"
import { graphql, Link } from "gatsby"
import "../styles/main.scss"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Map from "../components/map"
import outside from "../images/mmoma-outside.png"

const IndexPage = ({ data }) => {
  

  

  return (
    <Layout>
      <Seo title="Welcome" />

      <div class="grid grid--2 grid--mobile-1 mmoma-intro">
        <div className="image-wrapper"><img src={outside} /></div>
        <div className="intro__text">
          <p>Welcome to the</p>
          <h1>Minecraft Museum of Modern Art</h1>

          <div class="buttons">
            <Link className="button" to="/art">Art</Link>
            <Link className="button" to="/gift-shop">Gift Shop</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allPlotsJson {
      nodes {
        plotNumber
        shopName
        owner
        start_coords{
        x
        z
        }
        end_coords{
        x
        z}
      }
    }
  }
`

export default IndexPage
