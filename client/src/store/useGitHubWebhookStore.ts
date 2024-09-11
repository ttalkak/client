import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GitHubWebhookStore {
  owner: string;
  repositoryName: string;
  setOwner: (owner: string) => void;
  setRepositoryName: (repositoryName: string) => void;
  reset: () => void;
}

const initialState = {
  owner: "",
  repositoryName: "",
};

const useGitHubWebhookStore = create<GitHubWebhookStore>()(
  persist(
    (set) => ({
      owner: "",
      repositoryName: "",
      setOwner: (owner) => set({ owner }),
      setRepositoryName: (repositoryName) => set({ repositoryName }),
      reset: () => set(initialState),
    }),
    {
      name: "github-webhook-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useGitHubWebhookStore;
