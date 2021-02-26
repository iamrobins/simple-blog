// import { NextPageContext } from 'next';
// import { AppInitialProps } from 'next/app';
import { NextPage } from 'next';
import styles from '../styles/Home.module.css'
import Link from "next/link";

type article = { id: string, title: string, excerpt: string, body: string };

interface HomeProps {
  articles: article[]
}

const Home: NextPage<HomeProps> = ({articles}) => {
  return (
    <div className={styles.container}>
      {articles.map(article => (
        <Link key={article.id} href="article/[id]" as={`/article/${article.id}`}>
        <a>
          <h3>{article.title} &rarr;</h3>
          <p>{article.body}</p>
        </a>
        </Link>
      ))}
      <h1>Simple Blog Next.js</h1>
    </div>
  )
}
    
export const getStaticProps = async() => {
  const res = await fetch("http://localhost:3000/api/articles");
  const articles = await res.json();
  return {
    props: {articles}
  }
}
export default Home;