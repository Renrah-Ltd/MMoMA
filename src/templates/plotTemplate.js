import React from "react"
import { graphql, Link } from "gatsby"
import "../styles/main.scss"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Map from "../components/map"

const PlotTemplate = ({ data, pageContext }) => {
    const { plot } = pageContext

    const centerX = (plot.start_coords.x + plot.end_coords.x) / 2
    const centerZ = (plot.start_coords.z + plot.end_coords.z) / 2

    const mapURL = `https://homesteadcraft.mcserver.us:8123/#homesteadcraft:${centerX}:76:${centerZ}:48:0:0:1:1:flat`
    const plotName = plot.shopName ? plot.shopName : `Plot #${plot.plotNumber}`
    return (
        <Layout className="plot">
          <Seo title={plotName} />
            <div class="grid grid--2 grid--mobile-1">
                <Map centerX={centerX} centerZ={centerZ} zoom={35} />
                <div className="plot-info">
                    <a href="/">« Back To Shopping District</a>
                    <div className="plot-title">
                        <h1>{plotName}</h1>
                        <div class="inline">
                          {plot.shopName && <p>Plot {plot.plotNumber}</p>}
                          <p><a target="_blank" href={mapURL}>{centerX} / / {centerZ}</a></p>
                          <p>Owner: {plot.owner}</p>
                        </div>
                    </div>
                    <h2>Items for Sale:</h2>
                    <div className="items-grid">
                        <div className="th">You Give</div><div className="th">You Get</div>
                        {plot.itemsForSale && plot.itemsForSale.map((item, index) => {
                            console.log({ item });
                            const itemEntity = item.item?.entityID?.replace('minecraft:', '')
                            const itemIcon = item.icon ? `/icons/${item.icon.replace('minecraft:','')}.png` : `/icons/${itemEntity}.png`
                            console.log({itemEntity, itemIcon})
                            return (
                                <div className="trade">
                                    {item.for ? <div className="item item--for">{item.forQty} x <img className="item-icon" src={`/icons/${item.forIcon ? item.forIcon.replace('minecraft:', '') : item.for.entityID.replace('minecraft:', '')}.png`} /> {item.for.name}</div> : <div className="item item--for">?</div>}
                                    <div className="item item--get">{item.qty || '?'} x <Link href={itemEntity ? `/item/${itemEntity}` : null}><img className="item-icon" src={itemIcon} /> {item.item?.name || item.item}</Link>  {item.note && <div className="item-note">{item.note}</div>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
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
      icon
      for
      forIcon
      qty
      forQty
      note
    }
  }
}
`

export default PlotTemplate
