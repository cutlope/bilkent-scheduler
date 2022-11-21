import requests
import json
from bs4 import BeautifulSoup
from pathlib import Path


def calcSem(semester):
    sem = semester % 10
    if sem == 1:
        return "Fall"
    elif sem == 2:
        return "Spring"


def calcYear(semester):
    yearint = semester // 10
    year = str(yearint) + "-" + str(yearint + 1)
    return year


base_path = Path(__file__).parent
file_path = (base_path / "../data/semesters.json").resolve()
with open(file_path, 'r') as f:
    semesters = json.load(f)

semesterCode = semesters[0].get("code")

file_path = (base_path / "../data/base-courses.json").resolve()
with open(file_path, 'r') as f:
    allCourses = json.load(f)


semester = int(semesterCode)
limitSemester = semester - 50
sem = calcSem(limitSemester)
limitYear = calcYear(limitSemester)
limitRes = limitYear + " " + sem


for depart in allCourses:
    departCode = list(depart.keys())[0]
    for course in depart[departCode]["courses"]:
        courseCode = course["code"]
        url = "https://stars.bilkent.edu.tr/homepage/ajax/courses.oldOfferings.php?COURSE={courseCode}".format(
            courseCode=courseCode)
        page = requests.get(url)
        soup = BeautifulSoup(page.content, "html.parser")
        table = soup.findChildren('table')
        totalGpa = 0
        gpaCount = 0
        if len(table) != 0:
            changed = True
            print(courseCode)
            body = table[0].findChildren('tbody')
            if len(body) != 0:
                rows = body[0].findChildren('tr', recursive=False)
                for row in rows:
                    check = row.select(
                        'td:not([align="right"])', recursive=False)
                    if (check[0].text > limitRes):
                        cells = row.select(
                            'td[align="right"]', recursive=False)
                        if len(cells) != 0:
                            totalGpa += float(cells[1].text)
                            gpaCount += 1
                    else:
                        break
                if gpaCount != 0:
                    course["gpa"] = format((totalGpa / gpaCount), '.2f')


if changed:
    file_path = (base_path / "../data/courses-gpa.json").resolve()
    with open(file_path, "w+", encoding="utf-8") as f:
        json.dump(allCourses, f, ensure_ascii=False, indent=2)
