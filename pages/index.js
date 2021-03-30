import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import HomePage from "../Component/homepage/controler";
import {readFileSync} from "fs";
import path from 'path'

export default function Home({content}) {

  console.log(content);

  return (


      <HomePage language={content}/>

  )
}

export async function getStaticProps({ locale }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const dir = path.join(process.cwd(), "public", "static");
  const filePath = `${dir}/${locale}.json`;
  const buffer = readFileSync(filePath);
  const content = JSON.parse(buffer.toString());
  return {
    props: {
      content,
    },
  };
};

