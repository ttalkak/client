"use client";

import { useState, useEffect, ChangeEvent } from "react";

export default function CallbackPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  // 인증 유효 시간
  useEffect(() => {
    if (isSent && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isSent, timeLeft]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const sendVerificationEmail = async () => {
    if (!email) {
      return;
    }

    try {
      const response = await fetch("/api/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("인증 메일 전송");
        setIsSent(true);
        setTimeLeft(300);
      } else {
        alert("메일 전송 실패");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const verifyCode = async () => {
    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      if (response.ok) {
        alert("이메일 인증에 성공했습니다.");
        setIsVerified(true);
      } else {
        alert("인증에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <h1>마이페이지</h1>
      
      <div>
        <label>이메일 주소:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력하세요"
          disabled={isSent}
        />
      </div>

      <button onClick={sendVerificationEmail} disabled={isSent}>
        인증 메일 발송
      </button>

      {isSent && (
        <>
          <div>
            <label>인증 코드:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={handleCodeChange}
              placeholder="인증 코드를 입력하세요"
            />
          </div>
          <div>남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초</div>
          <button onClick={verifyCode}>인증</button>
          {isVerified && <div>인증이 완료되었습니다!</div>}
        </>
      )}
    </div>
  );
}
