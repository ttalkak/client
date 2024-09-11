export interface Hosting {
  hostingId: number;
  detailDomainName: string;
  serviceType: "FRONTEND" | "BACKEND";
  hostingPort: number;
}

export interface Deployment {
  deploymentId: number;
  projectId: number;
  status: "STOPPED" | "RUNNING" | "DELETED" | "PENDING";
  serviceType: "FRONTEND" | "BACKEND";
  repositoryName: string;
  repositoryUrl: string;
  repositoryLastCommitMessage: string;
  repositoryLastCommitUserProfile: string;
  repositoryLastCommitUserName: string;
  hostingResponses: Hosting[];
}

export type DeployType = "FRONTEND" | "BACKEND" | "";
export type DatabaseType =
  | "MYSQL"
  | "MARIADB"
  | "MONGODB"
  | "POSTGRESQL"
  | "REDIS";
export type Framework = "REACT" | "NEXTJS" | "SPRINGBOOT" | null;

export interface GithubRepositoryRequest {
  repositoryName: string;
  repositoryUrl: string;
  repositoryLastCommitMessage: string;
  repositoryLastCommitUserProfile: string;
  repositoryLastCommitUserName: string;
  rootDirectory: string;
  branch: string;
}
export interface DatabaseCreateRequest {
  databaseName: DatabaseType;
  databasePort: number;
  username: string;
  password: string;
}

export interface DeployData {
  projectId: number;
  framework: Framework;
  serviceType: DeployType;
  githubRepositoryRequest: GithubRepositoryRequest;
  databaseCreateRequests: DatabaseCreateRequest[] | null;
  hostingPort: number | null;
  env: string | null;
}
