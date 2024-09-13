export interface Hosting {
  hostingId: number;
  detailDomainName: string;
  serviceType: "FRONTEND" | "BACKEND";
  hostingPort: number;
}

export interface Deployment {
  deploymentId: number;
  projectId: number;
  status: DeployStatus;
  serviceType: "FRONTEND" | "BACKEND";
  repositoryName: string;
  repositoryUrl: string;
  repositoryLastCommitMessage: string;
  repositoryLastCommitUserProfile: string;
  repositoryLastCommitUserName: string;
  hostingResponses: Hosting[];
}

export type DeployType = "FRONTEND" | "BACKEND" | null;

export type DeployStatus = "STOPPED" | "RUNNING" | "PENDING";

export type DeployCommand = "START" | "RESTART" | "STOP";

export type DatabaseType =
  | "MYSQL"
  | "MARIADB"
  | "MONGODB"
  | "POSTGRESQL"
  | "REDIS";
export type Framework = "REACT" | "NEXTJS" | "SPRINGBOOT" | null;

export interface GithubRepositoryRequest {
  repositoryOwner: string;
  repositoryName: string;
  repositoryUrl: string;
  rootDirectory: string;
  branch: string;
}

export interface VersionRequest {
  repositoryLastCommitMessage: string;
  repositoryLastCommitUserProfile: string;
  repositoryLastCommitUserName: string;
}

export interface DatabaseCreateRequest {
  databaseName: DatabaseType;
  databasePort: number;
  username: string;
  password: string;
}

export interface DeployData {
  hostingPort: number | null;
  githubRepositoryRequest: GithubRepositoryRequest;
  versionRequest: VersionRequest | null;
  databaseCreateRequests: DatabaseCreateRequest[] | null;
  env: string | null;
  framework: Framework;
}

export interface createDeployRequest {
  projectId: number;
  serviceType: DeployType;
  hostingPort: number | null;
  githubRepositoryRequest: GithubRepositoryRequest;
  versionRequest: VersionRequest | null;
  databaseCreateRequests: DatabaseCreateRequest[] | null;
  env: string | null;
  framework: Framework;
}
