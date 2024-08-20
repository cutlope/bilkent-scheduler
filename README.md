<a name="readme-top"></a>
<h1> The Bilkent Scheduler </h1>

[![Next][next.js]][next-url] [![React][react.js]][react-url] [![Python][python]][python-url] [![GitHub Actions][github actions]][github actions-url] [![Vercel][vercel]][vercel-url]

[![Product Name Screen Shot][product-screenshot]](https://bilkent-scheduler.vercel.app/)

## Description

The Bilkent Scheduler is a web application that allows students to create their own schedules for the upcoming semester.

The application is built using Next.js and uses a combination of Python BeautifulSoup and Github Actions([git-scraping](https://simonwillison.net/2020/Oct/9/git-scraping/)) to scrape the Bilkent University course catalog and create a JSON file that is used to populate the website. The application is hosted on Vercel.

The Bilkent Scheduler was created because, at the time of its creation, the other available schedulers were not up to date with the current Bilkent University course offerings. The Bilkent Scheduler is updated every semester with the latest course offerings by itself.       
This project was my attempt at creating a more modern-looking and up-to-date scheduler that would be easier to use and self-updating. It was also an experiment to see how much I could learn and create in a span of 2 weeks.

## Table of Contents

- [Installation](#installation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)
- [License](#license)

## Installation

Clone the project:

    git clone https://github.com/cutlope/bilkent-scheduler.git

Install dependencies:

```bash
# Using pnpm
pnpm install

# Using npm
npm install
```

Run dev server:

```bash
# Using pnpm
pnpm run dev

# Using npm
npm run dev
```

<!-- ROADMAP -->

## Roadmap

- [x] Add GPA for each course
  - [ ] Add GPA per instructor for each course
- [x] Add back to top button
- [ ] Add option to block timeslots

See the [open issues](https://github.com/cutlope/bilkent-scheduler/issues) for a full list of proposed features (and known issues).

<!-- CONTACT -->

<!-- ACKNOWLEDGMENTS -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

Shoutout to these people whose projects helped me create this project:

- [furkankose/bilkent-scheduler](https://github.com/furkankose/bilkent-scheduler)
- [mustafaakin/bilkent-scheduler](https://github.com/mustafaakin/bilkent-scheduler)

## Contact

Feel free to contact me at: [hey@cutlope.dev](mailto:hey@cutlope.dev)

<!-- CONTRIBUTING -->

## License

Distributed under the GNU GPLv3 License. See license.txt for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[python-url]: https://www.python.org/
[github actions]: https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white
[github actions-url]: https://github.com/features/actions
[vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[vercel-url]: https://vercel.com/
[product-screenshot]: /public/screenshot.png
