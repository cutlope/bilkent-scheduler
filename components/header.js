import Link from "next/link";

export default function Header() {
  return (
    <div className="px-4 pt-4 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div className="w-auto mr-14">
            <Link href="/">
              <a className="font-heading font-semibold text-lg text-black">The Bilkent Scheduler</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
