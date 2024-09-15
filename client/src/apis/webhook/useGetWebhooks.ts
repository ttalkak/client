import webhookClient from "@/apis/core/webhookClient";
import { useQuery } from "@tanstack/react-query";

interface Webhook {
  id: number;
  config: {
    url: string;
  };
}

interface GetWebhooksParams {
  owner: string;
  repo: string;
}

const getWebhooks = async ({
  owner,
  repo,
}: GetWebhooksParams): Promise<Webhook[]> => {
  try {
    const response = await webhookClient.repos.listWebhooks({
      owner,
      repo,
    });
    return response.data as Webhook[];
  } catch (error) {
    throw new Error("웹훅 목록을 가져오는데 실패했습니다.");
  }
};

const useGetWebhooks = (owner: string, repo: string) => {
  return useQuery<Webhook[], Error>({
    queryKey: ["webhooks", owner, repo],
    queryFn: () => getWebhooks({ owner, repo }),
  });
};

export default useGetWebhooks;