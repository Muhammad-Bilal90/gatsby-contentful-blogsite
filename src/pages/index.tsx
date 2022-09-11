import { Link } from "gatsby"
import * as React from "react"
import Layout from "../components/Layout/layout"
import Blog from "./blog";

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <Blog />
      </div>  
    </Layout>
  )
}

export default IndexPage;