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

  if (sectionslots.length === 0) {
    return null;
  }

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
      if (newSchedules.length > 0) {
        schedules = newSchedules;
      }
    });
  }
  let maxLength = 0;
  schedules.map((schedule) => {
    Object.keys(schedule.timeslots).length > maxLength ? (maxLength = Object.keys(schedule.timeslots).length) : null;
  });

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

function stringForm(code) {
  return code.replace(/\s+/g, "").toLowerCase();
}

function processGpa(gpa) {
  if (gpa) {
    return gpa === "0.00" ? "N/A" : gpa;
  } else {
    return "New Course";
  }
}

function calculateGrade(gpa) {
  if (gpa >= 4.0) {
    return "A";
  } else if (gpa >= 3.7) {
    return "A-";
  } else if (gpa >= 3.3) {
    return "B+";
  } else if (gpa >= 3.0) {
    return "B";
  } else if (gpa >= 2.7) {
    return "B-";
  } else if (gpa >= 2.3) {
    return "C+";
  } else if (gpa >= 2.0) {
    return "C";
  } else if (gpa >= 1.7) {
    return "C-";
  } else if (gpa >= 1.3) {
    return "D+";
  } else if (gpa >= 1.0) {
    return "D";
  } else {
    return "X";
  }
}

function generateStructData(courses) {
  let jsonld = [];
  courses.map((course) =>
    course[Object.keys(course)].courses.map((course) =>
      jsonld.push({
        courseName: `${course.code} : ${course.name}`,
        description: `The Average GPA of ${course.code} is ${course.gpa ? processGpa(course.gpa): "N/A" } and a letter grade of ${calculateGrade(course.gpa)}`,
        providerName: `Bilkent University`,
        url: `https://www.thebilkentscheduler.com/courses#${stringForm(course.code)}`,
      })
    )
  );
  return jsonld;
}

export { prepareSchedules, displayCourses, generateStructData, stringForm, processGpa, calculateGrade };
