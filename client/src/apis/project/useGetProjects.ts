import client from "@/apis/core/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getProjectsParams, ProjectsResponse } from "@/types/project";

const getProjects = async (
  params: getProjectsParams
): Promise<ProjectsResponse> => {
  const response = await client.get<ProjectsResponse>({
    url: "/project/search",
    params,
  });
  // 필요한 데이터만 추출해서 반환
  const { content, totalPages, totalElements } = response.data;
  return { content, totalPages, totalElements };
};

const useGetProjects = (
  params: getProjectsParams
): UseQueryResult<ProjectsResponse, Error> => {
  return useQuery({
    queryKey: ["projects", params] as const,
    queryFn: () => getProjects(params),
  });
};

export default useGetProjects;
