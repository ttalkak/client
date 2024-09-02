import React from "react";
import Image from "next/image";
import { Repository } from "../types";

interface RepoListProps {
  repos: Repository[];
  selectedRepo: Repository | null;
  onRepoSelect: (repo: Repository) => void;
}

export function RepoList({ repos, selectedRepo, onRepoSelect }: RepoListProps) {
  return (
    <ul className="divide-y">
      {repos.map((repo) => (
        <li
          key={repo.id}
          className={`cursor-pointer hover:bg-gray-100 p-3 ${
            selectedRepo?.id === repo.id ? "bg-gray-100" : ""
          }`}
          onClick={() => onRepoSelect(repo)}
        >
          <div className="flex items-center">
            <div className="relative w-8 h-8 mr-2">
              <Image
                src={repo.owner.avatar_url}
                alt={`${repo.owner.login}'s avatar`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="font-semibold">{repo.full_name}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
