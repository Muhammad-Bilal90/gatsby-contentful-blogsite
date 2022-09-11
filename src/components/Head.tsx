import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql,useStaticQuery} from 'gatsby';

interface props{
    title: string
}
export default function Head ({title}:props) {


        const data = useStaticQuery(graphql`
        query {
          site{
            siteMetadata{
              title
            }
          }
        }
        `)

    return(
        <Helmet title = {`${title} | ${data.site.siteMetadata.title}`}/>
       
    )

}