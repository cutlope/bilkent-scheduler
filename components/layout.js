import dynamic from "next/dynamic";
import Header from "./header";
import Head from "next/head";
const Footer = dynamic(() => import("./footer.js"), { ssr: false });

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Bilkent Schedule Generator </title>
        <link
          rel="icon"
          href="favicon.ico?v=2"
        />
        <link
          rel="shortcut icon"
          href="favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta
          name="msapplication-TileColor"
          content="#da532c"
        />
        <meta
          name="theme-color"
          content="#ffffff"
        />
      </Head>
      <section className="max-w-none min-h-screen mx-auto bg-gradient-to-br from-rose-100 to-teal-100 overflow-hidden ">
        <Header />
        <main>{children}</main>
        <Footer />
      </section>
      {/* <div className="fixed top-0 right-0 z-50 flex items-center justify-center w-6 h-6 p-3 m-8 font-mono text-xs text-white bg-gray-700 rounded-full sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500">
        <div className="block sm:hidden md:hidden lg:hidden xl:hidden">al</div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden">sm</div>
        <div className="hidden sm:hidden md:block lg:hidden xl:hidden">md</div>
        <div className="hidden sm:hidden md:hidden lg:block xl:hidden">lg</div>
        <div className="hidden sm:hidden md:hidden lg:hidden xl:block">xl</div>
      </div> */}
    </>
  );
}
