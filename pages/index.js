import Image from "next/image";
import Link from "next/link";
import semesters from "../data/semesters.json";
import departments from "../data/departments.json";
import courses from "../data/courses.json";
import { SearchCircleIcon, UserIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useState, Fragment } from "react";
import Calendar from "../components/calendar";
import Select from "react-select";
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { reduceOfferings, getUniqueInstructorList, getSections, getInstructors, getNotOverlappingSections, getFilteredCourses, prepareSchedules } from "../utils/functions";

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
  const [filteredSections, setFilteredSections] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const reducedOfferings = Object.entries(courses).reduce(reduceOfferings, []);

  function handleDepartmentSelection(department) {
    setSelectedDepartment(department);
  }

  function handleCourseSelection(course) {
    setSelectedCourses(course);
  }

  function handleInstructorSelection(instructor) {
    setFilteredInstructors(instructor);
  }

  function handleSectionSelection(section) {
    setFilteredSections(section);
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
                      <div className="relative">
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
                          options={getFilteredCourses(reducedOfferings, selectedDepartment, selectedCourses).map((course) => ({
                            value: course,
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

                    {/* Instructor Filters Item */}
                    <div className="p-8 mb-8 bg-white rounded-md border border-gray-200 border-solid">
                      <h2 className="block mb-6 text-lg font-semibold xl:text-2xl leading-5">Filter Instructors</h2>
                      <div className="relative">
                        <Select
                          options={selectedCourses.map((course) => ({
                            label: course.value.courseCode,
                            options: getUniqueInstructorList(course.value.section),
                          }))}
                          styles={customStyles}
                          isMulti
                          isClearable
                          isSearchable
                          onChange={handleInstructorSelection}
                        />
                      </div>
                    </div>

                    {/* Section Filters */}
                    <div className="p-8 mb-8 bg-white rounded-md border border-gray-200 border-solid">
                      <h2 className="block mb-6 text-lg font-semibold xl:text-2xl leading-5">Filter Sections</h2>
                      <Select
                        options={selectedCourses.map((course) => ({
                          label: course.value.courseCode,
                          options: getSections(course.value.section, filteredSections).map((section) => ({
                            value: section,
                            label: section[0],
                          })),
                        }))}
                        styles={customStyles}
                        isMulti
                        isClearable
                        isSearchable
                        onChange={handleSectionSelection}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-none w-full max-w-full md:ml-4  md:flex-none md:w-2/3 lg:flex-none lg:w-3/4 ">
                  <div className="pb-4 pr-4 pl-5 bg-white">
                    <div className="flex flex-wrap items-center">
                      <div className="flex-none w-full max-w-full md:flex-none lg:flex-none ">
                        <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
                          <div className="-mt-px w-0 flex-1 flex">
                            <a
                              href="#"
                              className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                              <ArrowNarrowLeftIcon
                                className="mr-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              Previous
                            </a>
                          </div>
                          <div className="hidden md:-mt-px md:flex">
                            <a
                              href="#"
                              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                              1
                            </a>
                            {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                            <a
                              href="#"
                              className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                              aria-current="page">
                              2
                            </a>
                            <a
                              href="#"
                              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                              3
                            </a>
                            <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">...</span>
                            <a
                              href="#"
                              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                              8
                            </a>
                            <a
                              href="#"
                              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                              9
                            </a>
                            <a
                              href="#"
                              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                              10
                            </a>
                          </div>
                          <div className="-mt-px w-0 flex-1 flex justify-end">
                            <a
                              href="#"
                              className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                              Next
                              <ArrowNarrowRightIcon
                                className="ml-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="box-border">
                    <div className="flex flex-wrap pl-5 sm:pl-0">
                      <div className="flex-none w-full max-w-full">
                        <div
                          className="box-border"
                          id="nav-tabContent">
                          <div
                            className="block"
                            id="nav-grid"
                            role="tabpanel"
                            aria-labelledby="nav-grid-tab"
                            style={{ transition: "opacity 0.15s linear 0s" }}>
                            <div
                              className="relative h-full"
                              style={{ minHeight: "36rem" }}>
                              {prepareSchedules(selectedCourses, filteredInstructors, filteredSections)}
                              <Calendar />
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
