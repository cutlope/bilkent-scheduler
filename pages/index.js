import semesters from "../data/semesters.json";
import departments from "../data/departments.json";
import courses from "../data/courses.json";
import { useState } from "react";
import Calendar from "../components/calendar";
import Select from "react-select";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { prepareSchedules, displayCourses } from "../utils/functions";
import { useUpdateEffect } from "react-use";
import { NextSeo } from "next-seo";
import { Tooltip } from "../components/Tooltip";

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
  const selectedSemester = semesters[0];
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

  function handleInstructorDisplay(course) {
    let arr = [];
    let result = [];
    course.value.sections.map((section) => arr.push(section.instructor));
    course.value.sections.map((section) => {
      arr.map((instructor) => {
        if (instructor === section.instructor) {
          result.push(section);
          arr[arr.indexOf(instructor)] = "";
        }
      });
    });

    return Array.from(new Set(result));
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

  let semester = semesters[0].year + " " + semesters[0].name;
  let title = `The Bilkent Scheduler | ${semester}`;

  return (
    <>
      <NextSeo
        title={title}
        description="The Bilkent Scheduler makes it easy for Bilkent students to find the perfect schedule for courses during registration with upto date semester offerings."
        canonical="https://bilkent-scheduler.vercel.app/"
      />
      <section className="relative  py-4 leading-6 text-gray-900 lg:pb-12 lg:pt-6">
        <div className="flex flex-wrap">
          <div className="flex-none w-full max-w-full lg:flex-none lg:w-[23%] lg:px-2 md:px-50 sm:px-16 px-3 ">
            <div className="box-border">
              <div className="relative group">
                <div className="absolute animate-pulse -inset-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-lg blur opacity-50 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="py-6 px-4 mb-8 bg-white rounded-xl border border-gray-200 border-solid relative ring-1 ring-gray-900/5">
                  <h2 className="block mb-6 text-lg font-semibold xl:text-2xl leading-5">Courses</h2>
                  {/* Semesters Dropdown */}
                  <div className="relative pb-3">
                    <div className="relative mt-1">
                      <span className="block text-sm leading-8 font-medium text-black">Semester</span>
                      <div className="relative w-full py-2 pl-3 pr-10 text-left shadow-md sm:text-sm rounded-md">
                        <span className="block truncate">
                          {selectedSemester.year} {selectedSemester.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Departments Drop Down */}
                  <div className="relative">
                    <label className="block text-sm leading-8 font-medium text-black">Departments</label>
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
                    <label className="block text-sm leading-8 font-medium text-black">Courses</label>
                    <Select
                      options={selectedDepartment.map((department) => ({
                        label: department.label,
                        options: displayCourses(courses, department).map((course) => ({
                          value: course,
                          label: course.code,
                        })),
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
              </div>

              {/* Instructor Filters Item */}
              <div className="relative group">
                <div className="absolute animate-pulse animation-delay-500 -inset-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-lg blur opacity-50 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                <div className="py-6 px-4 mb-8 bg-white rounded-xl border border-gray-200 border-solid relative ring-1 ring-gray-900/5">
                  <h2 className="block mb-6 text-lg font-semibold xl:text-xl leading-5  ">
                    Filter Instructors
                    <Tooltip label="Exclude Instructors">
                      <button>
                        <svg
                          className="ml-2 w-4 h-4 text-gray-400 hover:text-gray-500"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Show information</span>
                      </button>
                    </Tooltip>
                  </h2>

                  <div className="relative">
                    <Select
                      options={selectedCourses.map((course) => ({
                        label: course.value.code,
                        options: handleInstructorDisplay(course).map((section) => ({
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
              </div>

              {/* Section Filters */}
              <div className="relative group">
                <div className="absolute animate-pulse animation-delay-1000 -inset-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-lg blur opacity-50 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="py-6 px-4 mb-8 bg-white rounded-xl border border-gray-200 border-solid relative ring-1 ring-gray-900/5">
                  <h2 className="block mb-6 text-lg font-semibold xl:text-xl leading-5">Filter Sections</h2>
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
          </div>
          <div className="relative group flex-none w-full max-w-full md:mx-2 lg:px-0 sm:px-2 md:flex-none lg:w-[75%]">
            <div className="absolute -inset-0.5 bg-gradient-to-l from-cyan-400 via-indigo-400 to-pink-300 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <div className="pb-4 pr-4 pl-5 bg-white rounded-t-lg">
                <div className="flex flex-wrap items-center">
                  <div className="flex-none w-full max-w-full md:flex-none lg:flex-none ">
                    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
                      <div className="-mt-px w-0 flex-1 flex">
                        <button
                          onClick={handlePreviousSchedule}
                          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-700 hover:border-emerald-400 ">
                          <ArrowLongLeftIcon
                            className="mr-3 h-5 w-5 text-gray-400 hover:text-emerald-400"
                            aria-hidden="true"
                          />
                          Previous
                        </button>
                      </div>
                      <div className=" md:-mt-px md:flex">
                        <span className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                          {schedules.length > 0 ? selectedSchedule + 1 : 0} / {schedules.length}
                        </span>
                      </div>
                      <div className="-mt-px w-0 flex-1 flex justify-end">
                        <button
                          onClick={handleNextSchedule}
                          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-700 hover:border-emerald-400">
                          Next
                          <ArrowLongRightIcon
                            className="ml-3 h-5 w-5 text-gray-400 hover:text-emerald-400"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              <div
                className="relative h-full"
                style={{ minHeight: "36rem" }}>
                {scheduleArray(schedules)[selectedSchedule]}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
