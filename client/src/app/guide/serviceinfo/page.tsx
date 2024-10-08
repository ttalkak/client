import React from "react";
import {
  FaReact,
  FaJava,
  FaDatabase,
  FaGithub,
  FaBitcoin,
  FaGlobe,
  FaQuestionCircle,
} from "react-icons/fa";

const FeatureCard: React.FC<{
  title: string;
  items: string[];
  icon: React.ReactNode;
}> = ({ title, items, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <div className="text-blue-500 mr-3">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <ul className="list-disc pl-5 space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const List: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc pl-5 space-y-2">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

export default function ServiceInfoPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Ttalkak
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">
          Ttalkak은 주니어 개발자들을 위한 간편 배포 서비스입니다. Docker
          컨테이너 기반으로 프론트엔드, 백엔드, 데이터베이스를 쉽고 빠르게
          배포할 수 있습니다. GitHub 연동을 통해 자동으로 Dockerfile을 생성하고,
          블록체인 기반 결제를 통해 실제 사용량에 따른 요금이 청구됩니다. 도메인
          자동 생성 기능도 제공되어 배포 과정이 더욱 간편해집니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FeatureCard
          title="주요 기능"
          icon={<FaReact size={24} />}
          items={[
            "프론트엔드 배포 (React.js, Next.js)",
            "백엔드 배포 (Java Spring)",
            "데이터베이스 배포 (MySQL, PostgreSQL, Redis 등)",
          ]}
        />
        <FeatureCard
          title="특징"
          icon={<FaGithub size={24} />}
          items={[
            "GitHub 소스코드 기반 자동 Dockerfile 생성",
            "블록체인 결제 시스템",
            "도메인 자동 생성 및 관리",
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaGlobe className="text-blue-500 mr-3" size={24} />
          라이센스 및 저작권
        </h2>
        <p className="text-gray-700">
          소스코드 제공 및 사용 규정에 따라 상업적 용도로 사용 시 제한이
          있습니다.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaQuestionCircle className="mr-2 text-blue-500" />
          지원 및 문의
        </h2>
        <List
          items={[
            "기술 지원이 필요한 경우 support@ourservice.com으로 이메일을 보내주세요.",
            "자주 묻는 질문들은 FAQ 페이지에서 확인할 수 있습니다.",
            "업데이트 및 유지보수 일정은 서비스 상태 페이지에서 확인할 수 있습니다.",
          ]}
        />
      </div>

      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">주의사항</h3>
        <List
          items={[
            "프로젝트 이름은 영문으로 설정해야 합니다.",
            "Ttalkak은 단일 컨테이너만 지원하며, Docker Compose는 사용하지 않습니다.",
            "배포된 애플리케이션의 사용량에 따라 MetaMask를 통해 자동으로 요금이 청구됩니다.",
          ]}
        />
      </div>
    </div>
  );
}
