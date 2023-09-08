import Document, { Head, Html, Main, NextScript } from 'next/document';


class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <meta
            name="description"
            content="we want to sign you to our label. apply for free"
          />
          <meta property="og:site_name" content="tapped.ai" />
          <meta
            property="og:description"
            content="we want to sign you to our label. apply for free"
          />
          <meta
            property="og:title"
            content="Tapped AI : world's first AI label"
          />
          <meta property="og:image" content="https://tapped.ai/og.png"></meta>
          <meta property="og:url" content="https://tapped.ai"></meta>
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Tapped AI : world's first AI label"
          />
          <meta
            name="twitter:description"
            content="we want to sign you to our label. apply for free"
          />
          <meta property="twitter:image" content="https://tapped.ai/og.png"></meta>
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
