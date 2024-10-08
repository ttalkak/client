import React from "react";
import { IconType } from "react-icons";
import {
  FaDatabase,
  FaLock,
  FaCog,
  FaMoneyBillWave,
  FaQuestionCircle,
} from "react-icons/fa";

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

const List: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc pl-5 space-y-2 text-gray-700">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const DatabaseGuidePage: React.FC = () => {
  const steps: GuideStepProps[] = [
    {
      icon: <FaDatabase size={24} />,
      title: "1. 데이터베이스 선택",
      description:
        "Redis, MySQL, PostgreSQL, MongoDB, MariaDB 중 원하는 데이터베이스를 선택합니다.",
    },
    {
      icon: <FaCog size={24} />,
      title: "2. 설정 구성",
      description:
        "데이터베이스 이름, 필요한 리소스, 고급 설정 옵션을 구성합니다.",
    },
    {
      icon: <FaDatabase size={24} />,
      title: "3. 배포",
      description:
        "'배포' 버튼을 클릭하여 데이터베이스 생성을 시작합니다. 실시간으로 배포 과정을 확인할 수 있습니다.",
    },
    {
      icon: <FaLock size={24} />,
      title: "4. 접속 정보 확인",
      description:
        "배포가 완료되면 접속 URL, 포트, 사용자 이름, 비밀번호 등의 접속 정보를 안전하게 저장합니다.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        데이터베이스 배포 가이드
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">
          우리의 데이터베이스 배포 서비스를 사용하면 몇 번의 클릭만으로 안전하고
          효율적으로 다양한 데이터베이스를 배포할 수 있습니다. Redis, MySQL,
          PostgreSQL, MongoDB, MariaDB를 지원합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {steps.map((step, index) => (
          <GuideStep key={index} {...step} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaCog className="mr-2 text-blue-500" />
          데이터베이스 관리
        </h2>
        <p className="mb-4">
          대시보드에서 배포된 모든 데이터베이스를 확인하고 관리할 수 있습니다:
        </p>
        <List
          items={[
            "시작/중지/재시작",
            "구성 변경 (리소스 조정, 버전 업그레이드 등)",
            "백업 및 복원",
            "모니터링 및 로그 확인",
            "삭제",
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaLock className="mr-2 text-blue-500" />
          보안 권장사항
        </h2>
        <List
          items={[
            "자동 생성된 비밀번호는 안전한 곳에 보관하세요.",
            "정기적으로 비밀번호를 변경하는 것이 좋습니다.",
            "필요한 IP에서만 접근 가능하도록 방화벽 설정을 조정하세요.",
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaMoneyBillWave className="mr-2 text-blue-500" />
          요금 정책
        </h2>
        <List
          items={[
            "사용한 리소스와 시간에 따라 요금이 부과됩니다.",
            "대시보드에서 현재 사용량과 예상 요금을 확인할 수 있습니다.",
            "월별 청구서는 이메일로 발송됩니다.",
          ]}
        />
      </div>

      <div className="mt-8 bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">주의사항</h3>
        <List
          items={[
            "데이터베이스 이름은 영문으로 설정해야 합니다.",
            "서비스는 단일 데이터베이스 인스턴스만 지원합니다.",
            "배포된 데이터베이스의 사용량에 따라 자동으로 요금이 청구됩니다.",
          ]}
        />
      </div>
    </div>
  );
};

export default DatabaseGuidePage;
