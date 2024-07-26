import React from "react"
import { graphql, Link } from "gatsby"
import "../styles/main.scss"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const plots = data.allPlotsJson.nodes

  const sd_coords = [[3317, -1933], [3721, -1502]]

  const centerX = (sd_coords[0][0] + sd_coords[1][0]) / 2
  const centerZ = (sd_coords[0][1] + sd_coords[1][1]) / 2

  return (
    <Layout>
    <Seo title="Welcome" />

        <div class="grid grid--2 grid--mobile-1">
          <div className="map"><iframe src={`http://homesteadcraft.mcserver.us:8123/#homesteadcraft:${centerX}:76:${centerZ}:348:0:0:0:1:flat`} /></div>
          <div className="sd-info">
            <h1>Shopping District</h1>
            <ul className="plots-index">
              {plots.map(plot => (
                <li key={plot.plotNumber}>
                  <Link to={`/plot/${plot.plotNumber}`}>{plot.shopName ? plot.shopName : `Plot #${plot.plotNumber}`}</Link> - {plot.owner}
                </li>
              ))}
            </ul>
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
      }
    }
  }
`

export default IndexPage
