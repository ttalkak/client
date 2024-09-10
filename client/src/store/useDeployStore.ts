import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  DeployData,
  Framework,
  DeployType,
  GithubRepositoryRequest,
  DatabaseCreateRequest,
} from "@/types/deploy";

interface DeployStoreState extends DeployData {
  setProjectId: (projectId: number) => void;
  setFramework: (framework: Framework) => void;
  setServiceType: (serviceType: DeployType) => void;
  setGithubRepositoryRequest: (data: Partial<GithubRepositoryRequest>) => void;
  setDatabaseCreateRequests: (data: DatabaseCreateRequest[] | null) => void;
  addDatabaseCreateRequest: (data: DatabaseCreateRequest) => void;
  removeDatabaseCreateRequest: (index: number) => void;
  setHostingPort: (hostingPort: number | null) => void;
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
  hostingPort: null,
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
      setHostingPort: (hostingPort) => set({ hostingPort }),
      setEnvironment: (env) => set({ env }),
      reset: () =>
        set((state) => ({
          ...initialState,
          projectId: state.projectId,
          serviceType: state.serviceType,
          githubRepositoryRequest: state.githubRepositoryRequest,
        })),
    }),
    {
      name: "deploy-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useDeployStore;
