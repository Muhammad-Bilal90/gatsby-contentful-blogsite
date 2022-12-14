// require("dotenv").config()
// const dotenv = require("dotenv");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata:{
    title: 'Gatsby Contentful Blogs'
  },

  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-firebase-v9.0`,
      options: {
        credentials: {
          apiKey: "AIzaSyCB5L7tl163yeFOHCDBGtIby1GAqix7uCo",
          authDomain: "gatsby-blog-site-auth.firebaseapp.com",
          projectId: "gatsby-blog-site-auth",
          storageBucket: "gatsby-blog-site-auth.appspot.com",
          messagingSenderId: "1014124443843",
          appId: "1:1014124443843:web:0c7263c5db4330e0baca76"
        }
      }
    }
  ],
};
