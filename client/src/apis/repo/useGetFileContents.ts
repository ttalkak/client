import { useQuery } from "@tanstack/react-query";
import githubClient from "../core/githubClient";

const getFileContent = async (
  fullName: string,
  filePath: string
): Promise<string> => {
  const response = await githubClient.get<string>(
    `/repos/${fullName}/contents/${filePath}`,
    {
      headers: { Accept: "application/vnd.github.v3.raw" },
    }
  );
  return response.data;
};

const useGetFileContent = (
  fullName: string,
  filePath: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["fileContent", fullName, filePath] as const,
    queryFn: () => getFileContent(fullName, filePath),
    enabled: enabled,
  });
};

export default useGetFileContent;
