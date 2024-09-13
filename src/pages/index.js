import React from "react"
import { graphql, Link } from "gatsby"
import "../styles/main.scss"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Map from "../components/map"

const IndexPage = ({ data }) => {
  const plots = data.allPlotsJson.nodes

  const sd_coords = [[3344, -1874], [3715, -1507]]


  const getRelativePosition = (x, z, box) => {
    const percentageX = ((x - box[0][0]) / (box[1][0] - box[0][0])) * 100;
    const percentageZ = ((z - box[0][1]) / (box[1][1] - box[0][1])) * 100;
    console.log({ x, z, percentageX, percentageZ })
    return { x: percentageX, z: percentageZ };
  }

  const getCenter = (coords) => {
    return { x: (coords[0][0] + coords[1][0]) / 2, z: (coords[0][1] + coords[1][1]) / 2 }
  }

  const SDcenter = getCenter(sd_coords)

  console.log({ plots })
  const markers = plots.map((plot) => {
    const plotCenter = getCenter([Object.values(plot.start_coords), Object.values(plot.end_coords)])
    console.log({ plot, plotCenter })
    return ({
      number: plot.plotNumber,
      point: plotCenter,
      relative: getRelativePosition(plotCenter.x, plotCenter.z, sd_coords)
    })
  })

  console.log({ markers })

  

  return (
    <Layout>
      <Seo title="Welcome" />

      <div class="grid grid--2 grid--mobile-1">
        <Map centerX={SDcenter.x} centerZ={SDcenter.z} markers={markers} />
        <div className="sd-info">
          <h1>Shopping District</h1>
          <ul className="plots-index">
            {plots.map(plot => (
              <li className="plot-card" key={plot.plotNumber} data-plot={plot.plotNumber}>
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
