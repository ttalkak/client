import Link from "next/link";
import { HiOutlineX } from "react-icons/hi";
import { DeployCommand, Deployment } from "@/types/deploy";
import useDeleteDeploy from "@/apis/deploy/useDeleteDeploy";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import { FaStop } from "react-icons/fa";
import useModifyDeployStatus from "@/apis/deploy/useModifyDeployStatus";
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
  const { mutate: modifyDeployStatus } = useModifyDeployStatus();

  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteConfirm = () => {
    deleteDeploy(Number(deploy?.deploymentId));
  };

  const handleDelete = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteModal(true);
  };

  const handleButtonClick =
    (command: DeployCommand) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(command);
      modifyDeployStatus({
        deploymentId: String(deploy?.deploymentId),
        command,
      });
    };

  if (deploy) {
    return (
      <>
        <Link
          href={`/deploy/${deploy.deploymentId}`}
          className="flex flex-col gap-4 border rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{type}</h3>
            <HiOutlineX
              onClick={handleDelete}
              className="w-5 h-5 cursor-pointer hover:scale-110 duration-300 ease-in-out transform"
            />
          </div>
          <p className="text-md">{deploy.repositoryName}</p>
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`inline-block w-3 h-3 rounded-full ${
                deploy.status === "STOPPED"
                  ? "bg-red-500"
                  : deploy.status === "RUNNING"
                    ? "bg-green-500"
                    : deploy.status === "PENDING"
                      ? "bg-yellow-400 animate-pulse-slow"
                      : "bg-gray-500"
              }`}
            />
            <div className="text-md">{deploy.status}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <Image
                src={deploy.repositoryLastCommitUserProfile}
                alt={`${deploy.repositoryLastCommitUserName}'s profile`}
                width={26}
                height={26}
                className="inline-block rounded-full mr-2"
              />
              <span className="text-sm text-gray-500 max-w-[50%] truncate">
                {deploy.repositoryLastCommitUserName} -{" "}
                {deploy.repositoryLastCommitMessage}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              {deploy.status === "STOPPED" && (
                <div
                  onClick={handleButtonClick("START")}
                  className="border flex items-center gap-2 px-4 py-2 shadow-md rounded-full cursor-pointer hover:scale-110 duration-300 ease-in-out transform"
                >
                  <FaPlay color="#3eb127" className="w-4 h-4" />
                  <span>start</span>
                </div>
              )}
              {deploy.status === "RUNNING" && (
                <div
                  onClick={handleButtonClick("RESTART")}
                  className="border flex items-center gap-2 px-4 py-2 shadow-md rounded-full cursor-pointer hover:scale-110 duration-300 ease-in-out transform"
                >
                  <VscDebugRestart color="#7A7A7A" className="w-4 h-4" />
                  <span>restart</span>
                </div>
              )}
              {deploy.status === "RUNNING" && (
                <div
                  onClick={handleButtonClick("STOP")}
                  className="border flex items-center gap-2 px-4 py-2 shadow-md rounded-full cursor-pointer hover:scale-110 duration-300 ease-in-out transform"
                >
                  <FaStop color="#d03939" className="w-4 h-4" />
                  <span>stop</span>
                </div>
              )}
            </div>
          </div>
        </Link>
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
    <div className="flex flex-col gap-6 border rounded-lg p-6">
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
