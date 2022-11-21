import Link from "next/link";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const router = useRouter();
  const tabs = [
    { name: "Scheduler", href: "/", current: router.pathname === "/" },
    { name: "Courses GPA", href: "courses", current: router.pathname === "/courses" },
  ];

  return (
    <div className="px-4 pt-4">
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
            <Link
              className="font-heading font-semibold text-lg text-black"
              href="/">
              The Bilkent Scheduler
            </Link>
          </div>
        </div>
      </div>
      <div className="block pt-6">
        <div className="border-b border-gray-200 mb-4">
          <nav
            className="-mb-px flex justify-center"
            aria-label="Tabs">
            {tabs.map((tab, idx) => (
              <Link
                key={idx}
                href={tab.href}
                className={classNames(tab.current ? "border-teal-500 text-teal-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300", "sm:w-1/6 py-4 px-1 text-center border-b-2 font-medium text-sm mx-2")}
                aria-current={tab.current ? "page" : undefined}>
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
