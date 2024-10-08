import React from "react";
import { IconType } from "react-icons";
import { FaGithub, FaNodeJs, FaDocker, FaGlobe } from "react-icons/fa";

interface GuideStepProps {
  icon: React.ReactElement<IconType>;
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

const FrontGuidePage: React.FC = () => {
  const steps: GuideStepProps[] = [
    {
      icon: <FaGithub size={24} />,
      title: "1. GitHub 레포지토리 연동",
      description:
        "배포하려는 프론트엔드 프로젝트의 GitHub 레포지토리를 선택합니다. package.json 파일이 루트 디렉토리에 있어야 합니다.",
    },
    {
      icon: <FaNodeJs size={24} />,
      title: "2. Node.js 버전 설정",
      description:
        "프로젝트에 적합한 Node.js 버전을 선택합니다. Ttalkak은 Node.js 12.x부터 18.x까지 지원합니다.",
    },
    {
      icon: <FaDocker size={24} />,
      title: "3. Dockerfile 확인",
      description:
        "기존 Dockerfile이 있다면 사용되며, 없을 경우 자동으로 생성됩니다. 정적 파일에 대해 chmod 755 권한을 명시해야 합니다.",
    },
    {
      icon: <FaGlobe size={24} />,
      title: "4. 도메인 생성",
      description:
        "배포가 완료되면 '{프로젝트이름}.ttalkak.com' 형식의 도메인이 자동으로 생성됩니다.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        프론트엔드 배포 가이드
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">
          Ttalkak을 사용하여 프론트엔드 애플리케이션을 쉽고 빠르게 배포할 수
          있습니다. GitHub 레포지토리와 연동하여 자동화된 배포 프로세스를
          경험해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <GuideStep key={index} {...step} />
        ))}
      </div>

      <div className="mt-8 bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">주의사항</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>프로젝트 이름은 영문으로 설정해야 합니다.</li>
          <li>
            Ttalkak은 단일 컨테이너만 지원하며, Docker Compose는 사용하지
            않습니다.
          </li>
          <li>
            배포된 애플리케이션의 사용량에 따라 MetaMask를 통해 자동으로 요금이
            청구됩니다.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FrontGuidePage;
