import Button from "@/components/Button";
import { useForm } from "react-hook-form";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectName: string, domainName: string) => void;
}

interface FormData {
  projectName: string;
  domainName: string;
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
}: ProjectModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  if (!isOpen) return null;

  const onSubmitForm = (data: FormData) => {
    onSubmit(data.projectName, data.domainName);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-20 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-center">프로젝트 생성</h2>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-4">
            <input
              {...register("projectName", {
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
            <Button label="생성" type="submit" primary size="large" />
          </div>
        </form>
      </div>
    </div>
  );
}
