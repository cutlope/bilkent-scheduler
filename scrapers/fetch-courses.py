import requests
import json
from bs4 import BeautifulSoup
from pathlib import Path

courses = {}

base_path = Path(__file__).parent
file_path = (base_path / "../data/semesters.json").resolve()
with open(file_path, 'r') as f:
    semesters = json.load(f)

semesterCode = semesters[0].get("code")

base_path = Path(__file__).parent
file_path = (base_path / "../data/departments.json").resolve()
with open(file_path, 'r') as f:
    departments = json.load(f)


for department in departments:
    departmentCode = department.get("code")
    url = "https://stars.bilkent.edu.tr/homepage/ajax/plainOfferings.php?COURSE_CODE={departmentCode}&SEMESTER={semesterCode}".format(departmentCode=departmentCode, semesterCode=semesterCode)
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    tables = soup.findChildren('table')
    if len(tables) != 1:
        table = tables[1]
        body = table.findChildren('tbody')
        rows = body[0].findChildren('tr')
        offerings = []
        for row in rows:
            cells = row.findChildren('td')
            courseCode = cells[0].text
            code = cells[0].text.split("-")
            instructor =  cells[2].text.strip().replace('\xa0\xa0',' & ')
            offerings.append({code[0]: {
                "name": cells[1].text,
                "section": {
                    code[1]: {
                        "instructor" : instructor,
                        "schedule" : {}

                },
            }}})
        res = dict()
        for item in offerings:
            for list in item:
                if list in res:
                    res[list]["section"].update(item[list]["section"])
                else:
                    res[list] = item[list]

        courses[departmentCode] = res

# result = []
# for department in courses:
#     result.append({department: courses[department]})

file_path = (base_path / "../data/courses.json").resolve()
with open(file_path, "w+", encoding="utf-8") as f:
    json.dump(courses, f, ensure_ascii=False, indent=2)
