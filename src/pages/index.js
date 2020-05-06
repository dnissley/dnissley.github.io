import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import portrait from "../images/me.jpg"

const IndexPage = () => (
  <Layout showHeader={false} style={{ paddingTop: "1em" }}>
    <SEO title="Home" />

    <img
      src={portrait}
      alt="portrait"
      style={{ width: "25%", float: "right", margin: "0 0 1em 1em" }}
    />

    <h1>Dylan Nissley - Software Engineer</h1>
    <ul className="fleur-bullet">
      <li>
        Email Address:{" "}
        <a href="mailto:dylan.nissley@gmail.com">dylan.nissley@gmail.com</a>
      </li>
      <li>
        Phone Number: <a href="tel:1-317-238-0418">(317) 238-0418</a>
      </li>
      <li>Location: Chicago, IL</li>
    </ul>

    <h2>What I'm About</h2>
    <ul className="star-bullet">
      <li>Thinking like a founder/owner.</li>
      <li>Making customers feel like badasses.</li>
      <li>Not getting distracted.</li>
      <li>Sticking to priorities ruthlessly.</li>
      <li>Being a smelly tradesman, not a pretentious artisan.</li>
      <li>Developing software progressively, in the image loading sense.</li>
      <li>Being an anti-perfectionist.</li>
      <li>Believing in data, but being skeptical of interpretations.</li>
      <li>Experimenting before I commit.</li>
      <li>Reasonably thorough domain modeling.</li>
      <li>Balancing YAGNI with not painting oneself into a corner.</li>
      <li>Wrestling with messy code.</li>
      <li>Getting tests in place for important stuff.</li>
      <li>Writing code that blends in to it's natural environment.</li>
      <li>... And then evolving that environment.</li>
      <li>Not being a slave to principles.</li>
    </ul>

    <h2>Work Experience</h2>
    <ul className="fancy-bullet">
      <li>Bluecrew</li>
      <li>Angie's List</li>
      <li>EZ Software</li>
    </ul>
  </Layout>
)

export default IndexPage
