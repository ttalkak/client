import Button from "@/components/Button";
import { useState } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectName: string) => void;
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
}: ProjectModalProps) {
  const [projectName, setProjectName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(projectName);
    setProjectName("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-20 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-center">프로젝트 생성</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="프로젝트 이름을 입력하세요"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-center gap-4">
            <Button label="취소" onClick={onClose} size="large" />
            <Button label="생성" type="submit" primary size="large" />
          </div>
        </form>
      </div>
    </div>
  );
}
