import { IoIosSearch } from "react-icons/io";
import { FaSort } from "react-icons/fa";

const mockProjects = [
  {
    id: 1,
    name: "leadMe",
    domain: "leadme.ttalkak.app",
    status: "실행중",
    time: "4시간 전",
  },
  {
    id: 2,
    name: "ssapick",
    domain: "ssapick.ttalkak.app",
    status: "실행중",
    time: "1일 전",
  },
  {
    id: 3,
    name: "storyboard",
    domain: "storyboard.ttalkak.app",
    status: "실행중",
    time: "3일 전",
  },
  {
    id: 4,
    name: "eclipse",
    domain: "eclipse.ttalkak.app",
    status: "종료",
    time: "2주 전",
  },
  {
    id: 5,
    name: "eclipse",
    domain: "eclipse.ttalkak.app",
    status: "종료",
    time: "2주 전",
  },
  {
    id: 6,
    name: "eclipse",
    domain: "eclipse.ttalkak.app",
    status: "실행중",
    time: "2주 전",
  },
  {
    id: 7,
    name: "eclipse",
    domain: "eclipse.ttalkak.app",
    status: "종료",
    time: "2주 전",
  },
];

export default function OverviewPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-grow mr-4">
          <input
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
            placeholder="프로젝트를 검색해주세요"
          />
          <IoIosSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
        </div>
        <div className="relative">
          <select className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 text-gray-700">
            <option>날짜 순</option>
            <option>이름 순</option>
          </select>
          <FaSort className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="border rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <h2 className="font-semibold">{project.name}</h2>
                <p className="text-sm text-gray-500">{project.domain}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  project.status === "실행중"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {project.status}
              </span>
              <span className="text-sm text-gray-500">{project.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <nav className="inline-flex rounded-md gap-2">
          <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            이전
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium ${
                page === 2
                  ? "text-gray-500 bg-gray-200"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            다음
          </button>
        </nav>
      </div>
    </div>
  );
}
