import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import portrait from "../images/me.jpg"

const email = "dylan.nissley@gmail.com"

const phone = {
  linkFormat: "1-317-238-0418",
  humanFormat: "(317) 238-0418",
}

const principles = [
  "Thinking like a founder/owner.",
  "Making customers feel like badasses.",
  "Not getting distracted.",
  "Sticking to priorities ruthlessly.",
  "Being a smelly tradesman, not a pretentious artisan.",
  "Developing software progressively, in the image loading sense.",
  "Being an anti-perfectionist.",
  "Believing in data, but being skeptical of interpretations.",
  "Experimenting before I commit.",
  "Reasonably thorough domain modeling.",
  "Balancing YAGNI with not painting oneself into a corner.",
  "Wrestling with messy code.",
  "Getting tests in place for important stuff.",
  "Writing code that blends in to it's natural environment.",
  "... And then evolving that environment.",
  "Not being a slave to principles or conventions.",
]

const jobs = [
  {
    orgName: "Bluecrew",
    startYear: "2019",
    endYear: "Present",
    description: [
      "Jobs marketplace -- think Uber for warehouse, food prep, and other low skill jobs",
      "Working primarily on the employer side of the app, doing backend API work",
      "Full stack JS + MySQL + Redis",
    ],
  },
  {
    orgName: "Angie's List",
    startYear: "2014",
    endYear: "2019",
    description: [
      "Search, ratings, and reviews for home service providers",
      "Assisted with migration from legacy C# to modern Scala + JS stack",
      "Worked on communications infrastructure: Email + SMS + Push Notifications",
      "JS + Java + Scala + C# + MySQL + MS SQL Server + Redis + Elasticsearch + Kafka",
    ],
  },
  {
    orgName: "EZ Software",
    startYear: "2007",
    endYear: "2014",
    description: [
      "Restaurant and retail point of sale software",
      "Integrated hardware: pole displays, scales, barcode scanners, payment terminals",
      "Integrated software: payment gateways, quickbooks",
      "VB6 + C# + MySQL",
    ],
  },
]

const WorkHistoryItem = ({ job }) => (
  <li>
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
      }}
    >
      <h3>{job.orgName}</h3>
      <hr
        style={{
          flexGrow: 1,
          margin: "0 0.5em",
        }}
      />
      <div>
        {job.startYear} to {job.endYear}
      </div>
    </div>
    <ul className="arrowhead-bullet" style={{ padding: "0.5em 0em" }}>
      {job.description.map(bullet => (
        <li>{bullet}</li>
      ))}
    </ul>
  </li>
)

const IndexPage = ({ data }) => (
  <Layout showFooter={false}>
    <SEO title="Home" />

    <img
      src={portrait}
      alt="portrait"
      style={{ width: "25%", float: "right", margin: "0 0 1em 1em" }}
    />

    <h1>Dylan Nissley - Software Engineer</h1>
    <ul className="four-point-star-bullet">
      <li>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </li>
      <li>
        Phone: <a href={`tel:${phone.linkFormat}`}>{phone.humanFormat}</a>
      </li>
      <li>Location: Chicago, IL</li>
    </ul>

    <h2 style={{ marginTop: "2em" }}>Recent Writing</h2>
    <ul className="six-point-star-bullet">
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <li>
          {node.frontmatter.date} -{" "}
          <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
        </li>
      ))}
      <li>
        See more in the <Link to="/archive">archive</Link>
      </li>
    </ul>

    <h2 style={{ marginTop: "2em" }}>What I'm About</h2>
    <ul className="six-point-star-bullet">
      {principles.map(p => (
        <li>{p}</li>
      ))}
    </ul>

    <h2 style={{ margin: "2em 0 1em" }}>Work Experience</h2>
    <ul className="no-bullet">
      {jobs.map(job => (
        <WorkHistoryItem job={job} />
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
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
