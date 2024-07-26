import React from "react"
import { graphql } from "gatsby"
import "../styles/main.scss"
import Layout from "../components/layout"

const PlotTemplate = ({ data, pageContext }) => {
    const { plot } = pageContext

    const centerX = (plot.start_coords.x + plot.end_coords.x) / 2
    const centerZ = (plot.start_coords.z + plot.end_coords.z) / 2
    return (
        <Layout className="plot">
            <div className="map"><iframe src={`http://homesteadcraft.mcserver.us:8123/#homesteadcraft:${centerX}:76:${centerZ}:48:0:0:1:1:flat`} /></div>
            <div className="plot-info">
                <a href="/">« Back To Shopping District</a>
                <div className="plot-title">
                    {plot.shopName ? <h1>{plot.shopName}</h1> : <h1>Plot {plot.plotNumber}</h1>}
                    {plot.shopName && <p>Plot {plot.plotNumber}</p>}
                    <p>{centerX} / / {centerZ}</p>
                    <p>Owner: {plot.owner}</p>
                </div>
                <h2>Items for Sale:</h2>
                <div className="items-grid">
                    <div className="th">You Give</div><div className="th">You Get</div>

                    {plot.itemsForSale && plot.itemsForSale.map((item, index) => {
                        console.log({ item });
                        return (
                            <div className="trade">
                                {item.for ? <div className="item item--for">{item.forQty} x {item.for.name}</div> : <div className="item item--for">?</div>}
                                <div className="item item--get">{item.qty || 1} x {item.item?.name || item.item}  {item.note && <div className="item-note">{item.note}</div>}
                                </div>

                            </div>
                        )
                    })}
                </div>
                <ul>

                </ul>
            </div>

        </Layout>
    )
}

export const query = graphql`
  query ($plotNumber: Int!) {
  plotsJson(plotNumber: {eq: $plotNumber}) {
    plotNumber
    shopName
    owner
    start_coords {
      x
      z
    }
    end_coords {
      x
      z
    }
    itemsForSale {
      item
      for
      qty
      forQty
      note
    }
  }
}
`

export default PlotTemplate
