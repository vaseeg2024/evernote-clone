import styles from "./page.module.css";
import Head from "next/head";
import Evernote from "@/components/Evernote";

export default function Home() {
  return (
    <div>
      <Head>
        <title >Evernote Clone</title>
        <meta name="description" content="This is an evernote clone"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>
          Evernote Clone
        </h1>
        <Evernote/>
      </main>

      {/* <footer className={styles.footer}>

      </footer> */}

    </div>
  );
}
