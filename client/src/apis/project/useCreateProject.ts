import client from "@/apis/core/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProjectParams } from "@/types/project";
import { toast } from "react-toastify";

const createProject = async (params: CreateProjectParams): Promise<void> => {
  const response = await client.post({
    url: "/project",
    data: params,
  });

  if (!response.success) throw Error(response.message!!);
};

const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      // 프로젝트 생성 성공 시 projects 쿼리 무효화
      // React Query는 쿼리 키의 부분 일치를 지원함
      // projects로 시작하는 모든 쿼리가 무효화
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("프로젝트가 성공적으로 생성되었습니다.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export default useCreateProject;
