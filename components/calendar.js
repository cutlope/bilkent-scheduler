/* This example requires Tailwind CSS v2.0+ */
import { useRef } from "react";

export default function Calendar() {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  return (
    <div className="flex flex-col max-h-min">
      <div
        ref={container}
        className="flex flex-col flex-auto overflow-auto bg-white">
        <div
          style={{ width: "165%" }}
          className="flex flex-col flex-none max-w-full sm:max-w-none md:max-w-full">
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3">
                M
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3">
                T
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3">
                W
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3">
                T
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3">
                F
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3">
                S
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3">
                S
              </button>
            </div>

            <div className="hidden grid-cols-7 -mr-px text-sm leading-6 text-gray-500 border-r border-gray-100 divide-x divide-gray-100 sm:grid">
              <div className="col-end-1 w-14" />
              <div className="flex items-center justify-center py-3">
                <span>Mon</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Tue</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span className="flex items-baseline">Wed</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Thu</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Fri</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Sat</span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>Sun</span>
              </div>
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 flex-none bg-white w-14 ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="grid col-start-1 col-end-2 row-start-1 divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(18, minmax(3.5rem, 1fr))" }}>
                <div
                  ref={containerOffset}
                  className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">8:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">9:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">10:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">11:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">12:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">13:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">14:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">15:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">16:30</div>
                </div>
                <div />
                <div />
              </div>

              {/* Vertical lines */}
              <div className="hidden grid-cols-7 col-start-1 col-end-2 grid-rows-1 row-start-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="w-8 col-start-8 row-span-full" />
              </div>

              {/* Events */}
              <ol
                className="grid grid-cols-1 col-start-1 col-end-2 row-start-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(18, minmax(0, 1fr)) auto",
                }}>
                <li
                  className="relative flex mt-px sm:col-start-3"
                  style={{ gridRow: "4 / span 2" }}>
                  <a
                    href="#"
                    className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-blue-50 hover:bg-blue-100">
                    <p className="order-1 font-semibold text-blue-700">Breakfast</p>
                    <p className="text-blue-500 group-hover:text-blue-700">
                      <time dateTime="2022-01-12T06:00">6:00 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className="relative flex mt-px sm:col-start-3"
                  style={{ gridRow: "8 / span 5" }}>
                  <a
                    href="#"
                    className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-pink-50 hover:bg-pink-100">
                    <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
                    <p className="text-pink-500 group-hover:text-pink-700">
                      <time dateTime="2022-01-12T09:30">7:30 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className="relative hidden mt-px sm:col-start-6 sm:flex"
                  style={{ gridRow: "4 / span 5" }}>
                  <a
                    href="#"
                    className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 bg-gray-100 rounded-lg group inset-1 hover:bg-gray-200">
                    <p className="order-1 font-semibold text-gray-700">Meeting with design team at Disney</p>
                    <p className="text-gray-500 group-hover:text-gray-700">
                      <time dateTime="2022-01-15T10:00">10:00 AM</time>
                    </p>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
