import semesters from "../data/semesters.json";
import departments from "../data/departments.json";
import courses from "../data/courses.json";
import { Listbox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import Calendar from "../components/calendar";
import Select from "react-select";
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon, CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { prepareSchedules, displayCourses } from "../utils/functions";
import { useUpdateEffect } from "react-use";

const customStyles = {
  input: (provided) => ({
    ...provided,
    "input:focus": {
      boxShadow: "none",
    },
  }),
};

export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(0);

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

  function handleNextSchedule() {
    if (selectedSchedule < schedules.length - 1) {
      setSelectedSchedule(selectedSchedule + 1);
    } else {
      setSelectedSchedule(0);
    }
  }

  function handlePreviousSchedule() {
    if (selectedSchedule > 0) {
      setSelectedSchedule(selectedSchedule - 1);
    } else {
      setSelectedSchedule(schedules.length - 1);
    }
  }

  function scheduleArray(schedules) {
    let arr = [];
    schedules.length > 0 ? schedules.map((schedule) => arr.push(<Calendar schedule={schedule} />)) : arr.push(<Calendar />);
    return arr;
  }

  useUpdateEffect(() => {
    let schedule = prepareSchedules(selectedCourses, filteredInstructors, filteredSections);
    setSchedules(schedule);
    setSelectedSchedule(0);
  }, [selectedCourses, filteredSections, filteredInstructors]);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <section className="relative py-4 leading-6 text-gray-900 lg:py-16">
          <div className="mx-auto w-full text-gray-900 max-w-screen-2xl">
            <div className="flex flex-wrap">
              <div className="flex-none w-full max-w-full lg:flex-none lg:w-1/5 lg:px-2 md:px-50 sm:px-44 px-3 ">
                <div className="box-border">
                  <div className="p-5 mb-8 bg-white rounded-xl border border-gray-200 border-solid">
                    <h2 className="block mb-6 text-lg font-semibold xl:text-2xl leading-5">Courses</h2>
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
                            borderRadius: "8px",
                          }),
                          menu: (base) => ({
                            ...base,
                            zIndex: "50",
                          }),
                        }}
                        isMulti
                        isClearable
                        isSearchable
                        onChange={handleDepartmentSelection}
                      />
                      <span className="inline-block w-full rounded-xl shadow-sm"></span>
                    </div>

                    {/* Courses Drop Down */}

                    <div className="relative">
                      <label className="block text-sm leading-5 font-medium text-black">Courses</label>
                      <Select
                        options={displayCourses(courses, selectedDepartment).map((course) => ({
                          value: course,
                          label: course.code,
                        }))}
                        styles={{
                          ...customStyles,
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#f5f5f5",
                            borderRadius: "8px",
                          }),
                          menu: (base) => ({
                            ...base,
                            zIndex: "50",
                          }),
                        }}
                        isMulti
                        isClearable
                        isSearchable
                        onChange={handleCourseSelection}
                      />
                    </div>
                  </div>

                  {/* Instructor Filters Item */}
                  <div className="p-8 mb-8 bg-white rounded-xl border border-gray-200 border-solid">
                    <h2 className="block mb-6 text-lg font-semibold xl:text-2xl leading-5">Filter Instructors</h2>
                    <div className="relative">
                      <Select
                        options={selectedCourses.map((course) => ({
                          label: course.value.code,
                          options: course.value.sections.map((section) => ({
                            value: section,
                            label: section.instructor,
                          })),
                        }))}
                        styles={{
                          ...customStyles,
                          menu: (base) => ({
                            ...base,
                            zIndex: "50",
                          }),
                        }}
                        isMulti
                        isClearable
                        isSearchable
                        onChange={handleInstructorSelection}
                      />
                    </div>
                  </div>

                  {/* Section Filters */}
                  <div className="p-8 mb-8 bg-white rounded-xl border border-gray-200 border-solid">
                    <h2 className="block mb-6 text-lg font-semibold xl:text-2xl leading-5">Filter Sections</h2>
                    <Select
                      options={selectedCourses.map((course) => ({
                        label: course.value.code,
                        options: course.value.sections.map((section) => ({
                          label: `Section ${section.number}`,
                          value: section,
                        })),
                      }))}
                      styles={{
                        ...customStyles,
                        menu: (base) => ({
                          ...base,
                          zIndex: "50",
                        }),
                      }}
                      isMulti
                      isClearable
                      isSearchable
                      onChange={handleSectionSelection}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-none w-full max-w-full md:mx-2 lg:px-0 px-2 md:flex-none lg:w-[77%]">
                <div className="pb-4 pr-4 pl-5 bg-white rounded-t-lg">
                  <div className="flex flex-wrap items-center">
                    <div className="flex-none w-full max-w-full md:flex-none lg:flex-none ">
                      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
                        <div className="-mt-px w-0 flex-1 flex">
                          <button
                            onClick={handlePreviousSchedule}
                            className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-700 hover:border-indigo-400 ">
                            <ArrowNarrowLeftIcon
                              className="mr-3 h-5 w-5 text-gray-400 hover:text-indigo-400"
                              aria-hidden="true"
                            />
                            Previous
                          </button>
                        </div>
                        <div className=" md:-mt-px md:flex">
                          <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                            {schedules.length > 0 ? selectedSchedule + 1 : 0} / {schedules.length}
                          </a>
                        </div>
                        <div className="-mt-px w-0 flex-1 flex justify-end">
                          <button
                            onClick={handleNextSchedule}
                            className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-700 hover:border-indigo-400">
                            Next
                            <ArrowNarrowRightIcon
                              className="ml-3 h-5 w-5 text-gray-400 hover:text-indigo-400"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
                <div className="box-border">
                  <div className="flex flex-wrap pl-0">
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
                            {scheduleArray(schedules)[selectedSchedule]}
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
    </>
  );
}
