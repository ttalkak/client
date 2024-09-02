"use client";

import { useState, useEffect } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";

// GitHub 레포지토리 정보를 위한 인터페이스
interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  updated_at: string;
}

// 파일 또는 디렉토리 정보를 위한 인터페이스
interface FileContent {
  name: string;
  path: string;
  type: string;
  content?: string;
  download_url?: string;
  sha: string;
}

export default function GitHubRepositories() {
  const [repos, setRepos] = useState<Repository[]>([]); // 모든 레포지토리 목록
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]); // 검색 필터링된 레포지토리 목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null); // 선택된 레포지토리
  const [currentPath, setCurrentPath] = useState<string>(""); // 현재 탐색 중인 경로
  const [repoContents, setRepoContents] = useState<FileContent[]>([]); // 현재 경로의 파일/폴더 목록
  const [fileContent, setFileContent] = useState<string | null>(null); // 선택된 파일의 내용

  // 컴포넌트 마운트시 전체 레포지토리 조회
  useEffect(() => {
    fetchAllRepos();
  }, []);

  // 검색어 변경시 레포지토리 필터링
  useEffect(() => {
    setFilteredRepos(
      repos.filter((repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, repos]);

  // 전체 레포지토리 조회 함수
  const fetchAllRepos = async () => {
    setIsLoading(true);
    setError(null);
    let page = 1;
    let allRepos: Repository[] = [];

    // 페이지네이션을 통해 모든 레포지토리 가져오기
    while (true) {
      try {
        const response = await fetch(
          `https://api.github.com/user/repos?type=public&page=${page}&per_page=100`,
          {
            headers: {
              Authorization: `Bearer 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`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data: Repository[] = await response.json();
        allRepos = [...allRepos, ...data];

        // 100개 미만의 레포지토리를 받으면 모든 레포지토리를 가져온 것으로 간주
        if (data.length < 100) break;
        page++;
      } catch (error) {
        setError("전체 repo 조회 에러");
        console.error("전체 repo 조회 에러", error);
        break;
      }
    }
    setRepos(allRepos);
    setFilteredRepos(allRepos);
    setIsLoading(false);
  };

  // 레포지토리 내용 조회 함수
  const fetchRepoContents = async (repo: Repository, path: string = "") => {
    setIsLoading(true);
    setError(null);
    setFileContent(null);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo.full_name}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch repository contents");
      }

      const data: FileContent | FileContent[] = await response.json();

      if (Array.isArray(data)) {
        // 폴더를 먼저, 그 다음 파일 알파벳 순 정렬
        const sortedData = data.sort((a, b) => {
          if (a.type === b.type) {
            return a.name.localeCompare(b.name);
          }
          return a.type === "dir" ? -1 : 1;
        });

        // 디렉토리 내용 설정
        setRepoContents(sortedData);
        setSelectedRepo(repo);
        setCurrentPath(path);
      } else {
        // 단일 파일인 경우 파일 내용 가져오기
        await fetchFileContent(data);
      }
    } catch (error) {
      setError("Error fetching repository contents. Please try again later.");
      console.error("Error fetching repository contents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 파일 내용 가져오기 함수
  const fetchFileContent = async (file: FileContent) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${selectedRepo!.full_name}/contents/${file.path}`,
        {
          headers: {
            Authorization: `Bearer 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`,
            Accept: "application/vnd.github.v3.raw",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch file content");
      }

      const content = await response.text();
      setFileContent(content);
    } catch (error) {
      setError("Error fetching file content. Please try again later.");
      console.error("Error fetching file content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 파일 또는 폴더 클릭 핸들러
  const handleItemClick = (item: FileContent) => {
    if (item.type === "dir") {
      fetchRepoContents(selectedRepo!, item.path);
    } else {
      fetchFileContent(item);
    }
  };

  // 뒤로 가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    if (currentPath === "") {
      // 루트 디렉토리에서는 레포지토리 선택 해제
      setSelectedRepo(null);
      setRepoContents([]);
      setFileContent(null);
    } else {
      // 상위 디렉토리로 이동
      const newPath = currentPath.split("/").slice(0, -1).join("/");
      fetchRepoContents(selectedRepo!, newPath);
    }
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // UI 렌더링
  return (
    <div className="container mx-auto p-4 font-sans">
      <h2 className="text-2xl font-bold mb-4">
        프론트엔드 코드가 포함된 저장소를 선택해주세요
      </h2>
      {/* 레포지토리 검색 입력 필드 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Find a repository..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="flex bg-white rounded-lg shadow">
        {/* 레포지토리 목록 */}
        <div className="w-1/3 border-r">
          <ul className="divide-y">
            {filteredRepos.map((repo) => (
              <li
                key={repo.id}
                className={`cursor-pointer hover:bg-gray-100 p-3 ${
                  selectedRepo?.id === repo.id ? "bg-blue-100" : ""
                }`}
                onClick={() => fetchRepoContents(repo)}
              >
                <div className="font-semibold">{repo.name}</div>
                <div className="text-sm text-gray-500">{repo.description}</div>
              </li>
            ))}
          </ul>
        </div>
        {/* 선택된 레포지토리 내용 표시 */}
        <div className="w-2/3 p-4">
          {selectedRepo && (
            <div>
              <div className="flex items-center mb-4">
                <button
                  onClick={handleBackClick}
                  className="mr-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Back
                </button>
                <h3 className="text-xl font-semibold">
                  {selectedRepo.name}
                  {currentPath && (
                    <span className="text-gray-500 ml-2">/ {currentPath}</span>
                  )}
                </h3>
              </div>
              {isLoading ? (
                // 로딩 스피너
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : fileContent ? (
                // 파일 내용 표시
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                  <code>{fileContent}</code>
                </pre>
              ) : (
                // 디렉토리 내용 표시
                <table className="w-full">
                  <thead className="border border-gray bg-gray-100">
                    <tr>
                      <th className="text-left px-3 py-3">파일/폴더명</th>
                      <th className="text-left py-2">최근 커밋 메시지</th>
                      <th className="text-left py-2">최근 커밋 날짜</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repoContents.map((item) => (
                      <tr
                        key={item.path}
                        className="cursor-pointer hover:bg-gray-100 border border-gray"
                        onClick={() => handleItemClick(item)}
                      >
                        <td className="py-2 px-3 flex items-center gap-2">
                          {item.type === "file" ? (
                            <AiOutlineFile className="text-gray-500 w-5 h-5" />
                          ) : (
                            <FaFolder className="text-blue-400 w-5 h-5" />
                          )}

                          {item.name}
                        </td>
                        <td className="py-2 text-gray-600">
                          Update {item.name}
                        </td>
                        <td className="py-2 text-gray-600">
                          {formatDate(selectedRepo.updated_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
