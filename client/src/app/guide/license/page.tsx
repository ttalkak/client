"use client";
import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { TtalkakPolicyContent } from "./components/TtalkakPolicyContent";

interface TermsSectionProps {
  title: string;
  content: string[];
}

interface GuideSectionProps {
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
}

const GuideSection: React.FC<GuideSectionProps> = ({
  title,
  icon,
  children,
}) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 flex items-center">{title}</h2>
    {children}
  </section>
);

const TermsSection: React.FC<TermsSectionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mb-6 min-w-full">
      <button
        className="flex items-center mb-2 w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {isOpen ? (
          <RiArrowDropUpLine size={20} className="ml-auto" />
        ) : (
          <RiArrowDropDownLine size={20} className="ml-auto" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 ml-9">
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
    <div className="container px-8 min-h-screen max-h-screen">
      <div className="flex-grow px-4 sm:px-6 lg:px-8 pt-16 grid">
        <h1 className="text-4xl font-bold mb-4 text-center">
          TTALKAK 서비스 이용약관 및 라이선스
        </h1>
      </div>
      <GuideSection title="이용약관" icon={<RiArrowDropDownLine size={24} />}>
        <div className="space-y-6">
          {TtalkakPolicyContent.map(
            (section: TermsSectionProps, index: number) => (
              <TermsSection
                key={index}
                title={section.title}
                content={section.content}
              />
            )
          )}
        </div>
      </GuideSection>
    </div>
  );
};

export default TTALKAKTermsOfServiceAgreement;
