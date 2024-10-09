import React from "react";

import { SiRedis } from "react-icons/si";
import { SiMysql, SiPostgresql, SiMongodb, SiMariadb } from "react-icons/si";

const DatabaseDockerGuide = () => {
  const configs = {
    MySQL: {
      icon: <SiMysql className="text-4xl text-blue-500" />,
      config: `FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=\${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=\${MYSQL_DATABASE}
ENV MYSQL_USER=\${MYSQL_USER}
ENV MYSQL_PASSWORD=\${MYSQL_PASSWORD}

EXPOSE 3306`,
    },
    PostgreSQL: {
      icon: <SiPostgresql className="text-4xl text-blue-400" />,
      config: `FROM postgres:13

ENV POSTGRES_DB=\${POSTGRES_DB}
ENV POSTGRES_USER=\${POSTGRES_USER}
ENV POSTGRES_PASSWORD=\${POSTGRES_PASSWORD}

EXPOSE 5432`,
    },
    MongoDB: {
      icon: <SiMongodb className="text-4xl text-green-500" />,
      config: `FROM mongo:4.4

ENV MONGO_INITDB_ROOT_USERNAME=\${MONGO_INITDB_ROOT_USERNAME}
ENV MONGO_INITDB_ROOT_PASSWORD=\${MONGO_INITDB_ROOT_PASSWORD}
ENV MONGO_INITDB_DATABASE=\${MONGO_INITDB_DATABASE}

EXPOSE 27017`,
    },
    Redis: {
      icon: <SiRedis className="text-4xl text-red-500" />,
      config: `FROM redis:6.0

COPY redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]

EXPOSE 6379`,
    },
    MariaDB: {
      icon: <SiMariadb className="text-4xl text-brown-500" />,
      config: `FROM mariadb:10.5

ENV MYSQL_ROOT_PASSWORD=\${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=\${MYSQL_DATABASE}
ENV MYSQL_USER=\${MYSQL_USER}
ENV MYSQL_PASSWORD=\${MYSQL_PASSWORD}

EXPOSE 3306`,
    },
  };

  return (
    <div className="mt-6">
      <p className="mb-4">
        각 데이터베이스 유형에 따른 Dockerfile 예시입니다. 실제 배포 시 제공되는
        정보로 변수를 대체하세요.
      </p>
      {Object.entries(configs).map(([dbName, { icon, config }]) => (
        <div key={dbName} className="mb-6 border p-4 rounded-lg">
          <h4 className="text-xl font-semibold mb-2 flex items-center">
            {icon}
            <span className="ml-2">{dbName}</span>
          </h4>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{config}</code>
          </pre>
        </div>
      ))}
      <p className="mt-4">
        <strong>주의:</strong> 위의 설정에서{" "}
        <code>$&#123;VARIABLE_NAME&#125;</code> 형식의 변수들은 실제 배포 시
        제공되는 값으로 대체됩니다.
      </p>
    </div>
  );
};

export default DatabaseDockerGuide;
