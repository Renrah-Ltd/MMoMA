

import React from "react"
import { graphql, Link } from "gatsby"
import "../styles/main.scss"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Map from "../components/map"
import outside from "../images/homesteadcraft.png"

const IndexPage = ({ data }) => {

    const handleClick = (event) => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(event.currentTarget);
        selection.removeAllRanges();
        selection.addRange(range);
    };




    return (
        <Layout className="home-page">
            <Seo title="Welcome" />

            <div class="grid grid--1 homesteadcraft-intro">
                <div className="image-wrapper"><img src={outside} /></div>
                <div className="intro__text">
                    <p className="large">MMoMA exists entirely on the</p>
                    <h1>HomesteadCraft</h1>
                    <p className="large" style={{ textAlign: "right" }}>Minecraft Server</p>

                    <p>A fantastic 21+ Vanilla(ish) SMP Minecraft Server.<br />Chill vibes, chill people and best of all, no kids allowed.</p>


                    <h2>Java Server Address:</h2>
                    <h3 onClick={handleClick} className="server-address">play.homesteadcraft.com</h3>
                    <p>If you decide to join the Homestead, use <code onClick={handleClick}>/refer JackJackSlaps</code> to let them know I sent you.</p>
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
