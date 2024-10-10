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
    <div className="w-full h-full flex flex-col items-center justify-between py-40 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-white text-center max-w-4xl px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: isActive ? 0 : -50, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            배포의 모든 것
          </motion.h1>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: isActive ? 0 : -50, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-14"
          >
            딸깍에서 쉽고 간편하게
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: isActive ? 0 : 50, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-base md:text-lg lg:text-xl mb-12"
          >
            언제까지 프로젝트 버릴래?
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
            시작하기
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
