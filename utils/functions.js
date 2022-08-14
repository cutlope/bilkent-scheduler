const areTimeslotsOverlapping = (...timeslots) => {
  const mergedTimeslots = new Set(timeslots.flat());

  const totalTimeslots = timeslots.reduce((total, timeslot) => total + timeslot.length, 0);

  if (totalTimeslots === 0) {
    return true;
  }

  return mergedTimeslots.size !== totalTimeslots;
};

function getNotOverlappingSections(courseSection, schedule = { timeslots: [], courses: [] }) {
  let sectionslots = courseSection.schedule.map((times) => times.slot);
  let scheduleSlots = Object.values(schedule.timeslots).map((times) => times.classroom.slot);

  if (areTimeslotsOverlapping(sectionslots, scheduleSlots)) {
    return null;
  }
  const course = {
    courseCode: courseSection.coursecode,
    instructor: courseSection.instructor,
    color: courseSection.color,
  };

  const courseTimeslots = { ...courseSection.schedule };

  for (const key of Object.keys(courseTimeslots)) {
    courseTimeslots[key] = {
      classroom: courseSection.schedule[key],
      course: schedule.courses.length,
    };
  }

  let merge = [];
  Object.values(courseTimeslots).map((timeslot) => {
    merge.push(timeslot);
  });
  Object.values(schedule.timeslots).map((timeslot) => {
    merge.push(timeslot);
  });

  return {
    courses: [...schedule.courses, course],
    timeslots: { ...merge },
  };
}

const getSections = (course, filteredSections, filteredInstructors) => {
  let sections = course;
  let plainFiltered = filteredSections.map((section) => section.value.number);
  if (filteredSections && filteredSections.length > 0) {
    sections = sections.filter((section) => !plainFiltered.includes(section.number));
  }
  let plainInstructors = filteredInstructors.map((instructor) => instructor.label);

  if (filteredInstructors && filteredInstructors.length > 0) {
    sections = sections.filter((section) => !plainInstructors.includes(section.instructor));
  }
  return sections;
};

const prepareSchedules = (selectedCourses, filteredInstructors, filteredSections) => {
  let colors = ["indigo", "pink", "blue", "teal", "red", "emerald", "yellow", "orange", "slate"];
  let schedules = [];
  if (selectedCourses && selectedCourses.length > 0) {
    selectedCourses.map((course) => {
      course.value["color"] = colors[Math.floor(Math.random() * colors.length)];
      colors.splice(colors.indexOf(course.value["color"]), 1);
      const newSchedules = [];
      let plainSections = getSections(course.value.sections, filteredSections, filteredInstructors);
      plainSections.map((section) => {
        let i = 0;
        section.coursecode = `${course.label}-${section.number}`;
        section.color = course.value.color;
        do {
          const newSchedule = getNotOverlappingSections(section, schedules[i]);
          if (newSchedule) {
            //             if (Object.keys(newSchedule.timeslots).length !== 0) {
            //                 if (Object.keys(newSchedule.timeslots).length > 2.5 * newSchedule.courses.length) {
            newSchedules.push(newSchedule);
            //   }}
          }
          i += 1;
        } while (i < schedules.length);
      });
      schedules = newSchedules;
    });
  }
  let maxLength = 0;
  schedules.map((schedule) => {
    Object.keys(schedule.timeslots).length > maxLength ? (maxLength = Object.keys(schedule.timeslots).length) : null;
  });

  // schedules.map((schedule) => {
  //     Object.keys(schedule.timeslots).length < maxLength ? (delete schedule.timeslots, delete schedule.courses) : null;
  //     }),

  const result = schedules.filter((schedule) => {
    if (Object.keys(schedule.timeslots).length < maxLength) {
      return false;
    } else {
      return true;
    }
  });

  return result;
};

function displayCourses(dept, selectedDepartment) {
  const list = [];
  selectedDepartment.map((department) => {
    let depart = department.value;
    dept.map((courses) => {
      courses[depart]?.courses?.map((course) => {
        list.push(course);
      });
    });
  });
  return list;
}

export { prepareSchedules, displayCourses };
