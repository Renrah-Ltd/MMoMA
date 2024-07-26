import React from "react"
import { Link } from "gatsby"
import "../styles/main.scss"
import Layout from "../components/layout"

const ItemTemplate = ({ pageContext }) => {
  const { item, plotsSellingItem } = pageContext

  return (
    <Layout className="item-page">
      <h1>{item.name}</h1>
      <div class="item-info">
          <h2>Shops selling this item:</h2>
          <ul>
            {plotsSellingItem.length > 0 ? (
              plotsSellingItem.map((plot, index) => (
                <li key={index}>
                  <Link to={`/plot/${plot.plotNumber}`}>
                    {plot?.shopName ? plot.shopName : `Plot ${plot.plotNumber}`} (Owner: {plot.owner})
                  </Link>
                </li>
              ))
            ) : (
              <p>No shops currently selling this item</p>
            )}
          </ul>
      </div>
    </Layout>
  )
}

export default ItemTemplate