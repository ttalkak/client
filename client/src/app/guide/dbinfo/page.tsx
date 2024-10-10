import React from "react";
import GuideSection from "../components/GuideSection";
import Image from "next/image";
import DatabaseConfigGuide from "./components/DatabaseConfigGuide";
import DatabaseDockerGuide from "./components/DatabaseDockerGuide";
import { FaDocker } from "react-icons/fa";
const DatabaseGuidePage: React.FC = () => {
  return (
    <div className="w-full px-8 max-h-screen">
      <div className="flex-grow px-4 sm:px-6 lg:px-8 grid">
        <h1 className="text-4xl font-bold text-center mb-5 mt-10">
          데이터베이스 배포 가이드
        </h1>
      </div>
      <GuideSection title="시작하기 전에">
        <div className="space-y-6">
          <p>
            Ttalkak을 사용하여 데이터베이스를 배포하기 전에 다음 사항을
            확인하세요:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Ttalkak에서 제공하는 데이터베이스는 MySQL, Redis, PostgreSQL,
              MongoDB, MariaDB입니다.
            </li>
            <li>
              <strong>
                보안을 위해 반드시 데이터베이스 생성 시 제공되는 설정을
                애플리케이션에 적용해야 합니다.
              </strong>
            </li>
            <li>
              각 데이터베이스의 특성을 이해하고 프로젝트에 적합한 것을
              선택하세요.
            </li>
          </ul>
        </div>
      </GuideSection>
      <GuideSection title="배포하기">
        <ul className="list-disc pl-6 space-y-6">
          <li>
            <strong>데이터베이스 선택:</strong> MySQL, Redis, PostgreSQL,
            MongoDB, MariaDB 중 원하는 데이터베이스를 선택합니다.
          </li>
          <p>설정 구성: 데이터베이스 이름을 작성합니다.</p>
          <Image
            src="/image1.png"
            alt="Database Selection"
            width={300}
            height={300}
            className="mt-2"
          />
          <li>
            <strong>배포:</strong> &apos;생성&apos; 버튼을 클릭하여 데이터베이스
            생성을 시작합니다. 실시간으로 배포 과정을 확인할 수 있습니다.
          </li>
          <li>
            <strong>접속 정보 확인 및 적용:</strong> 배포가 완료되면 접속 URL,
            포트, 사용자 이름, 비밀번호 등의 접속 정보를 안전하게 저장하고,
            반드시 개발한 애플리케이션에 설정해야 합니다.
            <Image
              src="/image3.png"
              alt="Deployment"
              width={300}
              height={300}
              className="mt-2"
            />
          </li>
        </ul>
      </GuideSection>
      <GuideSection title="데이터베이스 백엔드 설정 가이드">
        <DatabaseConfigGuide />
      </GuideSection>
      <GuideSection
        title="데이터베이스별 Docker 설정 가이드"
        icon={<FaDocker className="mr-2" />}
      >
        <DatabaseDockerGuide />
      </GuideSection>
      <GuideSection title="보안 권장사항">
        <ul className="list-disc pl-6 space-y-2">
          <li>자동 생성된 비밀번호는 안전한 곳에 보관하세요.</li>
          <li>정기적으로 비밀번호를 변경하는 것이 좋습니다.</li>
          <li>필요한 IP에서만 접근 가능하도록 방화벽 설정을 조정하세요.</li>
          <li>
            <strong>
              데이터베이스 접속 정보를 애플리케이션 코드에 직접 하드코딩하지
              마세요. 환경 변수를 사용하세요.
            </strong>
          </li>
        </ul>
      </GuideSection>
      <GuideSection title="요금 정책">
        <ul className="list-disc pl-6 space-y-2">
          <li>사용한 리소스와 시간에 따라 요금이 부과됩니다.</li>
          <li>대시보드에서 현재 사용량과 예상 요금을 확인할 수 있습니다.</li>
          <li>월별 청구서는 이메일로 발송됩니다.</li>
        </ul>
      </GuideSection>
      <GuideSection title="주의사항">
        <ul className="list-disc pl-6 space-y-2">
          <li>데이터베이스 이름은 영문으로 설정해야 합니다.</li>
          <li>서비스는 단일 데이터베이스 인스턴스만 지원합니다.</li>
          <li>
            배포된 데이터베이스의 사용량에 따라 자동으로 요금이 청구됩니다.
          </li>
          <li>
            <strong>
              보안을 위해 반드시 Ttalkak에서 제공하는 데이터베이스 설정을
              사용하세요.
            </strong>
          </li>
        </ul>
      </GuideSection>
      <div className="h-10"></div>
    </div>
  );
};

export default DatabaseGuidePage;
