import requests
import json
from bs4 import BeautifulSoup
from pathlib import Path


checkLinks = [
    "https://stars.bilkent.edu.tr/homepage/ajax/course.sections.php?COURSE=CS%20101&SEMESTER=",
    "https://stars.bilkent.edu.tr/homepage/ajax/course.sections.php?COURSE=MATH%20101&SEMESTER="
]


base_path = Path(__file__).parent
file_path = (base_path / "../data/semesters.json").resolve()
with open(file_path, 'r') as f:
    semesters = json.load(f)

latestSemester = int(semesters[0].get("code"))
if latestSemester % 10 == 2:
    checkSemester = latestSemester + 9
else:
    checkSemester = latestSemester + 1


for link in checkLinks:
    page = requests.get(link + str(checkSemester))
    soup = BeautifulSoup(page.content, "html.parser")
    result = soup.find('div', class_="RollOverTable")
    if result is not None:

        yearint = checkSemester // 10
        year = str(yearint) + "-" + str(yearint + 1)
        if checkSemester % 10 == 1:
            name = "Fall"
        else:
            name = "Spring"

        semesters.append({"code": str(checkSemester),
                         "year": year,
                         "name": name})
        with open(file_path, 'w+') as f:
            json.dump(semesters, f)
        print("Added semester " + str(checkSemester))
        break  # break the loop if the semester is found
        exit(0)
