import Link from "next/link";
import { notFound } from "next/navigation";

type DeployStatus = "Ready" | "In Progress" | "Failed";

interface DeployInfo {
  status: DeployStatus;
  name: string;
  lastUpdated: string;
}

interface Project {
  id: string;
  name: string;
  frontendDeploy: DeployInfo | null;
  backendDeploy: DeployInfo | null;
}

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
    <div className="container mx-auto p-6 border rounded-lg overflow-hidden">
      <h1 className="text-3xl font-bold mb-3">{project.name}</h1>
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

interface DeploymentStatusProps {
  type: "Frontend" | "Backend";
  deploy: DeployInfo | null;
  projectId: string;
}

function DeploymentStatus({ type, deploy, projectId }: DeploymentStatusProps) {
  if (deploy) {
    return (
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-2">{type}</h3>
        <p className="text-sm text-gray-600 mb-2">{deploy.name}</p>
        <p className="text-sm text-gray-600 mb-2">
          상태: <span className="text-green-500">{deploy.status}</span>
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{deploy.lastUpdated}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-2">{type}</h3>
      <p className="text-sm text-gray-600 mb-4">아직 등록되지 않았습니다.</p>
      <Link
        href={`/deploy/${type.toLowerCase()}?projectId=${projectId}`}
        className="bg-black text-white px-4 py-2 rounded-lg text-sm"
      >
        등록하기
      </Link>
    </div>
  );
}
