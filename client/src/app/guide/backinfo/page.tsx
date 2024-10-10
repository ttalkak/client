import React from "react";
import {
  FaReact,
  FaGithub,
  FaJava,
  FaDocker,
  FaGlobe,
  FaServer,
} from "react-icons/fa";
import GuideSection from "../components/GuideSection";
import BackendDeploymentGuide from "./components/BackendGuide";

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
      description:
        "기존 Dockerfile이 있다면 사용되며, 없을 경우 자동으로 생성됩니다. 부적합 시 에러가 표시됩니다.",
    },
    {
      id: "domain-port",
      icon: <FaGlobe size={24} />,
      title: "도메인 및 포트 매핑",
      description:
        "배포가 완료되면 '{프로젝트이름}.ttalkak.com' 형식의 도메인이 자동으로 생성되며, 포트 매핑이 수행됩니다.",
    },
  ];

  return (
    <div>
      <div className="w-full px-8 max-h-screen">
        <div className="flex-grow px-4 sm:px-6 lg:px-8 grid">
          <h1 className="text-4xl font-bold text-center mb-5 mt-10">
            백엔드 배포 가이드
          </h1>
        </div>
        <GuideSection title="시작하기 전에">
          <div className="space-y-6">
            <p>
              Ttalkak을 사용하여 백엔드 프로젝트를 배포하기 전에 다음 사항을
              확인하세요:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>GitHub 저장소에 프로젝트가 푸시되어 있어야 합니다.</li>
              <li>
                프로젝트 루트에 build.gradle 또는 pom.xml 파일이 있어야 합니다.
              </li>
              <li>Dockerfile이 없는 경우, Ttalkak이 자동으로 생성합니다.</li>
              <p className="text-red-500 font-bold">
                Database가 필요한 프로젝트의 경우 Database를 먼저 배포 후
                Backend를 배포해야 합니다.
              </p>
            </ul>
          </div>
        </GuideSection>
        <GuideSection title="배포하기">
          <BackendDeploymentGuide />
        </GuideSection>

        <GuideSection title="최적화 팁">
          <ul className="list-disc pl-6">
            <li>
              빌드 시간을 줄이기 위해 .dockerignore 파일을 사용하여 불필요한
              파일을 제외하세요.
            </li>
            <li>
              프로덕션 빌드 시 적절한 JVM 옵션을 설정하여 성능을 최적화하세요.
            </li>
            <li>환경별 설정을 위해 환경 변수를 적극 활용하세요.</li>
            <li>데이터베이스 연결 풀 및 캐싱 전략을 최적화하세요.</li>
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
              보안 관련 정보(API 키, 데이터베이스 비밀번호 등)는 환경 변수로
              관리하고, 코드에 직접 포함시키지 마세요.
            </li>
          </ul>
        </GuideSection>
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default BackendGuidePage;
