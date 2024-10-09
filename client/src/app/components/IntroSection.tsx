"use client";

import { motion } from "framer-motion";
import { ImArrowDown2 } from "react-icons/im";

interface IntroSectionProps {
  isActive: boolean;
  onNextSlide: () => void;
}

export default function IntroSection({
  isActive,
  onNextSlide,
}: IntroSectionProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-32 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-white text-center max-w-4xl px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: isActive ? 0 : -50, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-14"
          >
            간편한 배포 서비스
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: isActive ? 0 : 50, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-base md:text-lg lg:text-xl mb-12"
          >
            가난한.. 개발자들 모여라.. 우리에겐 Ttalkak이 있는데 AWS? Lamda?
            그게 왜 필요하죠? 우리에겐 Ttalkak이 있는데 도커 파일을 내가 어떻게
            써..? 소스코드 기반 도커 파일 생성과 배포 깃허브 기반으로 Project를
            배포 프론트 엔드만 배포하기 아쉽지 않나요 백엔드와 DB 까지? 주니어
            개발자들을 위한 서비스 도메인 구매하기 비싸지 않나요? 도메인
            자동생성 프로젝트 배포 원스톱 서비스 Ttalkak 버려진 프로젝트 클릭
            몇번으로 살려보세요 언제까지 프로젝트하고 버릴래?
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
            transition={{ duration: 1, delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log("dddd")}
            className="bg-white text-blue-600 font-bold mb-20 py-3 px-8 rounded-full text-lg hover:bg-blue-100 transition duration-300 cursor-pointer"
          >
            여기는 내일 수정 ㄱ
          </motion.button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
        transition={{ duration: 1, delay: 2 }}
        className="animate-bounce"
      >
        <motion.button
          onClick={onNextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white cursor-pointer bg-opacity-20 p-4 rounded-full text-white hover:bg-opacity-30 transition-all duration-300"
          aria-label="다음 섹션으로 이동"
        >
          <ImArrowDown2 size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
}
