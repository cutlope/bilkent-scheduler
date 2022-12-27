export default function Footer() {
  return (
    <div className="px-4 pb-6">
      <div className="border-b border-gray-200"></div>

      <ul className="flex flex-wrap justify-center -m-5 pt-8">
        <li className="p-5">
          <a
            className="font-heading text-base text-gray-900 hover:text-gray-700 flex items-center"
            href="https://forms.gle/orWH296qir6KQ5BQ9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Report a Bug
          </a>
        </li>
        <li className="p-5">
          <a
            className="font-heading text-base text-gray-900 hover:text-gray-700 flex items-center"
            href="https://forms.gle/orWH296qir6KQ5BQ9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Request a Feature
          </a>
        </li>
      </ul>
      <ul className="flex flex-wrap justify-center">
        <li className="pt-2">
          Made with ❤️ by{" "}
          <a
            className="text-purple-500 font-bold"
            target="_blank"
            href="https://cutlope.dev">
            Cutlope
          </a>
        </li>
      </ul>
    </div>
  );
}
