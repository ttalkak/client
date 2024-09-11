import Link from "next/link";
import { HiOutlineX } from "react-icons/hi";
import { Deployment } from "@/types/deploy";
import useDeleteDeploy from "@/apis/deploy/useDeleteDeploy";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

interface DeploymentStatusProps {
  type: "Frontend" | "Backend";
  deploy: Deployment | null;
  projectId: number;
}

export default function DeploymentStatus({
  type,
  deploy,
  projectId,
}: DeploymentStatusProps) {
  const { mutate: deleteDeploy } = useDeleteDeploy();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteConfirm = () => {
    deleteDeploy(Number(deploy?.deploymentId));
  };

  if (deploy) {
    const hosting = deploy.hostingResponses[0]; // 첫 번째 호스팅 정보 사용
    return (
      <>
        <div className="flex flex-col gap-4 border rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{type}</h3>
            <HiOutlineX
              onClick={() => setDeleteModal(true)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
          <p className="text-md">{deploy.repositoryName}</p>
          <div className="flex justify-between">
            <span className="text-md">상태: {deploy.status}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 max-w-[60%] truncate">
              {deploy.repositoryLastCommitUserName} -{" "}
              {deploy.repositoryLastCommitMessage}
            </span>
            <Link
              href={`/deploy/${deploy.deploymentId}`}
              className="font-semibold w-32 bg-black text-center text-white px-4 py-2 rounded-lg text-md"
            >
              상세 페이지
            </Link>
          </div>
        </div>
        <ConfirmModal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          message="프로젝트를 삭제하시겠습니까?"
        />
      </>
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
