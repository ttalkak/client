"use client";

import { useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";

interface FormData {
  port: string;
  rootDir: string;
  useDatabase: boolean;
  databaseType?: string;
  databasePort?: string;
  databaseUsername?: string;
  databasePassword?: string;
}

export default function BackendForm() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      port: "8080",
      rootDir: "/",
      useDatabase: false,
    },
  });

  const useDatabase = watch("useDatabase");
  const databaseType = useWatch({ control, name: "databaseType" });

  useEffect(() => {
    if (useDatabase) {
      setValue("databaseType", "MySQL");
      setValue("databasePort", "");
    } else {
      setValue("databaseType", "");
      setValue("databasePort", "");
      setValue("databaseUsername", "");
      setValue("databasePassword", "");
    }
  }, [useDatabase, setValue]);

  useEffect(() => {
    if (databaseType === "Redis") {
      setValue("databaseUsername", "");
      setValue("databasePassword", "");
    }
  }, [databaseType, setValue]);

  const onSubmit = (data: FormData) => {
    // 프레임워크 부트로 고정
    const sumbittedData = {
      ...data,
      framework: "SpringBoot",
      port: Number(data.port),
      databasePort: useDatabase ? Number(data.databasePort) : undefined,
    };
    console.log(sumbittedData);
    // 폼 제출 api
  };

  return (
    <>
      <form
        id="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto p-6 bg-white rounded-lg border"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-md font-semibold text-gray-700 mb-1">
              백엔드 프레임워크
            </label>
            <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-100">
              SpringBoot
            </div>
          </div>

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
                <input
                  {...field}
                  id="rootDir"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          />

          <Controller
            name="useDatabase"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <div className="flex items-center gap-2">
                <input
                  {...field}
                  type="checkbox"
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="useDatabase"
                  className="block text-md font-semibold text-gray-700 mb-1"
                >
                  데이터베이스 사용여부
                </label>
              </div>
            )}
          />

          {useDatabase && (
            <div className="space-y-4">
              <Controller
                name="databaseType"
                control={control}
                render={({ field }) => (
                  <div>
                    <label
                      htmlFor="databaseType"
                      className="block text-md font-semibold text-gray-700 mb-1"
                    >
                      데이터베이스
                    </label>
                    <select
                      {...field}
                      id="databaseType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="MySQL">MySQL</option>
                      <option value="MariaDB">MariaDB</option>
                      <option value="MongoDB">MongoDB</option>
                      <option value="PostgreSQL">PostgreSQL</option>
                      <option value="Redis">Redis</option>
                    </select>
                  </div>
                )}
              />

              {databaseType !== "Redis" && (
                <Controller
                  name="databaseUsername"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "영어와 숫자만 입력 가능합니다.",
                    },
                  }}
                  render={({ field }) => (
                    <div>
                      <label
                        htmlFor="databaseUsername"
                        className="block text-md font-semibold text-gray-700 mb-1"
                      >
                        데이터베이스 아이디
                      </label>
                      <input
                        {...field}
                        id="databaseUsername"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.databaseUsername && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.databaseUsername.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              )}

              <Controller
                name="databasePassword"
                control={control}
                render={({ field }) => (
                  <div>
                    <label
                      htmlFor="databasePassword"
                      className="block text-md font-semibold text-gray-700 mb-1"
                    >
                      데이터베이스 비밀번호
                    </label>
                    <input
                      {...field}
                      id="databasePassword"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              />

              <Controller
                name="databasePort"
                control={control}
                rules={{
                  validate: (value) => {
                    if (useDatabase) {
                      if (!value) return "포트번호를 입력해주세요.";
                      if (!/^\d+$/.test(value)) return "숫자만 입력가능합니다.";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <label
                      htmlFor="databasePort"
                      className="block text-md font-semibold text-gray-700 mb-1"
                    >
                      데이터베이스 포트번호
                    </label>
                    <input
                      {...field}
                      id="databasePort"
                      type="number"
                      min="0"
                      max="65535"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-2">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          )}
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
