import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type DeployType = "FRONTEND" | "BACKEND" | null;
type DatabaseType =
  | "MYSQL"
  | "MARIADB"
  | "MONGODB"
  | "POSTGRESQL"
  | "REDIS"
  | null;
type Framework = "REACT" | "NEXTJS" | "SPRINGBOOT" | null;

interface GithubRepositoryRequest {
  repositoryName: string;
  repositoryUrl: string;
  repositoryLastCommitMessage: string;
  repositoryLastCommitUserProfile: string;
  repositoryLastCommitUserName: string;
  rootDirectory: string;
  branch: string;
}
interface DatabaseCreateRequest {
  databaseName: DatabaseType;
  databasePort: number;
  username: string;
  password: string;
}

interface HostingCreateRequest {
  hostingPort: number;
}

interface DeployData {
  projectId: number;
  framework: Framework;
  serviceType: DeployType;
  githubRepositoryRequest: GithubRepositoryRequest;
  databaseCreateRequests: DatabaseCreateRequest[] | null;
  hostingCreateRequest: HostingCreateRequest;
  env: string | null;
}

interface DeployStoreState extends DeployData {
  setProjectId: (projectId: number) => void;
  setFramework: (framework: Framework) => void;
  setServiceType: (serviceType: DeployType) => void;
  setGithubRepositoryRequest: (data: Partial<GithubRepositoryRequest>) => void;
  setDatabaseCreateRequests: (data: DatabaseCreateRequest[] | null) => void;
  addDatabaseCreateRequest: (data: DatabaseCreateRequest) => void;
  removeDatabaseCreateRequest: (index: number) => void;
  setHostingCreateRequest: (data: HostingCreateRequest) => void;
  setEnvironment: (env: string | null) => void;
  reset: () => void;
}

const initialState: DeployData = {
  projectId: 0,
  framework: null,
  serviceType: "FRONTEND",
  githubRepositoryRequest: {
    repositoryName: "",
    repositoryUrl: "",
    repositoryLastCommitMessage: "",
    repositoryLastCommitUserProfile: "",
    repositoryLastCommitUserName: "",
    rootDirectory: "./",
    branch: "main",
  },
  databaseCreateRequests: null,
  hostingCreateRequest: {
    hostingPort: 3000,
  },
  env: null,
};

const useDeployStore = create(
  persist<DeployStoreState>(
    (set) => ({
      ...initialState,
      setProjectId: (projectId) => set({ projectId }),
      setFramework: (framework) => set({ framework }),
      setServiceType: (serviceType) => set({ serviceType }),
      setGithubRepositoryRequest: (data) =>
        set((state) => ({
          githubRepositoryRequest: {
            ...state.githubRepositoryRequest,
            ...data,
          },
        })),
      setDatabaseCreateRequests: (data) =>
        set({ databaseCreateRequests: data }),
      addDatabaseCreateRequest: (data) =>
        set((state) => ({
          databaseCreateRequests: state.databaseCreateRequests
            ? [...state.databaseCreateRequests, data]
            : [data],
        })),
      removeDatabaseCreateRequest: (index) =>
        set((state) => ({
          databaseCreateRequests: state.databaseCreateRequests
            ? state.databaseCreateRequests.filter((_, i) => i !== index)
            : null,
        })),
      setHostingCreateRequest: (data) => set({ hostingCreateRequest: data }),
      setEnvironment: (env) => set({ env }),
      reset: () => set(initialState),
    }),
    {
      name: "deploy-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useDeployStore;
