import Document, { Head, Html, Main, NextScript } from 'next/document'

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
            content="Join the professionals and get a one of a kind branding
            package personalized just for you."
          />
          <meta property="og:site_name" content="bob.tapped.ai" />
          <meta
            property="og:description"
            content="Join the professionals and get a one of a kind branding
            package personalized just for you."
          />
          <meta property="og:title" content="Create Your Brand with AI" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Create Your Brand with AI" />
          <meta
            name="twitter:description"
            content="Join the professionals and get a one of a kind branding
            package personalized just for you."
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
