import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <section className="max-w-screen-2xl mx-auto bg-gradient-to-br from-rose-100 to-teal-100 overflow-hidden ">
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
