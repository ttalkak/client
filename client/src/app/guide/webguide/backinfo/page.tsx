import React from "react";
import { FaGithub, FaJava, FaDocker, FaGlobe, FaServer } from "react-icons/fa";

interface GuideStepProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const GuideStep: React.FC<GuideStepProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-start bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-2">
      <div className="text-blue-500 mr-3">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function BackendGuidePage() {
  const steps: GuideStepProps[] = [
    {
      icon: <FaGithub size={24} />,
      title: "1. GitHub 레포지토리 연동",
      description: "배포할 백엔드 프로젝트의 GitHub 레포지토리를 선택합니다.",
    },
    {
      icon: <FaServer size={24} />,
      title: "2. 루트 디렉토리 설정",
      description:
        "build.gradle 또는 pom.xml 파일이 있는 루트 디렉토리 경로를 설정합니다.",
    },
    {
      icon: <FaJava size={24} />,
      title: "3. Java 버전 설정",
      description: "프로젝트에 적합한 Java 버전을 입력합니다.",
    },
    {
      icon: <FaDocker size={24} />,
      title: "4. Dockerfile 확인",
      description: "기존 Dockerfile 사용 또는 자동 생성. 부적합 시 에러 표시.",
    },
    {
      icon: <FaGlobe size={24} />,
      title: "5. 도메인 및 포트 매핑",
      description: "자동 도메인 생성 및 포트 매핑 수행.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        백엔드 배포 가이드
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">
          Ttalkak으로 백엔드 애플리케이션을 쉽고 빠르게 배포하세요. GitHub
          연동으로 자동화된 배포 프로세스를 경험해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <GuideStep key={index} {...step} />
        ))}
      </div>

      <div className="mt-8 bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">주의사항</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>프로젝트 이름은 영문으로 설정해야 합니다.</li>
          <li>단일 컨테이너만 지원 (Docker Compose 미사용)</li>
          <li>사용량에 따라 MetaMask로 자동 요금 청구</li>
          <li>생성된 도메인으로 API 요청 가능</li>
        </ul>
      </div>
    </div>
  );
}
