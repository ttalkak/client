"use client";

import { IoIosSearch } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import Modal from "@/app/projects/components/Modal";
import { useState } from "react";
import Link from "next/link";

const mockProjects = [
  {
    id: 1,
    name: "leadMe",
    domain: "leadme.ttalkak.app",
    time: "4시간 전",
  },
  {
    id: 2,
    name: "ssapick",
    domain: "ssapick.ttalkak.app",
    time: "1일 전",
  },
  {
    id: 3,
    name: "storyboard",
    domain: "storyboard.ttalkak.app",
    time: "3일 전",
  },
  {
    id: 4,
    name: "eclipse",
    domain: "eclipse.ttalkak.app",
    time: "2주 전",
  },
  {
    id: 5,
    name: "eclipse",
    domain: "eclipse.ttalkak.app",
    time: "2주 전",
  },
  {
    id: 6,
    name: "eclipse",
    domain: "eclipse.ttalkak.app",
    time: "2주 전",
  },
  {
    id: 7,
    name: "eclipse",
    domain: "eclipse.ttalkak.app",
    time: "2주 전",
  },
];

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreateProject = (projectName: string, domainName: string) => {
    // 여기에 프로젝트 생성 api요청
    console.log("프로젝트명", projectName);
    console.log("도메인명", domainName);
    setIsModalOpen(false);
  };

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
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border rounded-lg px-4 py-2"
        >
          생성
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Link
            href={`/projects/${project.id}`}
            key={project.id}
            className="border rounded-lg p-6"
          >
            <div className="flex items-center mb-2 cursor-pointer">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <h2 className="font-semibold">{project.name}</h2>
                <p className="text-sm text-gray-500">{project.domain}</p>
              </div>
            </div>
            <div className="flex justify-end items-center mt-6">
              <span className="text-sm text-gray-500">{project.time}</span>
            </div>
          </Link>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
