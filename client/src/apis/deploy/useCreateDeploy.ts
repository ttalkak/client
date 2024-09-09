import client from "@/apis/core/client";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DeployData } from "@/types/deploy";

const createDeploy = async (data: DeployData): Promise<void> => {
  const response = await client.post({
    url: "deployment",
    data,
  });
  if (!response.success)
    throw new Error(response.message || "배포 생성에 실패했습니다.");
};

const useCreateDeploy = (): UseMutationResult<
  void,
  Error,
  DeployData,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDeploy,
    onSuccess: () => {
      toast.success("배포가 성공적으로 생성되었습니다.");
      // 프로젝트 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useCreateDeploy;
