import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/fav.png" />
          <meta
            httpEquiv="Content-Security-Policy"
            content="
            default-src 'self' 'unsafe-eval'  https://*.googleapis.com https://*.fontawesome.com https://*.gstatic.com https://www.google-analytics.com ; 
            style-src 'self' https://fonts.googleapis.com https://*.fontawesome.com https://*.paytm.in 'unsafe-inline'; 
            font-src 'self' https://fonts.gstatic.com https://*.fontawesome.com;
            script-src 'self'  https://unpkg.com https://www.googletagmanager.com http://www.googletagmanager.com 'unsafe-inline' ;
            media-src *; img-src *; "
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id='G-93NWLELNJZ'`}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-93NWLELNJZ', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <link
            href="https://kit-pro.fontawesome.com/releases/v5.13.0/css/pro.min.css"
            rel="stylesheet"
          />

          <script
            type="text/javascript"
            src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
