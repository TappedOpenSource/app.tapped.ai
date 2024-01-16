import Document, { Head, Html, Main, NextScript } from 'next/document';

const title = 'Tapped Ai : world tour from your iPhone';
const description = 'apply to perform for FREE';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content={description}
          />
          <meta property="og:site_name" content="tapped.ai" />
          <meta
            property="og:description"
            content={description}
          />
          <meta
            property="og:title"
            content={title}
          />
          <meta property="og:image" content="https://tapped.ai/og.png" />
          <meta property="og:url" content="https://tapped.ai" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={title}
          />
          <meta
            name="twitter:description"
            content={description}
          />
          <meta property="twitter:image" content="https://tapped.ai/og.png" />
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
