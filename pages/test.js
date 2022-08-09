import Image from "next/image";
import Link from "next/link";
import semesters from "../data/semesters.json";
import departments from "../data/departments.json";
import courses from "../data/courses.json";
import { SearchCircleIcon, UserIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useState, Fragment } from "react";
import Select from "react-select";

const reduceOfferings = (offerings, [departmentCode, departmentOfferings]) => {
  const courses = Object.entries(departmentOfferings).map(([courseCode, course]) => ({
    selectedInstructor: "All",
    departmentCode,
    courseCode,
    ...course,
  }));

  return [...offerings, ...courses];
};

const customStyles = {
  input: (provided, state) => ({
    ...provided,
    "input:focus": {
      boxShadow: "none",
    },
  }),
};

export default function Home() {
  const listings = [];
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const reducedOfferings = Object.entries(courses).reduce(reduceOfferings, []);

  function handleDepartmentSelection(department) {
    setSelectedDepartment(department);
  }

  function handleCourseSelection(course) {
    setSelectedCourses(course);
  }

  return (
    <>
      <div className="bg-gray-100 pb-5">
        <div className="max-w-screen-2xl mx-auto">
          <section className="relative py-4 leading-6 text-gray-900 bg-gray-100 md:md:py-16">
            <div className="mx-auto w-full text-gray-900 max-w-screen-2xl">
              <div className="flex flex-wrap">
                <div className="flex-none w-full max-w-full md:flex-none md:w-1/3 lg:flex-none lg:w-1/5 pr-2">
                  <div className="box-border">
                    <div className="p-4 mb-8 bg-white rounded-md border border-gray-200 border-solid">
                      <h3 className="block mb-6 text-lg font-semibold xl:text-3xl leading-5">Courses</h3>
                      {/* Semesters Dropdown */}
                      <div className="relative pb-3">
                        <Listbox
                          value={selectedSemester}
                          onChange={setSelectedSemester}
                          disabled={true}>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate">
                                {selectedSemester.year} {selectedSemester.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                {semesters.length > 1 ? (
                                  <SelectorIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                ) : null}
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0">
                              <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {semesters.map((semester, semesterIdx) => (
                                  <Listbox.Option
                                    key={semesterIdx}
                                    className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`}
                                    value={semester}>
                                    {({ selected }) => (
                                      <>
                                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                          {semester.year} {semester.name}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>

                      {/* Departments Drop Down */}
                      <div className="relative max-h-30 overflow-auto">
                        <label className="block text-sm leading-5 font-medium text-black">Departments</label>
                        <Select
                          options={departments.map((department) => ({
                            value: department.code,
                            label: department.code,
                          }))}
                          styles={{
                            ...customStyles,
                            multiValue: (base) => ({
                              ...base,
                              backgroundColor: "#f5f5f5",
                              borderRadius: "8px",
                            }),
                          }}
                          isMulti
                          isClearable
                          isSearchable
                          onChange={handleDepartmentSelection}
                        />
                        <span className="inline-block w-full rounded-md shadow-sm"></span>
                      </div>

                      {/* Courses Drop Down */}
                      <div className="relative">
                        <label className="block text-sm leading-5 font-medium text-black">Courses</label>
                        <Select
                          options={reducedOfferings
                            .filter((course) => selectedDepartment.map((dept) => dept.value).includes(course.departmentCode))
                            .map((course) => ({
                              value: course.courseCode,
                              label: course.courseCode,
                            }))}
                          styles={customStyles}
                          isMulti
                          isClearable
                          isSearchable
                          onChange={handleCourseSelection}
                        />
                      </div>
                    </div>

                    {/* Second Filters Item */}
                    <div className="p-8 mb-8 bg-white rounded-md border border-gray-200 border-solid">
                      <h3 className="block mb-6 text-lg font-semibold xl:text-3xl leading-5">Instructors</h3>
                      <ul className="mb-4 list-none">
                        <li className="mb-6 text-left">
                          <a
                            href="javascript:void(0)"
                            className="block relative pr-8 text-gray-600 cursor-pointer hover:text-blue-700 focus:shadow-none focus:no-underline"
                            style={{ transition: "all 0.4s ease 0s" }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 inline-block mr-1 leading-4 normal-case mb-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            Smartphones
                            <span
                              className="absolute w-8 h-8 text-xs leading-7 inline-block text-center no-underline border -right-0 border-gray-200 border-solid hover:bg-blue-700 hover:border-transparent hover:text-white"
                              style={{
                                transition: "all 0.4s ease 0s",
                                borderRadius: "50%",
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}>
                              15
                            </span>
                          </a>
                        </li>


                        <li className="text-left">
                          <a
                            href="javascript:void(0)"
                            className="block relative pr-8 text-gray-600 cursor-pointer hover:text-blue-700 focus:shadow-none focus:no-underline"
                            style={{ transition: "all 0.4s ease 0s" }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 inline-block mr-1 leading-4 normal-case mb-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Jewelry &amp; Accessories
                            <span
                              className="absolute w-8 h-8 text-xs leading-7 inline-block text-center no-underline border -right-0 border-gray-200 border-solid hover:bg-blue-700 hover:border-transparent hover:text-white"
                              style={{
                                transition: "all 0.4s ease 0s",
                                borderRadius: "50%",
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}>
                              55
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="p-8 mb-8 bg-white rounded-md border border-gray-200 border-solid">
                      <h3 className="block mb-6 text-lg font-semibold xl:text-3xl leading-5">Condition</h3>
                      <div
                        className="block pl-6 mb-2"
                        style={{ minHeight: "1.5rem" }}>
                        <input
                          className="float-left mt-1 -ml-6 w-4 h-4 align-top bg-no-repeat bg-contain rounded border border-gray-500 border-solid appearance-none cursor-pointer focus:border-blue-300 focus:shadow-xs focus:no-underline"
                          type="checkbox"
                          defaultValue
                          id="flexCheckDefault1"
                          style={{
                            backgroundPosition: "center center",
                            colorAdjust: "exact",
                          }}
                        />
                        <label
                          className="inline-block cursor-pointer"
                          htmlFor="flexCheckDefault1">
                          All
                        </label>
                      </div>
                      <div
                        className="block pl-6 mb-2"
                        style={{ minHeight: "1.5rem" }}>
                        <input
                          className="float-left mt-1 -ml-6 w-4 h-4 align-top bg-no-repeat bg-contain rounded border border-gray-500 border-solid appearance-none cursor-pointer focus:border-blue-300 focus:shadow-xs focus:no-underline"
                          type="checkbox"
                          defaultValue
                          id="flexCheckDefault2"
                          style={{
                            backgroundPosition: "center center",
                            colorAdjust: "exact",
                          }}
                        />
                        <label
                          className="inline-block cursor-pointer"
                          htmlFor="flexCheckDefault2">
                          New
                        </label>
                      </div>
                      <div
                        className="block pl-6"
                        style={{ minHeight: "1.5rem" }}>
                        <input
                          className="float-left mt-1 -ml-6 w-4 h-4 align-top bg-no-repeat bg-contain rounded border border-gray-500 border-solid appearance-none cursor-pointer focus:border-blue-300 focus:shadow-xs focus:no-underline"
                          type="checkbox"
                          defaultValue
                          id="flexCheckDefault3"
                          style={{
                            backgroundPosition: "center center",
                            colorAdjust: "exact",
                          }}
                        />
                        <label
                          className="inline-block cursor-pointer"
                          htmlFor="flexCheckDefault3">
                          Used
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-none w-full max-w-full md:flex-none md:w-2/3 lg:flex-none lg:w-3/4 ">
                  <div className="box-border">
                    <div className="flex flex-wrap pl-5 sm:pl-0">
                      <div className="flex-none w-full max-w-full">
                        <div className="py-4 pr-4 pl-5 bg-white rounded-md border border-gray-200 border-solid lg:ml-3">
                          <div className="flex flex-wrap items-center">
                            <div className="flex-none w-full max-w-full md:flex-none md:w-1/2 lg:flex-none lg:w-1/2">
                              <h3 className="float-left mb-2 text-sm font-medium text-gray-600 xl:text-xl leading-5">{listings.length > 0 ? `Showing ${listings.length} of ${listings.length} listings found` : "No Calendar found"}</h3>
                            </div>
                          </div>
                        </div>
                        <div
                          className="box-border"
                          id="nav-tabContent">
                          <div
                            className="block"
                            id="nav-grid"
                            role="tabpanel"
                            aria-labelledby="nav-grid-tab"
                            style={{ transition: "opacity 0.15s linear 0s" }}>
                            <div className="flex flex-wrap">
                              {listings.map((idx, listing) => (
                                <div
                                  key={idx}
                                  className="flex-none w-full max-w-full md:flex-none md:w-1/2 lg:flex-none lg:w-1/3  px-3">
                                  <div
                                    className="overflow-hidden mt-8 bg-scroll bg-repeat bg-none rounded-md border border-gray-300 border-solid hover:bg-white hover:shadow-xs"
                                    style={{
                                      transition: "all 0.4s ease 0s",
                                      backgroundPosition: "0% center",
                                    }}>
                                    <div className="overflow-hidden relative">
                                      <Link href="/listings/product">
                                        <a
                                          style={{
                                            transition: "all 0.4s ease 0s",
                                          }}
                                          className="inline-block w-full text-blue-600 cursor-pointer hover:text-blue-700 focus:shadow-none focus:no-underline">
                                          <Image
                                            height={200}
                                            width={300}
                                            layout="responsive"
                                            src="https://picsum.photos/id/0/5616/3744"
                                            alt="#"
                                            className="w-full align-middle"
                                            style={{
                                              transition: "all 0.3s ease 0s",
                                            }}
                                          />
                                        </a>
                                      </Link>

                                      <i
                                        className="inline-block absolute w-6 h-8 text-sm leading-7 text-center text-white normal-case bg-blue-700"
                                        style={{
                                          left: "15px",
                                          borderBottomLeftRadius: "3px",
                                          borderBottomRightRadius: "3px",
                                          clipPath: "polygon(0px 0px, 53% 0px, 100% 0px, 100% 100%, 50% 85%, 0px 100%)",
                                          backgroundPosition: "0% center",
                                          fontFamily: '"LineIcons"',
                                        }}
                                      />
                                      <span
                                        className="inline-block absolute py-px px-2 text-xs tracking-wide leading-4 text-white no- capitalize bg-red-600 rounded-sm"
                                        style={{
                                          transition: "all 0.4s ease 0s",
                                          top: "15px",
                                          right: "15px",
                                          backgroundPosition: "0% center",
                                        }}>
                                        Sale
                                      </span>
                                    </div>
                                    <div className="py-5 pr-6 pl-5">
                                      <a
                                        href="javascript:void(0)"
                                        className="inline-block text-sm font-medium leading-5 text-gray-600 cursor-pointer hover:text-blue-700 focus:shadow-none focus:no-underline"
                                        style={{
                                          transition: "all 0.4s ease 0s",
                                        }}>
                                        {listing.category}
                                      </a>
                                      <h3
                                        className="pt-2 my-2 font-medium border-t border-gray-200 border-solid xl:text-3xl leading-5"
                                        style={{
                                          fontSize: "calc(1.3rem + 0.6vw)",
                                        }}>
                                        <Link href="/category">
                                          <a
                                            className="inline-block text-lg font-semibold leading-5 cursor-pointer hover:text-blue-700 focus:shadow-none focus:no-underline"
                                            style={{
                                              transition: "all 0.4s ease 0s",
                                            }}>
                                            {listing.title}
                                          </a>
                                        </Link>
                                      </h3>
                                      <p className="mt-2 mb-4 font-sans text-sm">
                                        <a
                                          href="javascript:void(0)"
                                          className="inline-block text-gray-600 cursor-pointer hover:text-blue-700 focus:shadow-none focus:no-underline"
                                          style={{
                                            transition: "all 0.4s ease 0s",
                                          }}>
                                          <UserIcon
                                            height={16}
                                            className="inline"></UserIcon>
                                          {listing.owner.firstName}
                                        </a>
                                      </p>
                                      <ul className="overflow-hidden my-4 list-none">
                                        <li
                                          className="float-left relative text-lg font-semibold leading-7 text-left text-blue-700"
                                          style={{ top: "5px" }}>
                                          TL{listing.price}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
