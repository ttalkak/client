import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { BiInfinite } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    projectName: string,
    domainName: string,
    expirationDate: string
  ) => void;
}

interface FormData {
  projectName: string;
  domainName: string;
  paymentType: "기간제" | "무기한";
  expirationDate: string;
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
}: ProjectModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      paymentType: "무기한",
      expirationDate: new Date().toISOString().split("T")[0],
    },
  });

  const paymentType = watch("paymentType");

  useEffect(() => {
    if (isOpen) {
      reset({
        projectName: "",
        domainName: "",
        paymentType: "무기한",
        expirationDate: new Date().toISOString().split("T")[0],
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmitForm = (data: FormData) => {
    const formattedDate =
      paymentType === "무기한" ? "9999-12-31" : data.expirationDate;
    onSubmit(data.projectName, data.domainName, formattedDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-16 rounded-lg shadow-xl relative">
        <IoClose
          className="w-6 h-6 absolute top-6 right-6 cursor-pointer"
          onClick={() => {
            reset();
            onClose();
          }}
        />
        <h2 className="text-4xl font-bold mb-8 text-center">프로젝트 생성</h2>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="flex gap-2 items-center block text-sm font-medium text-gray-700 mb-2"
            >
              <div className="bg-black text-white w-5 text-center rounded-[4px]">
                1
              </div>
              프로젝트명을 입력해 주세요
            </label>
            <input
              id="projectName"
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
            <label
              htmlFor="domainName"
              className="flex gap-2 items-center block text-sm font-medium text-gray-700 mb-2"
            >
              <div className="bg-black text-white w-5 text-center rounded-[4px]">
                2
              </div>
              도메인명을 입력해 주세요
            </label>
            <input
              id="domainName"
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

          <div className="mb-4">
            <label className="flex gap-2 items-center block text-sm font-medium text-gray-700 mb-2">
              <div className="bg-black text-white w-5 text-center rounded-[4px]">
                3
              </div>
              결제유형을 선택해 주세요
            </label>
            <div className="flex gap-5">
              <Controller
                name="paymentType"
                control={control}
                render={({ field }) => (
                  <>
                    <div
                      className={`flex-2 p-8 border rounded-lg cursor-pointer ${
                        field.value === "기간제"
                          ? "border-blue-500 text-black"
                          : "border-gray-300 text-gray-400"
                      } `}
                      onClick={() => field.onChange("기간제")}
                    >
                      <h3 className="font-bold mb-4">기간제</h3>
                      {field.value === "무기한" && (
                        <FaRegCalendarAlt className="w-7 h-7" />
                      )}

                      <div className="mb-3">
                        <Controller
                          name="expirationDate"
                          control={control}
                          rules={{
                            required:
                              paymentType === "기간제"
                                ? "만료일은 필수입니다"
                                : false,
                            validate: (value) =>
                              paymentType === "무기한" ||
                              new Date(value) > new Date() ||
                              "선택한 날짜는 오늘 이후여야 합니다.",
                          }}
                          render={({ field }) => (
                            <input
                              type="date"
                              {...field}
                              className={`w-full border border-gray-300 rounded ${
                                paymentType === "무기한" ? "hidden" : ""
                              }`}
                              disabled={paymentType !== "기간제"}
                            />
                          )}
                        />
                        {errors.expirationDate && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.expirationDate.message}
                          </p>
                        )}
                      </div>
                      <ul className="text-sm">
                        <li className="flex gap-2">
                          <FaCheck />
                          선택한 날짜까지 프로젝트 이용가능
                        </li>
                        <li className="flex gap-2">
                          <FaCheck />
                          매달 1일 사용량에 따라 요금 청구
                        </li>
                        <li className="flex gap-2">
                          <FaCheck />
                          전자 영수증 메일로 전송
                        </li>
                      </ul>
                    </div>
                    <div
                      className={`flex-2 p-8 border rounded-lg cursor-pointer ${
                        field.value === "무기한"
                          ? "border-blue-500 text-black"
                          : "border-gray-300 text-gray-400"
                      }`}
                      onClick={() => {
                        field.onChange("무기한");
                        setValue("expirationDate", "");
                      }}
                    >
                      <h3 className="font-bold mb-3">무기한</h3>
                      <div className="mb-2">
                        <BiInfinite className="w-8 h-8" />
                      </div>
                      <ul className="text-sm">
                        <li className="flex gap-2">
                          <FaCheck />
                          비활성화 전까지 무기한 사용 가능
                        </li>
                        <li className="flex gap-2">
                          <FaCheck />
                          매달 1일 사용량에 따른 요금 청구
                        </li>
                        <li className="flex gap-2">
                          <FaCheck />
                          전자 영수증 메일로 전송
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <Button label="생성" type="submit" primary size="large" />
          </div>
        </form>
      </div>
    </div>
  );
}
