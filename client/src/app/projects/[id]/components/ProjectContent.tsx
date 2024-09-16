"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import DeploymentStatus from "@/app/projects/[id]/components/DeploymentStatus";
import useGetProject from "@/apis/project/useGetProject";
import { Deployment } from "@/types/deploy";
import EditProjectForm from "@/app/projects/[id]/components/EditProjectForm";
import useDeleteProject from "@/apis/project/useDeleteProject";
import ConfirmModal from "@/components/ConfirmModal";

interface ProjectContentProps {
  id: string;
}

export default function ProjectContent({ id }: ProjectContentProps) {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const router = useRouter();
  const { data: project } = useGetProject(Number(id));
  const { mutate: deleteProject } = useDeleteProject();

  const onClose = () => {
    setEditModal(false);
  };

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    deleteProject(id, {
      onSuccess: () => {
        setDeleteModal(false);
        router.push("/projects");
      },
    });
  };

  const getLatestDeploy = (
    deployments: Deployment[],
    type: "FRONTEND" | "BACKEND"
  ): Deployment | null => {
    return (
      deployments
        .filter((deploy) => deploy.serviceType === type)
        .sort((a, b) => b.deploymentId - a.deploymentId)[0] || null
    );
  };

  return (
    <div className="container mx-auto my-10 p-6 border rounded-lg overflow-hidden">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold mb-3">{project.projectName}</h1>
        <FaRegEdit
          onClick={() => setEditModal(true)}
          className="w-6 h-6 cursor-pointer"
        />
        <RiDeleteBin5Line
          onClick={handleDeleteClick}
          className="w-7 h-7 cursor-pointer"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-4">
              <DeploymentStatus
                type="Frontend"
                deploy={getLatestDeploy(project.deployments, "FRONTEND")}
                projectId={project.id}
              />
              <DeploymentStatus
                type="Backend"
                deploy={getLatestDeploy(project.deployments, "BACKEND")}
                projectId={project.id}
              />
            </div>
          </div>
        </div>
      </div>
      <EditProjectForm isOpen={editModal} project={project} onClose={onClose} />
      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        message="프로젝트를 삭제하시겠습니까?"
      />
    </div>
  );
}
