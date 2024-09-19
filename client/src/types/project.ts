export interface Project {
  id: number;
  userId: number;
  projectName: string;
  domainName: string;
  expirationDate: string;
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
  direction: string;
  userId: number;
  searchKeyword?: string;
}

export interface ProjectData {
  projectName: string;
  domainName: string;
  expirationDate: string;
}

export interface patchProjectParams {
  projectId: number;
  data: ProjectData;
}

export interface ProjectFormData {
  projectName: string;
  domainName: string;
  paymentType?: "기간제" | "무기한";
  expirationDate: string;
}
