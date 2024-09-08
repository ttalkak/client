import client from "@/apis/core/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProjectParams } from "@/types/project";

const createProject = async (params: CreateProjectParams): Promise<void> => {
  await client.post({
    url: "/project",
    data: params,
  });
};

const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      // 프로젝트 생성 성공 시 projects 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useCreateProject;
