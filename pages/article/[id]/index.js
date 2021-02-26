//These index.js are dynamically server side generated pages
import { useRouter } from "next/router";
import Link from "next/link";
import {server} from "../../../config/index";
import Meta from "../../../components/Meta";

const article = ({article}) => {
  // const router = useRouter();
  // const {id} = router.query;


  return (
    <>
      <Meta title={article.title}/>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href="/">Go Back</Link>
    </>
  )
}

export const getStaticProps = async (context) => { //automatically called by server
  // console.log(context);
  const res = await fetch(`${server}/api/articles/${context.params.id}`);
  const article = await res.json();
  return {
    props: {
      article
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();
  const ids = articles.map(article => article.id);
  const paths = ids.map(id => ({params: {id: id.toString()}}));

  return {
    paths,
    fallback: false
  }
}


// 1st
//if use this and comment 2nd
// export const getServerSideProps = async (context) => { //automatically called by server
//   // console.log(context);
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
//   const article = await res.json();
//   return {
//     props: {
//       article
//     }
//   }
// }

// 2nd
//if use this comment 1st
// export const getStaticProps = async (context) => { //automatically called by server
//   // console.log(context);
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
//   const article = await res.json();
//   return {
//     props: {
//       article
//     }
//   }
// }

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const articles = await res.json();
//   const ids = articles.map(article => article.id);
//   const paths = ids.map(id => ({params: {id: id.toString()}}));

//   return {
//     paths,
//     fallback: false
//   }
// }

export default article;