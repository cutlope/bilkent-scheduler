/* This example requires Tailwind CSS v2.0+ */
import { useRef } from "react";

const prepList = (list) => {
  const newList = [];
  const result = [];
  if (list) {
    Object.values(list.timeslots).map((item) => {
      newList.push(item);
    });
  }
  result.push(newList);
  result.push(list?.courses);
  return result;
};

const color = {
  indigo: {
    bg: "bg-indigo-50 hover:bg-indigo-100",
    text: "text-indigo-700",
    subText: "text-indigo-500 hover:text-indigo-700",
  },
  pink: {
    bg: "bg-pink-50 hover:bg-pink-100",
    text: "text-pink-700",
    subText: "text-pink-500 hover:text-pink-700",
  },
  blue: {
    bg: "bg-blue-50 hover:bg-blue-100",
    text: "text-blue-700",
    subText: "text-blue-500 hover:text-blue-700",
  },
  teal: {
    bg: "bg-teal-50 hover:bg-teal-100",
    text: "text-teal-700",
    subText: "text-teal-500 hover:text-teal-700",
  },
  red: {
    bg: "bg-red-50 hover:bg-red-100",
    text: "text-red-700",
    subText: "text-red-500 hover:text-red-700",
  },
  emerald: {
    bg: "bg-emerald-50 hover:bg-emerald-100",
    text: "text-emerald-700",
    subText: "text-emerald-500 hover:text-emerald-700",
  },
  yellow: {
    bg: "bg-yellow-50 hover:bg-yellow-100",
    text: "text-yellow-700",
    subText: "text-yellow-500 hover:text-yellow-700",
  },
  orange: {
    bg: "bg-orange-50 hover:bg-orange-100",
    text: "text-orange-700",
    subText: "text-orange-500 hover:text-orange-700",
  },
  slate: {
    bg: "bg-slate-50 hover:bg-slate-100",
    text: "text-slate-700",
    subText: "text-slate-500 hover:text-slate-700",
  },
};

const calculateGrid = (timeslot) => {
  let baseGridRow = 2;
  let time = parseInt(timeslot) + 1;
  let row = baseGridRow + Math.floor(time / 7) * 2;
  let column = time % 7;

  return [row, column];
};

export default function Calendar({ schedule }) {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);
  return (
    <div className="flex flex-col max-h-min ">
      <div
        ref={container}
        className="flex flex-col flex-auto overflow-auto bg-white rounded-b-lg pb-1">
        <div
          style={{ width: "165%" }}
          className="flex flex-col flex-none max-w-none md:max-w-full ">
          <div
            ref={containerNav}
            className="sticky top-0 z-60 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 ">
            <div className=" grid grid-cols-7 text-sm leading-6 text-gray-500 border-r border-gray-100 divide-x divide-gray-100  sm:pr-0 ">
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
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-500">8:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-500">9:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-500">10:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-500">11:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-500">12:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-500">13:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-500">14:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-500">15:30</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-500">16:30</div>
                </div>
                <div></div>
                <div />
                <div />
              </div>

              {/* Vertical lines */}
              <div className="grid-cols-7 col-start-1 col-end-2 grid-rows-1 row-start-1 divide-x divide-gray-100 grid">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
              </div>

              {/* Events */}

              <ol
                className="grid col-start-1 col-end-2 row-start-1 grid-cols-7 "
                style={{
                  gridTemplateRows: "1.75rem repeat(18, minmax(0, 1fr)) auto",
                }}>
                {prepList(schedule)[0].map((event, index) => {
                  let instructor = prepList(schedule)[1][event.course].instructor
                  let colour = prepList(schedule)[1][event.course].color;
                  return (
                    <li
                      key={index}
                      className="relative flex mt-px mb-2"
                      style={{ gridRow: `${calculateGrid(event.classroom.slot)[0]} / span 2`, gridColumnStart: `${calculateGrid(event.classroom.slot)[1]}` }}>
                      <a className={`absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 ${color[colour].bg} `}>
                        <p className={`order-1 font-semibold ${color[colour].text}`}>{prepList(schedule)[1][event.course].courseCode} </p>
                        <p className={`${color[colour].subText} break-all flex items-center `}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {event.classroom.classroom || "N/A"}
                        </p>
                        <p className={`${color[colour].subText} break-all flex items-center `}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-3 w-3 mr-1">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                            />
                          </svg>
                          <span className="truncate">{instructor || "N/A"} </span>
                        </p>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
