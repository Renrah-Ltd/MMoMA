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
          icon
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

  // Plots Pages
  plots.forEach(plot => {
    // Replace item IDs with item objects
    const itemsForSaleDetailed = plot.itemsForSale.map((item) => {
      console.log({ item, items: items[0] })
      let getItem = items.find((itemItem) => itemItem.entityID === item.item)
      let forItem = items.find((itemItem) => itemItem.entityID === item.for)

      console.log({ forItem, getItem })

      return {
        ...item,
        for: forItem || item.for,
        item: getItem || item.item
      }
    })

    createPage({
      path: `/gift-shop`,
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

  // Item Pages
  items.forEach(item => {
    const plotsSellingItem = plots.filter(plot => {
      console.dir({ item, plot }, { depth: null })
      const matchingPlotItems = plot.itemsForSale.filter((itemitem) => itemitem.item === item.entityID)

      return !!(matchingPlotItems.length)
    }
    )
    const plotsBuyingItem = plots.filter(plot => {
      console.dir({ item, plot }, { depth: null })
      const matchingPlotItems = plot.itemsForSale.filter((itemitem) => itemitem.for === item.entityID)

      return !!(matchingPlotItems.length)
    }
    )

    const itemSlug = item.entityID.replace('minecraft:', '')

    createPage({
      path: `/item/${itemSlug}`,
      component: path.resolve(`./src/templates/itemTemplate.js`),
      context: {
        item,
        plotsSellingItem,
        plotsBuyingItem,
        itemImage: `${item.entityID.replace('minecraft:', '')}.png`, // Pass the item ID to the context
      },
    })
  })

}