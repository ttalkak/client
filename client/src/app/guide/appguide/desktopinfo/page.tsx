import React from "react";
import Link from "next/link";
import {
  FaDownload,
  FaWallet,
  FaServer,
  FaCoins,
  FaQuestionCircle,
} from "react-icons/fa";
import Button from "../../../../components/Button";

interface GuideStepProps {
  id: string;
  icon: React.ReactElement;
  title: string;
  description: string;
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
    <h2 className="text-2xl font-semibold mb-4 flex items-center">
      <span className="mr-2">{icon}</span>
      {title}
    </h2>
    {children}
  </section>
);

const StepItem: React.FC<GuideStepProps> = ({ icon, title, description }) => (
  <div className="mb-6 min-w-full">
    <div className="flex items-center mb-2">
      <div className="text-blue-500 mr-3">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 ml-9">{description}</p>
  </div>
);

const List: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc pl-5 space-y-2 text-gray-700">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const AppGuidePage: React.FC = () => {
  const steps: GuideStepProps[] = [
    {
      id: "download",
      icon: <FaDownload size={24} />,
      title: "Win64 버전 다운로드",
      description: "ttalkak.exe 파일을 공식 웹사이트에서 다운로드합니다.",
    },
    {
      id: "install",
      icon: <FaDownload size={24} />,
      title: "설치 진행",
      description: "다운로드한 파일을 실행하여 설치를 진행합니다.",
    },
    {
      id: "metamask",
      icon: <FaWallet size={24} />,
      title: "MetaMask 연동",
      description: "앱 실행 후 MetaMask 지갑을 연동합니다.",
    },
    {
      id: "start",
      icon: <FaServer size={24} />,
      title: "서비스 시작",
      description: "앱을 실행하여 서비스를 시작합니다.",
    },
  ];

  return (
    <div className="container px-8 min-h-screen max-h-screen">
      <div className="flex-grow px-4 sm:px-6 lg:px-8 pt-16 grid">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Ttalkak 데스크톱 앱 설치 가이드
        </h1>
      </div>
      <GuideSection title="설치 과정" icon={<FaDownload size={24} />}>
        <div className="space-y-6">
          {steps.map((step) => (
            <StepItem key={step.id} {...step} />
          ))}
        </div>
      </GuideSection>
      <GuideSection title="주요 기능" icon={<FaServer size={24} />}>
        <List
          items={[
            "실시간 서비스 할당",
            "사용량 기반 요금 계산",
            "MetaMask를 통한 코인 정산",
            "서비스 모니터링 및 관리",
          ]}
        />
      </GuideSection>
      <GuideSection title="MetaMask 연동" icon={<FaWallet size={24} />}>
        <p className="text-gray-700">
          Ttalkak 앱을 실행한 후, MetaMask 지갑을 연동해야 합니다. 이를 통해
          서비스 이용 요금을 투명하게 정산받을 수 있습니다. MetaMask가 설치되어
          있지 않다면, 먼저 MetaMask를 설치하고 계정을 생성해주세요.
        </p>
      </GuideSection>
      <GuideSection title="요금 정책" icon={<FaCoins size={24} />}>
        <List
          items={[
            "서비스 사용량에 따라 실시간으로 요금이 계산됩니다.",
            "계산된 요금은 코인으로 환산되어 MetaMask 지갑으로 정산됩니다.",
            "정산 주기 및 최소 정산 금액은 설정에서 조정할 수 있습니다.",
          ]}
        />
      </GuideSection>
      <GuideSection title="지원 및 문의" icon={<FaQuestionCircle size={24} />}>
        <List
          items={[
            "설치 또는 사용 중 문제가 발생하면 support@ttalkak.com으로 문의해주세요.",
            "자주 묻는 질문은 FAQ 페이지에서 확인할 수 있습니다.",
            "최신 업데이트 및 공지사항은 공식 웹사이트에서 확인하세요.",
          ]}
        />
      </GuideSection>
      <GuideSection title="주의사항" icon={<FaQuestionCircle size={24} />}>
        <List
          items={[
            "개인 MetaMask 키는 절대로 공유하지 마세요.",
            "안전한 네트워크 환경에서 앱을 사용해주세요.",
            "정기적으로 앱과 MetaMask를 최신 버전으로 업데이트하세요.",
          ]}
        />
      </GuideSection>
    </div>
  );
};

export default AppGuidePage;
