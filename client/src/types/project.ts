export interface Project {
  id: number;
  userId: number;
  projectName: string;
  domainName: string;
  createdAt: string;
  updatedAt: string;
  deployments: null | any;
}

export interface ProjectResponse {
  content: Project[];
  totalPages: number;
  totalElements: number;
}

export interface getProjectsParams {
  page: number;
  size: number;
  sort: string;
  userId: number;
  searchKeyword?: string;
}

export interface CreateProjectParams {
  projectName: string;
  domainName: string;
}
