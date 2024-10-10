import React from "react";
import { FaReact, FaGithub, FaNodeJs, FaDocker, FaGlobe } from "react-icons/fa";
import GuideSection from "../components/GuideSection";
import FrontendDeploymentGuide from "./components/FrontendGuide";

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
    <div>
      <div className="w-full px-8 max-h-screen">
        <div className="flex-grow px-4 sm:px-6 lg:px-8 grid">
          <h1 className="text-4xl font-bold text-center mb-5 mt-10">
            프론트엔드 배포 가이드
          </h1>
        </div>
        <GuideSection title="시작하기 전에">
          <div className="space-y-6">
            <p>
              Ttalkak을 사용하여 프론트엔드 프로젝트를 배포하기 전에 다음 사항을
              확인하세요:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>GitHub 저장소에 프로젝트가 푸시되어 있어야 합니다.</li>
              <li>프로젝트 루트에 package.json 파일이 있어야 합니다.</li>
              <li>Dockerfile이 없는 경우, Ttalkak이 자동으로 생성합니다.</li>
            </ul>
          </div>
        </GuideSection>
        <GuideSection title="배포하기">
          <FrontendDeploymentGuide />
        </GuideSection>
        <GuideSection title="최적화 팁">
          <ul className="list-disc pl-6">
            <li>
              빌드 시간을 줄이기 위해 .dockerignore 파일을 사용하여 불필요한
              파일을 제외하세요.
            </li>
            <li>프로덕션 빌드 시 코드 최소화 및 트리 쉐이킹을 활성화하세요.</li>
            <li>정적 에셋에 대해 CDN을 활용하여 로딩 속도를 개선하세요.</li>
            <li>환경별 설정을 위해 환경 변수를 적극 활용하세요.</li>
          </ul>
        </GuideSection>

        <GuideSection title="주의사항">
          <ul className="list-disc pl-6">
            <li>프로젝트 이름은 영문으로 설정해야 합니다.</li>
            <li>
              Ttalkak은 단일 컨테이너만 지원합니다 (Docker Compose 미지원).
            </li>
            <li>
              배포된 애플리케이션의 사용량에 따라 자동으로 요금이 청구됩니다.
            </li>
            <li>
              보안 관련 정보(API 키 등)는 환경 변수로 관리하고, 코드에 직접
              포함시키지 마세요.
            </li>
          </ul>
        </GuideSection>
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default FrontGuidePage;
