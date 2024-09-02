"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      console.log("이거보세요", urlParams);
      router.push("/");
    } else {
      console.error("url에서 accessToken 찾을 수 없음");
      router.push("/login");
    }
  });
  return <div>Processing login...</div>;
}
