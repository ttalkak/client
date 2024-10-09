import React from "react";
import Link from "next/link";
import {
  FaReact,
  FaGithub,
  FaJava,
  FaDocker,
  FaGlobe,
  FaServer,
} from "react-icons/fa";
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

const BackendGuidePage: React.FC = () => {
  const steps: GuideStepProps[] = [
    {
      id: "github-repo",
      icon: <FaGithub size={24} />,
      title: "GitHub 레포지토리 연동",
      description: "배포할 백엔드 프로젝트의 GitHub 레포지토리를 선택합니다.",
    },
    {
      id: "root-directory",
      icon: <FaServer size={24} />,
      title: "루트 디렉토리 설정",
      description:
        "build.gradle 또는 pom.xml 파일이 있는 루트 디렉토리 경로를 설정합니다.",
    },
    {
      id: "java-version",
      icon: <FaJava size={24} />,
      title: "Java 버전 설정",
      description: "프로젝트에 적합한 Java 버전을 입력합니다.",
    },
    {
      id: "dockerfile",
      icon: <FaDocker size={24} />,
      title: "Dockerfile 확인",
      description: "기존 Dockerfile 사용 또는 자동 생성. 부적합 시 에러 표시.",
    },
    {
      id: "domain-port",
      icon: <FaGlobe size={24} />,
      title: "도메인 및 포트 매핑",
      description: "자동 도메인 생성 및 포트 매핑 수행.",
    },
  ];

  return (
    <div className="container px-8 min-h-screen max-h-screen">
      <div className="flex-grow px-4 sm:px-6 lg:px-8 pt-16 grid">
        <h1 className="text-4xl font-bold mb-4 text-center">
          백엔드 배포 가이드
        </h1>
      </div>
      <GuideSection title="배포 단계" icon={<FaReact size={24} />}>
        <div className="space-y-6">
          {steps.map((step) => (
            <StepItem key={step.id} {...step} />
          ))}
        </div>
      </GuideSection>
      <GuideSection title="주의사항" icon={<FaServer size={24} />}>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>프로젝트 이름은 영문으로 설정해야 합니다.</li>
          <li>단일 컨테이너만 지원 (Docker Compose 미사용)</li>
          <li>사용량에 따라 MetaMask로 자동 요금 청구</li>
          <li>생성된 도메인으로 API 요청 가능</li>
        </ul>
      </GuideSection>
    </div>
  );
};

export default BackendGuidePage;
