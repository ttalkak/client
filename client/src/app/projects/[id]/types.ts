export type DeployStatus = "Ready" | "Failed";

export interface DeployInfo {
  status: DeployStatus;
  name: string;
  lastUpdated: string;
}

export interface Project {
  id: string;
  name: string;
  frontendDeploy: DeployInfo | null;
  backendDeploy: DeployInfo | null;
}
