import { notFound } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import DeploymentStatus from "@/app/projects/[id]/components/DeploymentStatus";
import { Project } from "./types";

// 프로젝트 데이터를 가져오는 함수 (실제로는 API 호출)
async function getProject(id: string): Promise<Project | null> {
  const projects: Record<string, Project> = {
    "1": {
      id: "1",
      name: "LeadMe",
      frontendDeploy: null,
      backendDeploy: null,
    },
    "2": {
      id: "2",
      name: "ssapick",
      frontendDeploy: {
        status: "Ready",
        name: "ssapick_front",
        lastUpdated: "3일 전",
      },
      backendDeploy: null,
    },
  };

  return projects[id] || null;
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto my-10 p-6 border rounded-lg overflow-hidden">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold mb-3">{project.name}</h1>
        <FaRegEdit className="w-6 h-6 cursor-pointer" />
        <RiDeleteBin5Line className="w-7 h-7 cursor-pointer" />
      </div>
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-4">
              <DeploymentStatus
                type="Frontend"
                deploy={project.frontendDeploy}
                projectId={project.id}
              />
              <DeploymentStatus
                type="Backend"
                deploy={project.backendDeploy}
                projectId={project.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
