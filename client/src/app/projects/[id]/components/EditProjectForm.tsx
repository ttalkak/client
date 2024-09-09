import useModifyProject from "@/apis/project/useModifyProject";
import { Project } from "@/types/project";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";

interface EditProjectFormProps {
  isOpen: boolean;
  project: Project;
  onClose: () => void;
}

interface FormData {
  projectName: string;
  domainName: string;
}

export default function EditProjectForm({
  isOpen,
  project,
  onClose,
}: EditProjectFormProps) {
  const { mutate: patchProject } = useModifyProject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitForm = (data: FormData) => {
    patchProject({
      projectId: project.id,
      data: {
        projectName: data.projectName,
        domainName: data.domainName,
      },
    });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-20 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-center">프로젝트 수정</h2>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-4">
            <input
              {...register("projectName", {
                value: project.projectName,
                required: "프로젝트명은 필수입니다",
                maxLength: {
                  value: 20,
                  message: "프로젝트명은 20자를 초과할 수 없습니다.",
                },
              })}
              placeholder="프로젝트명"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.projectName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.projectName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("domainName", {
                value: project.domainName,
                required: "도메인명은 필수입니다",
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z]{0,19}$/,
                  message: "올바른 형식이 아닙니다. 영어만 사용 가능합니다.",
                },
                maxLength: {
                  value: 20,
                  message: "도메인명은 20자를 초과할 수 없습니다.",
                },
              })}
              placeholder="도메인명 (영어만 사용가능)"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.domainName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.domainName.message}
              </p>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <Button
              label="취소"
              onClick={() => {
                reset();
                onClose();
              }}
              size="large"
            />
            <Button label="수정" type="submit" primary size="large" />
          </div>
        </form>
      </div>
    </div>
  );
}
