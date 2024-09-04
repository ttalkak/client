"use client";

type DeployType = "frontend" | "backend" | null;

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Repository, FileContent } from "../types";
import { SearchBar } from "./SearchBar";
import { RepoList } from "./RepoList";
import { DirectoryNavigator } from "./DirectoryNavigator";
import { FileList } from "./FileList";
import { LiaGithubAlt } from "react-icons/lia";
import Button from "@/components/Button";
import useDeployStore from "@/store/useDeployStore";

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repository[]>([]); // 모든 레포지토리 목록
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]); // 검색 필터링된 레포지토리 목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null); // 선택된 레포지토리
  const [currentPath, setCurrentPath] = useState<string>(""); // 현재 탐색 중인 경로
  const [repoContents, setRepoContents] = useState<FileContent[]>([]); // 현재 경로의 파일/폴더 목록
  const [fileContent, setFileContent] = useState<string | null>(null); // 선택된 파일의 내용
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const projectId = searchParams.get("projectId"); // 프로젝트 ID
  const deployTypeMatch = pathname.match(
    /\/deploy\/create\/(frontend|backend)/
  );
  const deployType: DeployType = deployTypeMatch
    ? (deployTypeMatch[1] as DeployType)
    : null;
  const setSelectedRepository = useDeployStore(
    (state) => state.setSelectedRepository
  );

  // 컴포넌트 마운트시 전체 레포지토리 조회
  useEffect(() => {
    fetchAllRepos();
  }, []);

  // 검색어 변경시 레포지토리 필터링
  useEffect(() => {
    // setSelectedRepo(null);
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

    try {
      const response = await fetch(
        `https://api.github.com/user/repos?type=public&per_page=100`,
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("전체 레포지토리 조회 실패");
      }

      const data: Repository[] = await response.json();
      setRepos(data);
      setFilteredRepos(data);

      // 초기에 맨 위의 저장소 선택
      if (data.length > 0) {
        setSelectedRepo(data[0]);
        fetchRepoContents(data[0]);
      }
    } catch (error) {
      setError("전체 repo 조회 에러");
      console.error("전체 repo 조회 에러", error);
    } finally {
      setIsLoading(false);
    }
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
        throw new Error("파일 내용 가져오기 실패");
      }

      const content = await response.text();
      setFileContent(content);
      setCurrentPath(file.path);
    } catch (error) {
      setError("파일 내용 가져오기 실패");
      console.error("파일 내용 가져오기 실패:", error);
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

  // 경로 클릭 핸들러
  const handlePathClick = (pathPart: string) => {
    if (selectedRepo) {
      const newPath = currentPath
        .split("/")
        .slice(0, currentPath.split("/").indexOf(pathPart) + 1)
        .join("/");
      fetchRepoContents(selectedRepo, newPath);
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

  // 선택완료 버튼 클릭 핸들러
  const handleSelectComplete = () => {
    if (selectedRepo) {
      // 여기서 url보고 필요한거 넘기면 될듯
      console.log(selectedRepo);
      console.log(projectId);
      console.log(deployType);
      // zustand에 저장하고 라우터 이동시키는데, 뭘 보낼지 잘 생각해보고 보내셈, zustand persist설정도 하기
      // setSelectedRepository(selectedRepo);
      router.push(`/deploy/form?projectId=${projectId}&type=${deployType}`);
    }
  };

  if (error) {
    return <div>에러...</div>;
  }

  return (
    <div className="container mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-4">
        {deployType === "frontend" ? "프론트엔드" : "백엔드"} 코드가 포함된
        저장소를 선택해주세요
      </h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex bg-white rounded-lg border">
        <div
          className={`w-1/3 border-r overflow-y-auto ${
            !isLoading && filteredRepos.length === 0
              ? "flex items-center justify-center"
              : ""
          }`}
          style={{
            maxHeight: "calc(100vh - 400px)",
            minHeight: "calc(100vh - 400px)",
          }}
        >
          {!isLoading && filteredRepos.length === 0 ? (
            <div className="text-center p-4 flex flex-col items-center">
              <LiaGithubAlt className="w-20 h-20" />
              <p className="text-lg mb-2">검색한 저장소를 찾을 수가 없어요.</p>
              <p className="text-gray-600">
                다른 검색어로 검색을 해보시겠어요?
              </p>
            </div>
          ) : (
            <RepoList
              repos={filteredRepos}
              selectedRepo={selectedRepo}
              onRepoSelect={fetchRepoContents}
            />
          )}
        </div>
        <div
          className="w-2/3 p-4 overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 400px)",
            minHeight: "calc(100vh - 400px)",
          }}
        >
          {selectedRepo && (
            <div>
              <DirectoryNavigator
                repoName={selectedRepo.name}
                currentPath={currentPath}
                onPathClick={handlePathClick}
                onRepoClick={() => fetchRepoContents(selectedRepo)}
              />
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : fileContent ? (
                <pre
                  data-cy="file-content"
                  className="bg-gray-100 p-4 rounded-lg overflow-x-auto"
                >
                  <code>{fileContent}</code>
                </pre>
              ) : (
                <FileList
                  repoContents={repoContents}
                  selectedRepo={selectedRepo}
                  onItemClick={handleItemClick}
                  formatDate={formatDate}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="text-right mt-6">
        <Button
          label={"선택완료"}
          size="medium"
          primary
          onClick={handleSelectComplete}
        />
      </div>
    </div>
  );
}
