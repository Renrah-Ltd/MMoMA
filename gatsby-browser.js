/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it

exports.onInitialClientRender = () => {
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
        const newUrl = window.location.href.replace('https:', 'http:');
        window.location.replace(newUrl);
    }
};
