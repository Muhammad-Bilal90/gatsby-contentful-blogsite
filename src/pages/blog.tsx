import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Head from "../components/Head";



const Blog = () => {

  const data = useStaticQuery(
    graphql`
      query {
        allContentfulBlogPost {
            edges {
              node {
                id
                title
                slug
                author
                dateTime(formatString: "DD MMMM, YYYY")
                summary
                image {
                  url
                }
              }
            }
        }
      }
    `
  )

  // const image = getImage(data.allContentfulBlogPost.edges.node.image)
  // console.log(data.allContentfulAsset)

  return (
    <div >
      <Head title="Blogs" />
      {data.allContentfulBlogPost.edges.map(edge => {
        return (

          <div className="trend_box" key={edge.node.id}>
            <div className="trending_box">
              <div className="area_for_text">
                <Link to={`/blog/${edge.node.slug}/`} style={{ textDecoration: "none", color: "#551A8B" }}>
                  <span className="heading__title">
                    {edge.node.title}
                  </span>
                </Link>
                <div className="author__area">
                  <p className="author__name">Written by: {edge.node.author}</p>
                </div>
                <div className="text">
                  {edge.node.summary}
                </div>
              </div>
              <Link to={`/blog/${edge.node.slug}/`}>
                <img src={edge.node.image.url} alt={edge.node.title} className="featured__image" />
              </Link>
            </div>
          </div>
        )
      })}


    </div>
  )
}

export default Blog;