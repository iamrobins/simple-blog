//These index.js are dynamically server side generated pages
import { useRouter } from "next/router";
import Link from "next/link";
import {server} from "../../../config/index";
import Meta from "../../../components/Meta";
import {InferGetStaticPropsType, GetStaticPropsContext} from "next";

interface Article {
  id: string,
  title: string,
  excerpt: string,
  body: string
}

const article = ({article}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(Object.keys(article));

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

type UrlParams = Record<"id", string>


export const getStaticProps = async (context: GetStaticPropsContext<UrlParams>) => { 
  // const res = await fetch(`${server}/api/articles/${context.params?.id}`);
  const res = await fetch(`${server}/api/articles/${context.params!.id}`);
  const article = await res.json() as Article;
  return {
    props: {
      article
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();
  const ids = articles.map((article: Article) => article.id);
  const paths = ids.map((id: string) => ({params: {id: id.toString()}}));

  return {
    paths,
    fallback: false
  }
}

export default article;