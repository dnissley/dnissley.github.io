import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default function Archive({ data }) {
  return (
    <Layout showFooter={false}>
      <SEO title="Archive of Writings" />

      <h1>Archive of Writings</h1>

      <ul className="six-point-star-bullet">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li>
            {node.frontmatter.date} -{" "}
            <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`
