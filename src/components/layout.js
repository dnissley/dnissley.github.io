/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Footer from "./footer"
import "../styles/reset.css"
import "../styles/fonts.css"
import "../styles/layout.css"

const Layout = ({ children, showFooter = true }) => {
  return (
    <div id="container">
      <main>{children}</main>
      {showFooter ? <Footer /> : null}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
