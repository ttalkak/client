import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { GetProjectsRequest, GetProjectsResponse } from "@/types/project";
import client from "@/apis/core/client";

const getProjects = async (
  params: GetProjectsRequest
): Promise<GetProjectsResponse> => {
  const response = await client.get<GetProjectsResponse>({
    url: "/project/search",
    params,
  });

  return response.data;
};

const useGetProjects = (
  params: GetProjectsRequest
): UseSuspenseQueryResult<GetProjectsResponse, Error> => {
  return useSuspenseQuery({
    queryKey: ["projects", params] as const,
    queryFn: () => getProjects(params),
  });
};

export default useGetProjects;
