import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import githubClient from "../core/githubClient";
import { FileContent } from "./type";

const getRepoContents = async (
  fullName: string,
  path: string = ""
): Promise<FileContent[]> => {
  const response = await githubClient.get<FileContent[]>(
    `/repos/${fullName}/contents/${path}`
  );
  return response.data;
};

const useGetRepoContents = (
  fullName: string,
  path: string = "",
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["repoContents", fullName, path] as const,
    queryFn: () => getRepoContents(fullName, path),
    enabled: enabled,
  });
};

export default useGetRepoContents;
