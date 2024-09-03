import { AiOutlineFile } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { FileContent, Repository } from "../types";

interface FileListProps {
  repoContents: FileContent[];
  selectedRepo: Repository;
  onItemClick: (item: FileContent) => void;
  formatDate: (dateString: string) => string;
}

export function FileList({
  repoContents,
  selectedRepo,
  onItemClick,
  formatDate,
}: FileListProps) {
  return (
    <table className="w-full" data-cy="file-list">
      <thead className="border border-gray bg-gray-100">
        <tr>
          <th className="text-left px-3 py-3">파일 / 폴더명</th>
          <th className="text-left py-2">최근 커밋 메시지</th>
          <th className="text-left py-2">최근 커밋 날짜</th>
        </tr>
      </thead>
      <tbody>
        {repoContents.map((item) => (
          <tr
            key={item.path}
            className="cursor-pointer hover:bg-gray-100 border border-gray"
            onClick={() => onItemClick(item)}
            data-cy="file-item"
          >
            <td className="py-2 px-3 flex items-center gap-2">
              {item.type === "file" ? (
                <AiOutlineFile className="text-gray-500 w-5 h-5" />
              ) : (
                <FaFolder className="text-blue-400 w-5 h-5" />
              )}
              <span data-cy="file-name">{item.name}</span>
            </td>
            <td className="py-2 text-gray-600" data-cy="file-commit-message">
              Update {item.name}
            </td>
            <td className="py-2 text-gray-600" data-cy="file-commit-date">
              {formatDate(selectedRepo.updated_at)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
