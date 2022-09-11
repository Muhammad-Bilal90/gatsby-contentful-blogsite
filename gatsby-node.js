exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const blogTemplate = require.resolve("./src/templates/blog-post.tsx")
    const response = await graphql(`
      query {
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)
    response.data.allContentfulBlogPost.edges.forEach(edge => {
      createPage({
        component: blogTemplate,
        path: `/blog/${edge.node.slug}`,
        context: {
          slug: edge.node.slug,
        },
      })
    })
}