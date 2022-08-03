import Calendar from "../components/calendar";
import Filters from "../components/filters";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col max-h-min">
        {/* 2 column wrapper */}
        <div className="flex-grow w-full mx-auto max-w-screen-2xl xl:px-8 lg:flex">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 min-w-0 bg-white xl:flex">
            <div className="bg-white border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200">
              <div className="h-full py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                {/* Start left column area */}
                <div
                  className="relative h-full"
                  style={{ minHeight: "12rem" }}>

                  <div className="absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg" />
                    <Filters />
                </div>
                {/* End left column area */}
              </div>
            </div>

            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="h-full px-4 py-6 sm:px-6 lg:px-8">
                {/* Start main area*/}
                <div
                  className="relative h-full"
                  style={{ minHeight: "36rem" }}>
                  <Calendar />
                </div>
                {/* End main area */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
