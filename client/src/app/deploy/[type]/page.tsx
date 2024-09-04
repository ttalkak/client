import { Suspense } from "react";
import GitHubRepos from "./components/githubRepos";
import SkeletonUI from "@/app/deploy/[type]/components/SkeletonUI";

export default function GitHubRepositoriesPage() {
  return (
    <Suspense fallback={<SkeletonUI />}>
      <GitHubRepos />
    </Suspense>
  );
}
