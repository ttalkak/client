"use client";
import React, { useState, ReactNode } from "react";
import { FaReact, FaDocker, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiVite, SiCreatereactapp } from "react-icons/si";
import { IconType } from "react-icons";
import { CodeBlock } from "../../../../../app/guide/components/CodeBlock";
import {
  Section,
  SubSection,
} from "../../../../..//app/guide/components/Section";
import { Tab } from "../../../../../app/guide/components/Tab";

interface FrameworkOption {
  label: string;
  Icon: IconType;
  code: string;
}

const FrontendDeploymentGuide: React.FC = () => {
  const npmOptions: FrameworkOption[] = [
    {
      label: "Vite",
      Icon: SiVite,
      code: `FROM node:20.11.1 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]`,
    },
    {
      label: "Create React App",
      Icon: SiCreatereactapp,
      code: `FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]`,
    },
  ];

  const yarnOptions: FrameworkOption[] = [
    {
      label: "Vite",
      Icon: SiVite,
      code: `FROM node:18 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]`,
    },
    {
      label: "Create React App",
      Icon: SiCreatereactapp,
      code: `FROM node:18 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
`,
    },
  ];

  const nextOptions: FrameworkOption[] = [
    {
      label: "Next.js",
      Icon: SiNextdotjs,
      code: `FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=build /app/package*.json ./ 
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
RUN npm install --production
CMD ["npm", "start"]`,
    },
  ];

  const [selectedNpm, setSelectedNpm] = useState<FrameworkOption>(
    npmOptions[0]
  );
  const [selectedYarn, setSelectedYarn] = useState<FrameworkOption>(
    yarnOptions[0]
  );
  const [selectedNext, setSelectedNext] = useState<FrameworkOption>(
    nextOptions[0]
  );

  return (
    <div className="mx-auto p-6 space-y-8">
      <Section title="배포 과정">
        <ul className="list-none space-y-3 pl-6">
          <li className="flex items-center space-x-2">
            GitHub 저장소를 Ttalkak과 연동합니다.
          </li>
          <li>프로젝트의 프레임워크 또는 빌드 도구를 선택합니다.</li>
          <li>
            필요한 경우 환경 변수를 설정합니다 (예: API 엔드포인트, 분석 키 등).
          </li>
          <li>배포 버튼을 클릭하여 프로세스를 시작합니다.</li>
          <li>배포 로그를 실시간으로 확인할 수 있습니다.</li>
          <li>배포가 완료되면 접속 URL이 제공됩니다.</li>
        </ul>
      </Section>

      <Section title="React.js">
        <p className="mb-6">React.js 프로젝트를 배포</p>
        <SubSection title="npm 기반 빌드툴 선택">
          <div className="flex space-x-2 mb-6">
            {npmOptions.map((option) => (
              <Tab
                key={option.label}
                label={option.label}
                Icon={option.Icon}
                isActive={selectedNpm.label === option.label}
                onClick={() => setSelectedNpm(option)}
              />
            ))}
          </div>
          <p className="mb-4">
            선택한 빌드 툴에 따라 자동 생성되는 Dockerfile 양식입니다.
          </p>
          <CodeBlock code={selectedNpm.code} />
        </SubSection>

        <SubSection title="yarn 기반 빌드 툴 선택">
          <p className="mb-6">yarn을 사용하는 경우, 프레임워크를 선택하세요:</p>
          <div className="flex space-x-2 mb-6">
            {yarnOptions.map((option) => (
              <Tab
                key={option.label}
                label={option.label}
                Icon={option.Icon}
                isActive={selectedYarn.label === option.label}
                onClick={() => setSelectedYarn(option)}
              />
            ))}
          </div>
          <p className="mb-4">
            선택한 빌드 툴에 따라 자동 생성되는 Dockerfile 양식입니다.
          </p>
          <CodeBlock code={selectedYarn.code} />
        </SubSection>
      </Section>

      <Section title="Next.js 배포">
        <p className="mb-6">Next.js 프로젝트를 배포</p>
        <div className="flex space-x-2 mb-6">
          {nextOptions.map((option) => (
            <Tab
              key={option.label}
              label={option.label}
              Icon={option.Icon}
              isActive={selectedNext.label === option.label}
              onClick={() => setSelectedNext(option)}
            />
          ))}
        </div>
        <p className="mb-4">
          선택한 빌드 툴에 따라 자동 생성되는 Dockerfile 양식입니다.
        </p>
        <CodeBlock code={selectedNext.code} />
      </Section>
    </div>
  );
};
export default FrontendDeploymentGuide;
