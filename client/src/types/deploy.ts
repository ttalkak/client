export enum ServiceType {
  FRONTEND = "FRONTEND",
  BACKEND = "BACKEND",
}

export enum DeployStatus {
  STOPPED = "STOPPED",
  RUNNING = "RUNNING",
  PENDING = "PENDING",
  WAITING = "WAITING",
  ERROR = "ERROR",
}

export enum StatusMessage {
  STOPPED = "STOPPED",
  RUNNING = "RUNNING",
  PENDING = "PENDING",
  DOMAIN = "DOMAIN",
  DOWNLOAD = "DOWNLOAD",
  DOCKER = "DOCKER",
  FAILED = "FAILED",
  CLOUD = "cloud manipulate",
}

export enum DeployCommand {
  START = "START",
  RESTART = "RESTART",
  STOP = "STOP",
}

export enum Framework {
  REACT = "REACT",
  NEXTJS = "NEXTJS",
  VUEJS = "VUEJS",
  SPRINGBOOT = "SPRINGBOOT",
}

export enum BuildTool {
  GRADLE = "gradle",
  MAVEN = "maven",
  CRA = "cra",
  VITE = "vite",
}

export enum PackageManager {
  NPM = "npm",
  YARN = "yarn",
}

export interface Deployment {
  deploymentId: number;
  projectId: number;
  status: DeployStatus;
  statusMessage: StatusMessage;
  serviceType: ServiceType;
  repositoryName: string;
  repositoryUrl: string;
  repositoryLastCommitMessage: string;
  repositoryLastCommitUserProfile: string;
  repositoryLastCommitUserName: string;
  hostingResponses: Hosting[];
}

export interface Hosting {
  hostingId: number;
  detailDomainName: string;
  serviceType: ServiceType;
  hostingPort: number;
}

export interface VersionRequest {
  repositoryLastCommitMessage: string;
  repositoryLastCommitUserProfile: string;
  repositoryLastCommitUserName: string;
}

export interface GithubRepositoryRequest {
  repositoryOwner: string;
  repositoryName: string;
  repositoryUrl: string;
  rootDirectory: string;
  branch: string;
}

export interface DockerfileCreateRequest {
  exist: boolean;
  buildTool?: BuildTool;
  packageManager?: PackageManager;
  languageVersion: string;
}

export interface EnvVar {
  key: string;
  value: string;
}

export interface Version {
  id: number;
  repositoryLastCommitMessage: string;
  repositoryLastCommitUserName: string;
  repositoryLastCommitUserProfile: string;
  version: number;
}

export interface DeployData {
  hostingPort: number | null;
  githubRepositoryRequest: GithubRepositoryRequest;
  versionRequest: VersionRequest | null;
  dockerfileCreateRequest?: DockerfileCreateRequest;
  envs: EnvVar[] | null;
  framework: Framework;
  favicon: string | null;
}

export interface CreateDeployRequest extends DeployData {
  projectId: number;
  serviceType: ServiceType;
}

export interface GetDeployResponse {
  deploymentId: number;
  projectId: number;
  status: string;
  serviceType: string;
  repositoryName: string;
  repositoryUrl: string;
  branch: string;
  repositoryOwner: string;
  framework: string;
  payloadURL: string;
  versions: Version[];
  envs?: EnvVar[];
  hostingResponse: Hosting;
  statusMessage: StatusMessage;
}
