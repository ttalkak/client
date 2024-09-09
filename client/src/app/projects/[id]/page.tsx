"use client";

import { notFound } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import DeploymentStatus from "@/app/projects/[id]/components/DeploymentStatus";
import useGetProject from "@/apis/project/useGetProject";
import { Deployment } from "@/types/deploy";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { data: project, isLoading, error } = useGetProject(Number(params.id));

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  if (!project) {
    notFound();
  }

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
        <FaRegEdit className="w-6 h-6 cursor-pointer" />
        <RiDeleteBin5Line className="w-7 h-7 cursor-pointer" />
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
    </div>
  );
}
