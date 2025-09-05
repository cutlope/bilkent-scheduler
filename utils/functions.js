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
      if (course.value["color"] === undefined) {
        course.value["color"] = colors[Math.floor(Math.random() * colors.length)];
      }
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
            newSchedules.push(newSchedule);
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

  return result.sort((a, b) => calculateScheduleGapScore(a) - calculateScheduleGapScore(b));
};

function displayCourses(dept, selectedDepartment) {
    let list = [];
    let depart = selectedDepartment.value;
    dept.map((courses) => {
      courses[depart]?.courses?.map((course) => {
        list.push(course);
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
        description: `The Average GPA of ${course.code} is ${course.gpa ? processGpa(course.gpa) : "N/A"} and a letter grade of ${calculateGrade(course.gpa)}`,
        providerName: `Bilkent University`,
        url: `https://bilkent-scheduler.vercel.app/courses#${stringForm(course.code)}`,
      })
    )
  );
  return jsonld;
}

const calculateScheduleGapScore = (schedule) => {
  if (!schedule.timeslots || Object.keys(schedule.timeslots).length === 0) {
    return Infinity; 
  }

  const occupiedSlots = Object.values(schedule.timeslots)
    .map(timeslot => timeslot.classroom.slot)
    .sort((a, b) => a - b);

  if (occupiedSlots.length <= 1) {
    return 0;
  }

  
  const DAYS_PER_WEEK = 7;
  const slotsByDay = {};
  
  occupiedSlots.forEach(slot => {
    const day = slot % DAYS_PER_WEEK; 
    const timePeriod = Math.floor(slot / DAYS_PER_WEEK); 
    
    if (!slotsByDay[day]) {
      slotsByDay[day] = [];
    }
    slotsByDay[day].push(timePeriod);
  });

  let totalGapPenalty = 0;
  let totalDays = Object.keys(slotsByDay).length;

  Object.values(slotsByDay).forEach(dayTimeSlots => {
    dayTimeSlots.sort((a, b) => a - b);
    
    for (let i = 1; i < dayTimeSlots.length; i++) {
      const gap = dayTimeSlots[i] - dayTimeSlots[i-1] - 1; // Gap size (0 = consecutive time periods)
      if (gap > 0) {
        // Exponential penalty for larger gaps between time periods
        totalGapPenalty += Math.pow(gap, 2);
      }
    }
  });

  const daySpreadPenalty = totalDays > 4 ? (totalDays - 4) * 10 : 0;
  
  return totalGapPenalty + daySpreadPenalty;
};

const findOptimalSchedule = (schedules) => {
  if (!schedules || schedules.length === 0) {
    return null;
  }

  if (schedules.length === 1) {
    return schedules[0];
  }

  
  const schedulesWithScores = schedules.map(schedule => ({
    schedule,
    gapScore: calculateScheduleGapScore(schedule)
  }));

  schedulesWithScores.sort((a, b) => a.gapScore - b.gapScore);
  
  return schedulesWithScores[0].schedule;
};

export { prepareSchedules, displayCourses, generateStructData, stringForm, processGpa, calculateGrade, calculateScheduleGapScore, findOptimalSchedule };


/*        Mon Tue Wed Thu Fri Sat Sun
  8:30    0   1   2   3   4   5   6
  9:30    7   8   9  10  11  12  13
  10:30  14  15  16  17  18  19  20
  11:30  21  22  23  24  25  26  27
  12:30  28  29  30  31  32  33  34
  13:30  35  36  37  38  39  40  41
  14:30  42  43  44  45  46  47  48
  15:30  49  50  51  52  53  54  55
  16:30  56  57  58  59  60  61  62
  */