import client from "@/apis/core/client";
import { UserInfo } from "@/types/userInfo";

export const getUserInfo = () => {
  return client.get<UserInfo>({
    url: "/user/me",
  });
};
