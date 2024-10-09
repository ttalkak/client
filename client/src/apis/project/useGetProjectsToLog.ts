import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetProjectsParams, GetProjectsResponse } from "@/types/project";
import client from "@/apis/core/client";

const getProjects = async (
  params: GetProjectsParams
): Promise<GetProjectsResponse> => {
  const response = await client.get<GetProjectsResponse>({
    url: "/project/search",
    params,
  });

  return response.data;
};

const useGetProjectsToLog = (
  params: GetProjectsParams
): UseQueryResult<GetProjectsResponse, Error> => {
  return useQuery({
    queryKey: ["projects", params] as const,
    queryFn: () => getProjects(params),
  });
};

export default useGetProjectsToLog;