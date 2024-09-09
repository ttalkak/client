import client from "@/apis/core/client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  DeployType,
  DatabaseType,
  Framework,
  GithubRepositoryRequest,
  DatabaseCreateRequest,
  HostingCreateRequest,
  DeployData,
} from "@/types/deploy";

type CreateDeploymentParams = Omit<DeployData, "serviceType" | "framework"> & {
  serviceType: Exclude<DeployType, null>;
  framework: Exclude<Framework, null>;
};

const createDeploy = async (params: CreateDeploymentParams): Promise<void> => {
  const response = await client.post({
    url: "deployment",
    data: params,
  });
  if (!response.success)
    throw Error(response.message || "배포 생성에 실패했습니다.");
};

const useCreateDeploy = (): UseMutationResult<
  void,
  Error,
  CreateDeploymentParams,
  unknown
> => {
  return useMutation({
    mutationFn: createDeploy,
    onSuccess: () => {
      toast.success("배포가 성공적으로 생성되었습니다.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useCreateDeploy;
