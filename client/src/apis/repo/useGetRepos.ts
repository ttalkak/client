import { useQuery } from "@tanstack/react-query";
import githubClient from "@/apis/core/githubClient";
import { Repository } from "@/types/repo";

// Promise<Repository[]>를 반환한다고 명시적으로 타입 지정
// Repository 객체의 배열을 포함하는 promise반환한다는 뜻
const getRepos = async (): Promise<Repository[]> => {
  //응답 데이터가 Repository 객체의 배열이라고 명시
  const response = await githubClient.get<Repository[]>("/user/repos", {
    params: { type: "public", per_page: 100 },
  });
  return response.data;
};

const useGetRepos = () => {
  return useQuery({
    queryKey: ["repos"] as const, // as const : 읽기 전용 튜플 타입
    queryFn: getRepos,
  });
};

export default useGetRepos;
