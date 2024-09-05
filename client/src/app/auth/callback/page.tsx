"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { getUserInfo } from "@/apis/user/useGetUserInfo";

export default function CallbackPage() {
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUserInfo, setIsLogin } =
    useAuthStore();

  const fetchUserInfoAndSetState = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      try {
        const response = await getUserInfo();
        const userInfo = response.data;
        setUserInfo(userInfo);
        console.log(response);
        setIsLogin(true);
        router.push("/");
      } catch (error) {
        console.error("유저 정보 요청 실패:", error);
        useAuthStore.getState().logout();
        router.push("/login");
      }
    } else {
      console.error("url에서 accessToken 찾을 수 없음");
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUserInfoAndSetState();
  }, []);

  return <div>로그인중</div>;
}
