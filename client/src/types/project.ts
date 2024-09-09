export interface Project {
  id: number;
  userId: number;
  projectName: string;
  domainName: string;
  createdAt: string;
  updatedAt: string;
  deployments: null | any;
}

export interface ProjectsResponse {
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

export interface ProjectData {
  projectName: string;
  domainName: string;
}

export interface patchProjectParams {
  projectId: number;
  data: ProjectData;
}
