"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1]);

  useEffect(() => {
    const updateVideoProgress = () => {
      if (videoRef.current) {
        const progress = scrollYProgress.get();
        videoRef.current.currentTime = progress * videoRef.current.duration;
      }
    };

    const unsubscribe = scrollYProgress.onChange(updateVideoProgress);
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="-my-10">
      <section className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">
          Welcome to Our Site
        </h1>
      </section>

      <motion.section
        className="relative h-screen overflow-hidden"
        style={{ opacity }}
      >
        <motion.video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/ai.mp4"
          style={{ scale }}
          muted
          playsInline
        />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h2 className="text-5xl font-semibold text-white">
            Discover Our Story
          </h2>
        </div>
      </motion.section>

      <section className="h-screen flex items-center justify-center bg-gray-200">
        <h2 className="text-4xl font-semibold text-gray-800">
          More Content Here
        </h2>
      </section>
    </div>
  );
}
