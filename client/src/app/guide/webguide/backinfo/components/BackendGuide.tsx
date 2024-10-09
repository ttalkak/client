"use client";

import React, { useState } from "react";
import { SiGradle, SiApachemaven } from "react-icons/si";
import { IconType } from "react-icons";
import {
  Section,
  SubSection,
} from "../../../../..//app/guide/components/Section";
import { CodeBlock } from "../../../../../app/guide/components/CodeBlock";
import { Tab } from "../../../../../app/guide/components/Tab";

interface BuildToolOption {
  label: string;
  Icon: IconType;
  code: string;
}

const BackendDeploymentGuide: React.FC = () => {
  const gradleOptions: BuildToolOption[] = [
    {
      label: "Gradle",
      Icon: SiGradle,
      code: `FROM gradle:8.8-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle clean build -x test --no-daemon

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]`,
    },
  ];

  const mavenOptions: BuildToolOption[] = [
    {
      label: "Maven",
      Icon: SiApachemaven,
      code: `FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]`,
    },
  ];

  const [selectedGradle, setSelectedGradle] = useState<BuildToolOption>(
    gradleOptions[0]
  );
  const [selectedMaven, setSelectedMaven] = useState<BuildToolOption>(
    mavenOptions[0]
  );

  return (
    <div className="mx-auto p-6">
      <Section title="배포 과정">
        <ul className="list-none space-y-1 pl-6">
          <li>GitHub 저장소를 Ttalkak과 연동합니다.</li>
          <li>프로젝트의 빌드 도구와 Java 버전을 선택합니다.</li>
          <li>
            필요한 경우 환경 변수를 설정합니다 (예: 데이터베이스 URL, API 키
            등).
          </li>
          <li>배포 버튼을 클릭하여 프로세스를 시작합니다.</li>
          <li>배포 로그를 실시간으로 확인할 수 있습니다.</li>
          <li>배포가 완료되면 접속 URL과 포트 정보가 제공됩니다.</li>
        </ul>
      </Section>

      <Section title="Gradle 기반 빌드 툴 선택">
        <p className="mb-4">Gradle을 사용하는 경우, 빌드 툴을 선택하세요:</p>
        <div className="flex space-x-2 mb-4">
          {gradleOptions.map((option) => (
            <Tab
              key={option.label}
              label={option.label}
              Icon={option.Icon}
              isActive={selectedGradle.label === option.label}
              onClick={() => setSelectedGradle(option)}
            />
          ))}
        </div>
        <p className="mb-2">
          선택한 Gradle 빌드 툴에 따라 생성되는 Dockerfile:
        </p>
        <CodeBlock code={selectedGradle.code} />
      </Section>

      <Section title="Maven 기반 빌드 툴 선택">
        <p className="mb-4">Maven을 사용하는 경우, 빌드 툴을 선택하세요:</p>
        <div className="flex space-x-2 mb-4">
          {mavenOptions.map((option) => (
            <Tab
              key={option.label}
              label={option.label}
              Icon={option.Icon}
              isActive={selectedMaven.label === option.label}
              onClick={() => setSelectedMaven(option)}
            />
          ))}
        </div>
        <p className="mb-2">선택한 Maven 빌드 툴에 따라 생성되는 Dockerfile:</p>
        <CodeBlock code={selectedMaven.code} />
      </Section>
    </div>
  );
};

export default BackendDeploymentGuide;
