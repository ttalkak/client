import Sidebar from "./components/sidebar";
import { inlinelayout } from "./layout";

export default function GuidePage() {
  return (
    <div>
      <div className="flex-grow container mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold">가이드</h1>
        <p className="mb-6">
          이 섹션에는 TTALKAK 서비스를 이용하는 방법에 도움이 되는 가이드가
          포함되어 있습니다.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">TTALKAK으로 배포하다</h2>
          <p className="mb-4">
            딸깍 서비스는 개발자분들의 손쉬운 배포를 돕는 서비스 입니다. Docker
            Container를 기반으로 직접 제작한 프로젝트를 사용자에게 제공해보세요.
            Frontend, Backend, Database를 각각 배포 하고 관리할 수 있습니다.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            ※ 단일 프로젝트/docker 기반입니다. docker compose는 현재 지원되지
            않습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Frontend 가이드</h3>
              <p>React.js, Next.js 기반 서비스를 배포하는 방법을 알아보세요.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Backend 가이드</h3>
              <p>Java Spring 기반 서비스를 배포하는 방법을 알아보세요.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Database 가이드</h3>
              <p>
                MySQL, PostgreSQL, Redis, MongoDB, MariaDB 배포 및 조작 방법을
                알아보세요.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
