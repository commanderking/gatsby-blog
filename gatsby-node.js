const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const axios = require("axios")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Create pages for Coronavirus data - https://covidtracking.com/api#swaggerWrapper

  const allStates = await axios.get(
    "https://covidtracking.com/api/v1/states/current.json"
  )

  console.log("allStates", allStates.data)

  createPage({
    path: `/covid/`,
    component: require.resolve("./src/templates/covid-home.js"),
    context: { data: allStates.data },
  })

  allStates.data.forEach(state => {
    createPage({
      path: `/covid/${state.state.toLowerCase()}`,
      component: require.resolve("./src/templates/state.js"),
      context: { state },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
