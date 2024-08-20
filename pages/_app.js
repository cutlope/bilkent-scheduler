import "../styles/globals.css";
import Layout from "../components/layout.js";
import { DefaultSeo } from "next-seo";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <DefaultSeo
        title="The Bilkent Scheduler"
        description="The Bilkent Scheduler is a web application that helps you to plan your classes."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://bilkent-scheduler.vercel.app/",
          site_name: "The Bilkent Scheduler",
          title: "The Bilkent Scheduler",
          description: "Schedule Your Courses in a Hassle-Free Way",
          images: [
            {
              url: "https://og.tailgraph.com/og?fontFamily=Benne&title=The%20Bilkent%20Scheduler&titleTailwind=text-gray-800%20font-bold%20text-6xl&text=Schedule%20Your%20Courses%20in%20a%20Hassle-Free%20Way&textTailwind=text-gray-700%20text-2xl%20mt-4&logoTailwind=h-8&bgTailwind=bg-white%20bg-gradient-to-br%20from-rose-100%20to-teal-100&footer=&footerTailwind=text-teal-600&t=1660500070372&refresh=1",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
          ],
        }}
      />

      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}

export default MyApp;
