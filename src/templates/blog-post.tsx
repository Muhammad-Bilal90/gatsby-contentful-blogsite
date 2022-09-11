import React from 'react';
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import moment from "moment";
import app from "gatsby-plugin-firebase-v9.0";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { store, toggleAuthPage } from '../redux/AuthPageReducer';
import { Button } from '@mui/material';
import Head from '../components/Head';



export const query = graphql`
query ($slug: String!) {
  contentfulBlogPost(slug: { eq: $slug }) {
    title
    slug
    author
    dateTime
    content {
        raw
      }
      image{
        url
      }
      
    }
  }
  `;
  
  const BlogPost = ({data}) => {
    
    const [user, setUser] = React.useState<null | User>(null);
    
    React.useEffect(() => {
      let unSubscribe = true;
      
      const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (unSubscribe && user) {
        setUser(user);
        // console.log(user);
      } else {
        setUser(null);
      }
    });

    return () => { unSubscribe = true; }
  }, []);


  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.image.title["en-US"];
        const url = node.image.file["en-US"].url;
        return <img alt={alt} src={url} />;
      },
    },
  };

  const parsedContent = JSON.parse(data.contentfulBlogPost.content.raw)
  const truncatedContent = parsedContent.content.slice(0,3)
  const content = truncatedContent
  const newContent = {
    ...parsedContent,
    content
  }

  return (
    <Layout>
      <Head title={data.contentfulBlogPost.title} />
      <div >
        <Link to="/">Visit the Blog Page</Link>
        <div className="content">
          <h1>{data.contentfulBlogPost.title}</h1>
          <div className="author__area">
            <p className="author__name">Written by: {data.contentfulBlogPost.author}</p>
          </div>
          <div className="author__area">
              <p className="author__name">Posted on {moment(data.contentfulBlogPost.dateTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
          </div>
          <div>
            <img src={data.contentfulBlogPost.image.url} alt="My Image" width="100%"/>
          </div>
          <div className='blogContentContainer'>
            <div style={{ width: "90%"}}>
              <div className='blogContentDiv'>
                {user ? documentToReactComponents(parsedContent, options) : documentToReactComponents(newContent, options)}
              </div>
              {!user && 
              <>
                  <div className="shade__for_Hide"></div>
                  <div className="msgContainer">
                    <div className='msgContainerChild'>
                      <p className="msg">Read the rest of this Blog with a free account.</p>
                      <Button variant="contained" color="success" onClick={()=>{store.dispatch(toggleAuthPage(true))}} >Login</Button>
                    </div>  
                  </div>
              </>                  
              }
            </div>
          </div>      
        </div>
        <hr />
      </div>  
    </Layout>
  );
};

export default BlogPost;