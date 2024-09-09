import client from "@/apis/core/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Project } from "@/types/project";

const getProject = async (projectId: number): Promise<Project> => {
  const response = await client.get<Project>({
    url: `/project/${projectId}`,
  });
  return response.data;
};

const useGetProject = (projectId: number): UseQueryResult<Project, Error> => {
  return useQuery({
    queryKey: ["project", projectId] as const,
    queryFn: () => getProject(projectId),
  });
};

export default useGetProject;
