import requests
import json
from bs4 import BeautifulSoup
from pathlib import Path

base_path = Path(__file__).parent
file_path = (base_path / "../data/semesters.json").resolve()
with open(file_path, 'r') as f:
    semesters = json.load(f)

semesterCode = semesters[0].get("code")

file_path = (base_path / "../data/courses.json").resolve()
with open(file_path, 'r') as f:
    allCourses = json.load(f)


for depart in allCourses:
    for courseCode in allCourses[depart]:
        for sectionNo in allCourses[depart][courseCode].get("section"):
            sectionCode = courseCode + "-" + sectionNo
            url = "https://stars.bilkent.edu.tr/homepage/ajax/schedule.php?COURSE={sectionCode}&SEMESTER={semesterCode}".format(sectionCode=sectionCode, semesterCode=semesterCode)
            page = requests.get(url)
            soup = BeautifulSoup(page.content, "html.parser")
            table = soup.findChildren('table')
            if len(table) != 0:
                body = table[0].findChildren('tbody')
                rows = body[0].findChildren('tr', recursive=False)
                cells = []
                for row in rows:
                    cells = cells + (row.select('td:not([align="right"])', recursive=False))
                for idx, cell in enumerate(cells):
                    if cell.has_attr('class'):
                        allCourses[depart][courseCode]["section"][sectionNo]["schedule"][idx] =  cell.text if cell else "N/A"


file_path = (base_path / "../data/courses.json").resolve()
with open(file_path, "w+", encoding="utf-8") as f:
    json.dump(allCourses, f, ensure_ascii=False, indent=2)
