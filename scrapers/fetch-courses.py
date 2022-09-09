import requests
import json
from bs4 import BeautifulSoup
from pathlib import Path
from requests.adapters import HTTPAdapter, Retry

courses = []

s = requests.Session()
retries = Retry(total=7,
                backoff_factor=0.1,
                status_forcelist=[ 500, 502, 503, 504 ])
s.mount('https://', HTTPAdapter(max_retries=retries))

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
    url = "https://stars.bilkent.edu.tr/homepage/ajax/plainOfferings.php?COURSE_CODE={departmentCode}&SEMESTER={semesterCode}".format(
        departmentCode=departmentCode, semesterCode=semesterCode)
    page = s.get(url)
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
            instructor = cells[2].text.strip().replace('\xa0\xa0', ' & ')
            offerings.append(
                {
                    "code": code[0],
                    "name": cells[1].text,
                    "sections": [
                        {"number": code[1],
                         "instructor": instructor,
                         "schedule": []}]
                }
            )
        res = dict()
        for item in offerings:
            if item["code"] in res:
                res[item["code"]]["sections"].append(item["sections"][0])
            else:
                res[item["code"]] = item

        list = []
        for item in res:
            list.append(res[item])
        res = {"courses": list}
        courses.append({departmentCode: res})


file_path = (base_path / "../data/base-courses.json").resolve()
with open(file_path, "w+", encoding="utf-8") as f:
    json.dump(courses, f, ensure_ascii=False, indent=2)
