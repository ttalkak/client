"use client";

import Image from "next/image";
import React, { useState } from "react";
import PaymentModal from "@/components/PaymentModal";
import EmailRegistrationModal from "@/components/EmailRegistrationModal";
import useAuthStore from "@/store/useAuthStore";
import useGetPayment from "@/apis/payment/useGetPayment";

export default function MyPage() {
  const { userInfo } = useAuthStore();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: paymentData } = useGetPayment();

  const openEmailModal = () => {
    setIsEmailModalOpen(true);
  };

  const closeEmailModal = () => {
    setIsEmailModalOpen(false);
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const profile = "rounded-full w-16 h-16 mr-12 bg-gray-200";
  const thStyle = "font-normal w-20 text-left text-gray-400";

  return (
    <>
      <div className="w-full border rounded p-6">
        <h2 className="font-semibold text-lg mb-3.5">내 정보</h2>
        <div className="flex">
          {userInfo ? (
            <Image
              src={userInfo.profileImage}
              width={64}
              height={64}
              alt="profile_img"
              className={profile}
            />
          ) : (
            <div className={profile}></div>
          )}
          <div className="flex flex-col justify-around">
            <div className="flex items-center">
              <div className={thStyle}>지갑 주소</div>
              {paymentData?.hasKey ? (
                <div>{paymentData.address}</div>
              ) : (
                <div className="flex items-center">
                  <div className="text-gray-700 text-sm">
                    등록된 지갑이 없습니다.
                  </div>
                  <button
                    className="bg-black text-white rounded px-3.5 py-0.5 text-sm ml-6"
                    onClick={openPaymentModal}
                  >
                    등록하기
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <div className={thStyle}>이메일</div>
              {userInfo && userInfo.emailVerified ? (
                <div>{userInfo.email}</div>
              ) : (
                <div className="flex items-center">
                  <div className="text-gray-700 text-sm">
                    등록된 이메일이 없습니다.
                  </div>
                  <button
                    className="bg-black text-white rounded px-3.5 py-0.5 text-sm ml-6"
                    onClick={openEmailModal}
                  >
                    등록하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border rounded p-6 mt-8">
        <h2 className="font-semibold text-lg mb-3.5">청구 금액</h2>
      </div>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
      <EmailRegistrationModal
        isOpen={isEmailModalOpen}
        onClose={closeEmailModal}
      />
    </>
  );
}
