import requests
import json
from bs4 import BeautifulSoup
from pathlib import Path
from requests.adapters import HTTPAdapter, Retry


base_path = Path(__file__).parent
file_path = (base_path / "../data/semesters.json").resolve()
with open(file_path, 'r') as f:
    semesters = json.load(f)



file_path = (base_path / "../data/base-courses.json").resolve()
with open(file_path, 'r') as f:
    allCourses = json.load(f)



semesterCode = semesters[0].get("code")
s = requests.Session()
retries = Retry(total=5,
                backoff_factor=0.1,
                status_forcelist=[ 500, 502, 503, 504 ])
s.mount('https://', HTTPAdapter(max_retries=retries))

for depart in allCourses:
    departCode = list(depart.keys())[0]
    for course in depart[departCode]["courses"]:
        courseCode = course["code"]
        courseName = course["name"]
        for section in course["sections"]:
            sectionNumber = section["number"]
            sectionCode = courseCode + "-" + sectionNumber
            url = "https://stars.bilkent.edu.tr/homepage/ajax/schedule.php?COURSE={sectionCode}&SEMESTER={semesterCode}".format(
                sectionCode=sectionCode, semesterCode=semesterCode)
            page = s.get(url)
            soup = BeautifulSoup(page.content, "html.parser")
            table = soup.findChildren('table')
            if len(table) != 0:
                body = table[0].findChildren('tbody')
                rows = body[0].findChildren('tr', recursive=False)
                cells = []
                for row in rows:
                    cells = cells + \
                        (row.select(
                            'td:not([align="right"])', recursive=False))
                for idx, cell in enumerate(cells):
                    if cell.has_attr('class'):
                        section["schedule"].append(
                            {"slot": idx, "classroom": cell.text})


file_path = (base_path / "../data/courses.json").resolve()
with open(file_path, "w+", encoding="utf-8") as f:
    json.dump(allCourses, f, ensure_ascii=False, indent=2)
