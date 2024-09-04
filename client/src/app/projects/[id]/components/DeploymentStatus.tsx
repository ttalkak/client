import Link from "next/link";
import { DeployInfo } from "../types";
import { HiOutlineX } from "react-icons/hi";

interface DeploymentStatusProps {
  type: "Frontend" | "Backend";
  deploy: DeployInfo | null;
  projectId: string;
}

export default function DeploymentStatus({
  type,
  deploy,
  projectId,
}: DeploymentStatusProps) {
  if (deploy) {
    return (
      <div className="flex flex-col gap-4 border rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{type}</h3>
          <HiOutlineX className="w-5 h-5 cursor-pointer" />
        </div>
        <p className="text-md">{deploy.name}</p>
        <div className="flex justify-between">
          <span className="text-md">상태: {deploy.status}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">{deploy.lastUpdated}</span>
          <Link
            href={`/deploy/${projectId}`}
            className="font-semibold w-32 bg-black text-center text-white px-4 py-2 rounded-lg text-md"
          >
            상세 페이지
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 border rounded-lg p-6">
      <h3 className="font-semibold text-lg">{type}</h3>
      <p className="text-md">배포된 서버가 없습니다.</p>
      <div className="flex justify-end">
        <Link
          href={`/deploy/create/${type.toLowerCase()}?projectId=${projectId}`}
          className="font-semibold w-24 bg-black text-center text-white px-4 py-2 rounded-lg text-md"
        >
          배포하기
        </Link>
      </div>
    </div>
  );
}
