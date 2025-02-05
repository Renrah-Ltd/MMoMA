import { Link } from "gatsby";
import React from "react";

export default () => {

    return (
        <>
            <Link
                to="/art"
                style={{
                    fontSize: `var(--font-sm)`,
                    textDecoration: `none`,
                }}
            >
                Art
            </Link>
            <Link
                className="button gift-shop-button"
                to="/gift-shop"
                style={{
                    fontSize: `var(--font-sm)`,
                    textDecoration: `none`,
                }}
            >
                Gift Shop
            </Link>
        </>
    )
}