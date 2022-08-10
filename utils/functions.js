function reduceOfferings(offerings, [departmentCode, departmentOfferings]) {
  const courses = Object.entries(departmentOfferings).map(([courseCode, course]) => ({
    departmentCode,
    courseCode,
    ...course,
  }));

  return [...offerings, ...courses];
}

function getUniqueInstructorList(sections) {
  if (sections) {
    return [...new Set(Object.values(sections).map(({ instructor }) => instructor))].map((instructor) => ({
      value: instructor,
      label: instructor,
    }));
  }
}

function getSections(course, filteredSections) {
  let sections = Object.entries(course);
  let plainfiltered = filteredSections?.map(({ label }) => label);
  if (filteredSections && filteredSections.length > 0) {
    sections = sections.filter(([sectionCode, section]) => !plainfiltered.includes(sectionCode));
  }
  return sections;
}

function getInstructors(instructors) {
  let instructorList = [];
  instructors.map((instructor) => instructorList.push(instructor.value));
  return instructorList;
}

const areTimeslotsOverlapping = (...timeslots) => {
  const mergedTimeslots = new Set(timeslots.flat());

  const totalTimeslots = timeslots.reduce((total, timeslot) => total + timeslot.length, 0);

  return mergedTimeslots.size !== totalTimeslots;
};

function getFilteredCourses(courses, selectedDepartments, selectedCourse) {
  if (selectedDepartments.length === 0) {
    return courses;
  }
  courses = courses.filter((course) => selectedDepartments.map((department) => department.value).includes(course.departmentCode));

  if (selectedCourse.length === 0) {
    return courses;
  }

  let courseList = selectedCourse.map((course) => course.label);
  courses = courses.filter((course) => !courseList.includes(course.courseCode));
  return courses;
}

function getNotOverlappingSections(courseSection, schedule = { timeslots: [], courses: [] }) {
  if (areTimeslotsOverlapping(Object.keys(courseSection.schedule), Object.keys(schedule.timeslots))) {
    return null;
  }

  const course = {
    courseCode: courseSection.courseCode,
    instructor: courseSection.instructor,
  };

  const courseTimeslots = { ...courseSection.schedule };

  for (const key of Object.keys(courseTimeslots)) {
    courseTimeslots[key] = {
      classroom: courseSection.schedule[key],
      course: schedule.courses.length,
    };
  }

  return {
    courses: [...schedule.courses, course],
    timeslots: { ...schedule.timeslots, ...courseTimeslots },
  };
}

const prepareSchedules = (selectedCourses, filteredInstructors, filteredSections) => {
    let schedules = [];

    if (selectedCourses && selectedCourses.length > 0) {
      for (const selectedCourse of selectedCourses) {
        const newSchedules = [];
        let plainSections = getSections(selectedCourse.value.section, filteredSections);
        let plainInstructors = getInstructors(filteredInstructors);
        plainSections.map(([sectionCode, section]) => {
          plainSections = plainSections.filter(([sectionCode, section]) => !plainInstructors.includes(section.instructor));
        });
        plainSections.map(([sectionCode, section]) => {
          let i = 0;
          section.courseCode = `${selectedCourse.label}-${sectionCode}`;
          do {
            const newSchedule = getNotOverlappingSections(section, schedules[i]);
            if (newSchedule) {
              newSchedules.push(newSchedule);
            }

            i += 1;
          } while (i < schedules.length);
        });
        schedules = newSchedules;
      }
    }
    return schedules;
  };

  
export { reduceOfferings, getUniqueInstructorList, getSections,  getFilteredCourses, prepareSchedules };
