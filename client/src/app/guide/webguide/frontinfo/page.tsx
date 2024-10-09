import React from "react";
import { FaReact, FaGithub, FaNodeJs, FaDocker, FaGlobe } from "react-icons/fa";
import GuideSection from "../../components/GuideSection";

interface GuideStepProps {
  id: string;
  icon: React.ReactElement;
  title: string;
  description: string;
}

const StepItem: React.FC<GuideStepProps> = ({ icon, title, description }) => (
  <div className="mb-6 min-w-full">
    <div className="flex items-center mb-2">
      <div className="text-blue-500 mr-3">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 ml-9">{description}</p>
  </div>
);

const FrontGuidePage: React.FC = () => {
  const steps: GuideStepProps[] = [
    {
      id: "github-repo",
      icon: <FaGithub size={24} />,
      title: "GitHub 레포지토리 연동",
      description:
        "배포하려는 프론트엔드 프로젝트의 GitHub 레포지토리를 선택합니다. package.json 파일이 루트 디렉토리에 있어야 합니다.",
    },
    {
      id: "node-version",
      icon: <FaNodeJs size={24} />,
      title: "Node.js 버전 설정",
      description:
        "프로젝트에 적합한 Node.js 버전을 선택합니다. Ttalkak은 Node.js 12.x부터 18.x까지 지원합니다.",
    },
    {
      id: "dockerfile",
      icon: <FaDocker size={24} />,
      title: "Dockerfile 확인",
      description:
        "기존 Dockerfile이 있다면 사용되며, 없을 경우 자동으로 생성됩니다. 정적 파일에 대해 chmod 755 권한을 명시해야 합니다.",
    },
    {
      id: "domain-creation",
      icon: <FaGlobe size={24} />,
      title: "도메인 생성",
      description:
        "배포가 완료되면 '{프로젝트이름}.ttalkak.com' 형식의 도메인이 자동으로 생성됩니다.",
    },
    {
      id: "dockerfile",
      icon: <FaDocker size={24} />,
      title: "Dockerfile 확인",
      description:
        "기존 Dockerfile이 있다면 사용되며, 없을 경우 자동으로 생성됩니다. 정적 파일에 대해 chmod 755 권한을 명시해야 합니다.",
    },
    {
      id: "domain-creation",
      icon: <FaGlobe size={24} />,
      title: "도메인 생성",
      description:
        "배포가 완료되면 '{프로젝트이름}.ttalkak.com' 형식의 도메인이 자동으로 생성됩니다.",
    },
  ];

  return (
    <div className="container w-full px-8 min-h-screen max-h-screen ">
      <div className="flex-grow px-4 sm:px-6 lg:px-8 py-16 grid">
        <h1 className="text-4xl font-bold text-center">
          프론트엔드 배포 가이드
        </h1>
      </div>
      <GuideSection title="시작하기">
        <div className="space-y-6">
          {steps.map((step) => (
            <StepItem key={step.id} {...step} />
          ))}
        </div>
      </GuideSection>
      <GuideSection title="배포하기">
        <div className="space-y-6">
          {steps.map((step) => (
            <StepItem key={step.id} {...step} />
          ))}
        </div>
      </GuideSection>
      <GuideSection title="결제하기">
        <div className="space-y-6">
          {steps.map((step) => (
            <StepItem key={step.id} {...step} />
          ))}
        </div>
      </GuideSection>
    </div>
  );
};

export default FrontGuidePage;
