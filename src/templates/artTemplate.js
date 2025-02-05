import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import "../styles/main.scss"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ArtTemplate = ({ data, pageContext }) => {
    const { art } = pageContext


    return (
        <Layout className="art-page art-single">
                <Seo title={art.name} />

                <img src={art.image} />

            <div className="art-single__description">
                <h1>{art.name}</h1>

                {art?.description && (<div dangerouslySetInnerHTML={{__html: art.description}} />)}
                {art?.forSale && (<div>For Sale</div>)}


            </div>
            
        </Layout>
    )
}




export default ArtTemplate