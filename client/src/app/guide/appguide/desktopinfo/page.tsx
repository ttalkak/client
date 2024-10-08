import React from "react";
import {
  FaDownload,
  FaWallet,
  FaServer,
  FaCoins,
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

export default function DesktopAppGuide() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Ttalkak 데스크톱 앱 설치 가이드
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">
          Ttalkak 데스크톱 앱을 통해 쉽고 빠르게 서비스를 배포하고 관리할 수
          있습니다. MetaMask 지갑과 연동하여 실시간으로 서비스를 할당받고,
          사용량에 따른 요금을 투명하게 정산받을 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FeatureCard
          title="설치 과정"
          icon={<FaDownload size={24} />}
          items={[
            "Win64 버전의 ttalkak.exe 파일을 다운로드합니다.",
            "다운로드한 파일을 실행하여 설치를 진행합니다.",
            "MetaMask 지갑을 연동합니다.",
            "앱을 실행하여 서비스를 시작합니다.",
          ]}
        />
        <FeatureCard
          title="주요 기능"
          icon={<FaServer size={24} />}
          items={[
            "실시간 서비스 할당",
            "사용량 기반 요금 계산",
            "MetaMask를 통한 코인 정산",
            "서비스 모니터링 및 관리",
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaWallet className="text-blue-500 mr-3" size={24} />
          MetaMask 연동
        </h2>
        <p className="text-gray-700">
          Ttalkak 앱을 실행한 후, MetaMask 지갑을 연동해야 합니다. 이를 통해
          서비스 이용 요금을 투명하게 정산받을 수 있습니다. MetaMask가 설치되어
          있지 않다면, 먼저 MetaMask를 설치하고 계정을 생성해주세요.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaCoins className="text-blue-500 mr-3" size={24} />
          요금 정책
        </h2>
        <List
          items={[
            "서비스 사용량에 따라 실시간으로 요금이 계산됩니다.",
            "계산된 요금은 코인으로 환산되어 MetaMask 지갑으로 정산됩니다.",
            "정산 주기 및 최소 정산 금액은 설정에서 조정할 수 있습니다.",
          ]}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaQuestionCircle className="mr-2 text-blue-500" />
          지원 및 문의
        </h2>
        <List
          items={[
            "설치 또는 사용 중 문제가 발생하면 support@ttalkak.com으로 문의해주세요.",
            "자주 묻는 질문은 FAQ 페이지에서 확인할 수 있습니다.",
            "최신 업데이트 및 공지사항은 공식 웹사이트에서 확인하세요.",
          ]}
        />
      </div>

      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">주의사항</h3>
        <List
          items={[
            "개인 MetaMask 키는 절대로 공유하지 마세요.",
            "안전한 네트워크 환경에서 앱을 사용해주세요.",
            "정기적으로 앱과 MetaMask를 최신 버전으로 업데이트하세요.",
          ]}
        />
      </div>
    </div>
  );
}
