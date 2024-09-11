import { useMutation } from "@tanstack/react-query";
import webhookClient from "@/apis/core/webhookClient";
import { toast } from "react-toastify";

interface CreateWebhookParams {
  owner: string;
  repo: string;
  webhookUrl: string;
}

const createWebhook = async ({
  owner,
  repo,
  webhookUrl,
}: CreateWebhookParams) => {
  try {
    const response = await webhookClient.repos.createWebhook({
      owner,
      repo,
      config: {
        url: webhookUrl,
        content_type: "json",
      },
      events: ["push"],
    });
    return response.data;
  } catch (error) {
    throw new Error("웹훅 생성에 실패했습니다.");
  }
};

const useCreateWebhook = () => {
  return useMutation({
    mutationFn: createWebhook,
    onSuccess: () => {
      toast.success("웹훅 생성에 성공했습니다.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useCreateWebhook;
