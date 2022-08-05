import requests
from bs4 import BeautifulSoup
from pathlib import Path

departments = []
page = requests.get('https://stars.bilkent.edu.tr/homepage/ajax/plainCourseCodes.php')

soup = BeautifulSoup(page.content, "html.parser")
tables = soup.findChildren('table')
table = tables[0]
rows = table.findChildren('tr')

for row in rows[1:]:
    cells = row.findChildren('td')
    departments.append({"code" : cells[0].text})


base_path = Path(__file__).parent
file_path = (base_path / "../data/departments.json").resolve()

with open(file_path,"w") as f:
  f.write(str(departments))
