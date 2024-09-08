import { create } from "zustand";
import { Repository } from "@/types/repo";

interface DeployStoreState {
  depolyType: "frontend" | "backend" | null;
  repositoryId: string | null;
  formData: Record<string, any>;
  selectedRepository: Repository | null;
  setDeployType: (type: "frontend" | "backend" | null) => void;
  setRepositoryId: (repo: string | null) => void;
  setSelectedRepository: (repo: Repository | null) => void;
  setFormData: (data: Record<string, any>) => void;
}

const useDeployStore = create<DeployStoreState>((set) => ({
  depolyType: null,
  repositoryId: null,
  selectedRepository: null,
  formData: {},
  setDeployType: (type) => set({ depolyType: type }),
  setRepositoryId: (repo) => set({ repositoryId: repo }),
  setSelectedRepository: (repo) => set({ selectedRepository: repo }),
  setFormData: (data) => set({ formData: data }),
}));

export default useDeployStore;
