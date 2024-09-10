"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { LuMinusCircle } from "react-icons/lu";
import useDeployStore from "@/store/useDeployStore";
import useCreateDeploy from "@/apis/deploy/useCreateDeploy";
import { useRouter } from "next/navigation";

interface FormData {
  framework: "REACT" | "NEXTJS";
  port: number;
  rootDir: string;
  envVars: { key: string; value: string }[];
}

export default function FrontendForm() {
  const { mutate: createDeploy } = useCreateDeploy();
  const router = useRouter();

  const {
    projectId,
    serviceType,
    githubRepositoryRequest,
    databaseCreateRequests,
    reset,
  } = useDeployStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      framework: "REACT",
      port: 3000,
      rootDir: "/",
      envVars: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "envVars",
  });

  const onSubmit = (data: FormData) => {
    const envString = data.envVars
      .map(({ key, value }) => `${key}=${value}`)
      .join("\n");

    createDeploy(
      {
        projectId,
        framework: data.framework,
        serviceType: serviceType!,
        githubRepositoryRequest: {
          ...githubRepositoryRequest,
          rootDirectory: data.rootDir,
        },
        databaseCreateRequests,
        hostingPort: Number(data.port),
        env: envString,
      },
      {
        onSuccess: () => {
          reset();
          router.push(`/projects/${projectId}`);
        },
      }
    );
  };

  return (
    <>
      <form
        id="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto p-6 bg-white rounded-lg border"
      >
        <div className="space-y-6">
          <Controller
            name="framework"
            control={control}
            render={({ field }) => (
              <div>
                <label
                  htmlFor="framework"
                  className="block text-md font-semibold text-gray-700 mb-1"
                >
                  프론트엔드 프레임워크
                </label>
                <select
                  {...field}
                  id="framework"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                >
                  <option value="REACT">React.js</option>
                  <option value="NEXTJS">Next.js</option>
                </select>
              </div>
            )}
          />
          <Controller
            name="port"
            control={control}
            rules={{
              required: "포트번호를 입력해주세요.",
              pattern: {
                value: /^[0-9]+$/,
                message: "포트 번호는 숫자만 입력 가능합니다.",
              },
            }}
            render={({ field }) => (
              <div>
                <label
                  htmlFor="port"
                  className="block text-md font-semibold text-gray-700 mb-1"
                >
                  포트번호
                </label>
                <input
                  {...field}
                  id="port"
                  type="number"
                  min="0"
                  max="65535"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.port && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.port.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="rootDir"
            control={control}
            render={({ field }) => (
              <div>
                <label
                  htmlFor="rootDir"
                  className="block text-md font-semibold text-gray-700 mb-1"
                >
                  루트 디렉토리
                </label>
                <div className="flex">
                  <input
                    {...field}
                    id="rootDir"
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          />
        </div>

        <div className="mt-8">
          <h3 className="block text-md font-semibold text-gray-700 mb-1">
            환경변수
          </h3>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Controller
                  name={`envVars.${index}.key`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Key"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
                <Controller
                  name={`envVars.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Value"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2.5 rounded-md text-gray-400 border border-gray-300 hover:text-gray-600"
                >
                  <LuMinusCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ key: "", value: "" })}
            className="mt-3 flex items-center px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-blue-200"
          >
            <MdAdd className="mr-2" /> 추가
          </button>
        </div>
      </form>
      <div className="flex mt-8 justify-end">
        <button
          type="submit"
          form="form"
          className="py-2 px-4 border rounded-md text-md font-medium text-black focus:outline-none"
        >
          다음
        </button>
      </div>
    </>
  );
}
