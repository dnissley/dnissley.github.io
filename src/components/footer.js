import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Footer = () => (
  <footer>
    <hr />
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to="/">Home</Link>
      <Link to="/archive">Writing</Link>
      <Link to="/skills">Skills</Link>
      <a href="https://twitter.com/dylan_nissley">Twitter</a>
      <a href="https://github.com/dnissley">GitHub</a>
    </div>
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
