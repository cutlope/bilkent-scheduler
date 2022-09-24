import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {process.env.NODE_ENV === "production" && (
          <Script
            strategy="worker"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}"`}
          />
        )}
        {process.env.NODE_ENV === "production" && (
          <Script
            id="gtm"
            strategy="worker"
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.GA_TRACKING_ID}');`,
            }}
          />
        )}
        {process.env.NODE_ENV === "production" && (
          <Script
            strategy="worker"
            data-website-id="75b69c8b-77ab-4d57-85c0-c998738aa315"
            src="https://analytics.cutlope.dev/cutlope.js"
          />
        )}
      </body>
    </Html>
  );
}
