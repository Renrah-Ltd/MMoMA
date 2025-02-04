import React from "react"
import { graphql, Link } from "gatsby"
import "../styles/main.scss"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Map from "../components/map"
import mapImage from "../images/gift-shop-map.png"

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
               <img src={mapImage} />
                <div className="plot-info">
                    <div className="plot-title">
                        <h1>Check out the MMoMA Gift Shop</h1>
                        <div class="inline">
                       <p>Owner: {plot.owner}</p>
                       <p>In the HomesteadCraft Shopping District</p><p>NE Corner of 4️⃣🟩</p>
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
                                    <div className="item item--get">{item.qty || '?'} x <img className="item-icon" src={itemIcon} /> {item.item?.name || item.item}  {item.note && <div className="item-note">{item.note}</div>}
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
      qty
      forQty
      note
    }
  }
}
`

export default PlotTemplate
