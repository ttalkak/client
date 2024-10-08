"use client";
import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { ttalkakPolicyContent } from "./components/ttalkakPolicyContent";

interface TermsSectionProps {
  title: string;
  content: string[];
}

const TermsSection: React.FC<TermsSectionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? (
          <RiArrowDropUpLine size={20} />
        ) : (
          <RiArrowDropDownLine size={20} />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          {content.map((item, index) => (
            <p key={index} className="mb-2">
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const TTALKAKTermsOfServiceAgreement: React.FC = () => {
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const handleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        TTALKAK 서비스 이용약관 및 라이선스 동의
      </h1>
      {ttalkakPolicyContent.map((section: TermsSectionProps, index: number) => (
        <TermsSection
          key={index}
          title={section.title}
          content={section.content}
        />
      ))}
    </div>
  );
};

export default TTALKAKTermsOfServiceAgreement;
