const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allPlotsJson {
        nodes {
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
          itemsForSale{
          item
          for
          qty
          forQty
          note
          }
        }
      }
      allItemsJson {
        nodes {
          id
          entityID
          name
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
    throw new Error("Error querying plots")
  }

  const plots = result.data.allPlotsJson.nodes
  const items = result.data.allItemsJson.nodes

  plots.forEach(plot => {
    // Replace item IDs with item objects
    const itemsForSaleDetailed = plot.itemsForSale.map((item) => {
      console.log({item, items: items[0]})
      let getItem = items.find((itemItem) => itemItem.entityID === item.item)
      let forItem = items.find((itemItem) => itemItem.entityID === item.for)

      console.log({forItem, getItem})

      return {
        ...item,
        for: forItem || item.for,
        item: getItem || item.item
      }
    })

    createPage({
      path: `/plot/${plot.plotNumber}`,
      component: path.resolve(`./src/templates/plotTemplate.js`),
      context: {
        plotNumber: plot.plotNumber,
        plot: {
          ...plot,
          itemsForSale: itemsForSaleDetailed,
        },
      },
    })
  })
}