import { Fragment } from "react";
import { CarouselJsonLd } from "next-seo";
import courses from "../data/courses-gpa.json";
import semesters from "../data/semesters.json";
import { Tooltip } from "../components/Tooltip.js";
import { NextSeo } from "next-seo";
import { stringForm, generateStructData, processGpa, calculateGrade } from "../utils/functions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function GPA() {
  let semester = semesters[0].year + " " + semesters[0].name;
  let title = `Average GPA for ${semester} Offerings | Bilkent Scheduler`;
  let structData = generateStructData(courses);
  return (
    <>
      <NextSeo
        title={title}
        description="The Bilkent Scheduler compiles the average GPA of courses offered by Bilkent University to make the course selections for students more easier."
        canonical="https://www.thebilkentscheduler.com/courses"
      />
      <CarouselJsonLd
        ofType="course"
        data={structData}
      />
      <div className="px-4 sm:px-6 lg:px-8 relative">
        <div className="sm:flex sm:items-center pl-1 ">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">{semester} Courses</h1>
            <p className="mt-2 text-sm text-gray-700">Average GPA and Letter Grades for Courses offered by Bilkent University in {semester} Semester.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full ">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Code
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        GPA
                        <Tooltip label="Average GPA for past 5 years (summer excluded)">
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
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {courses.map((course) => (
                      <Fragment key={Object.keys(course)}>
                        <tr className="border-t border-gray-200">
                          <th
                            colSpan={4}
                            scope="colgroup"
                            className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">
                            {Object.keys(course)[0]}
                          </th>
                        </tr>
                        {course[Object.keys(course)].courses.map((course, courseIdx) => (
                          <tr
                            key={course.code}
                            className={classNames(courseIdx === 0 ? "border-gray-300" : "border-gray-200", "border-t")}>
                            <td
                              id={stringForm(course.code)}
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {course.code}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{course.name}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{processGpa(course.gpa)}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"> {calculateGrade(course.gpa)}</td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
