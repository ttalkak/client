import { useMutation, useQueryClient } from "@tanstack/react-query";
import webhookClient from "@/apis/core/webhookClient";
import { toast } from "react-toastify";

interface DeleteWebhookParams {
  owner: string;
  repo: string;
  hook_id: number;
}

const deleteWebhook = async ({ owner, repo, hook_id }: DeleteWebhookParams) => {
  try {
    await webhookClient.repos.deleteWebhook({ owner, repo, hook_id });
  } catch (error) {
    throw new Error("웹훅 삭제에 실패했습니다.");
  }
};

const useDeleteWebhook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWebhook,
    onSuccess: () => {
      toast.success("웹훅이 성공적으로 삭제되었습니다.");
      // 쿼리 무효화 해야됨. 프로젝트 상세 쿼리무효화
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useDeleteWebhook;
