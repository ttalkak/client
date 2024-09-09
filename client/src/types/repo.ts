// GitHub 레포지토리 정보를 위한 인터페이스
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  updated_at: string;
  description: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
  };
}

// 파일 또는 디렉토리 정보를 위한 인터페이스
export interface FileContent {
  name: string;
  path: string;
  type: string;
  content?: string;
  download_url?: string;
  sha: string;
}
