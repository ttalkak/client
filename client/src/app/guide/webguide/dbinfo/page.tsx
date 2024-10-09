import React from "react";
import Link from "next/link";
import {
  FaDatabase,
  FaLock,
  FaCog,
  FaMoneyBillWave,
  FaQuestionCircle,
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
      id: "database-selection",
      icon: <FaDatabase size={24} />,
      title: "데이터베이스 선택",
      description:
        "Redis, MySQL, PostgreSQL, MongoDB, MariaDB 중 원하는 데이터베이스를 선택합니다.",
    },
    {
      id: "configuration",
      icon: <FaCog size={24} />,
      title: "설정 구성",
      description:
        "데이터베이스 이름, 필요한 리소스, 고급 설정 옵션을 구성합니다.",
    },
    {
      id: "deployment",
      icon: <FaDatabase size={24} />,
      title: "배포",
      description:
        "'배포' 버튼을 클릭하여 데이터베이스 생성을 시작합니다. 실시간으로 배포 과정을 확인할 수 있습니다.",
    },
    {
      id: "access-info",
      icon: <FaLock size={24} />,
      title: "접속 정보 확인",
      description:
        "배포가 완료되면 접속 URL, 포트, 사용자 이름, 비밀번호 등의 접속 정보를 안전하게 저장합니다.",
    },
  ];

  return (
    <div className="container px-8 min-h-screen max-h-screen">
      <div className="flex-grow px-4 sm:px-6 lg:px-8 pt-16 grid">
        <h1 className="text-4xl font-bold mb-4 text-center">
          데이터베이스 배포 가이드
        </h1>
      </div>
      <GuideSection title="배포 단계" icon={<FaDatabase size={24} />}>
        <div className="space-y-6">
          {steps.map((step) => (
            <StepItem key={step.id} {...step} />
          ))}
        </div>
      </GuideSection>
      <GuideSection title="데이터베이스 관리" icon={<FaCog size={24} />}>
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
      </GuideSection>
      <GuideSection title="보안 권장사항" icon={<FaLock size={24} />}>
        <List
          items={[
            "자동 생성된 비밀번호는 안전한 곳에 보관하세요.",
            "정기적으로 비밀번호를 변경하는 것이 좋습니다.",
            "필요한 IP에서만 접근 가능하도록 방화벽 설정을 조정하세요.",
          ]}
        />
      </GuideSection>
      <GuideSection title="요금 정책" icon={<FaMoneyBillWave size={24} />}>
        <List
          items={[
            "사용한 리소스와 시간에 따라 요금이 부과됩니다.",
            "대시보드에서 현재 사용량과 예상 요금을 확인할 수 있습니다.",
            "월별 청구서는 이메일로 발송됩니다.",
          ]}
        />
      </GuideSection>
      <GuideSection title="주의사항" icon={<FaQuestionCircle size={24} />}>
        <List
          items={[
            "데이터베이스 이름은 영문으로 설정해야 합니다.",
            "서비스는 단일 데이터베이스 인스턴스만 지원합니다.",
            "배포된 데이터베이스의 사용량에 따라 자동으로 요금이 청구됩니다.",
          ]}
        />
      </GuideSection>
    </div>
  );
};

export default DatabaseGuidePage;
