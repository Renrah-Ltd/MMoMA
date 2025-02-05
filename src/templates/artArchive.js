import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import "../styles/main.scss"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ArtArchive = ({ data, pageContext }) => {
    const { art } = pageContext
    const artMap = art.map((art)=> { return (<div className="art-card"><Link to={`/art/${art.slug}`}><div class="art-card__image"><img src={art.image} /></div><h2>{art.name}</h2></Link></div>)})

    return (
        <Layout className="art-page art-archive">
                <Seo title={"Look at our art"} />

<div class="grid grid--3 grid--mobile-2">{artMap}</div>            
        </Layout>
    )
}




export default ArtArchive