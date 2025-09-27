'use client';
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({
  children,
  parentClassName,
  childClassName,
  topRightCircleClassName = 'right-11',
  bottomLeftCircleClassName = 'left-11',
}: {
  children: React.ReactNode;
  parentClassName?: string;
  childClassName?: string;
  topRightCircleClassName?: string;
  bottomLeftCircleClassName?: string;
}) => {
  return (
    <div className={`relative  rounded-2xl overflow-hidden ${parentClassName}`}>
      <div
        className={`w-full h-full p-3 backdrop-blur-2xl relative z-20 bg-main-container/93 ${childClassName}`}
      >
        {children}
      </div>

      {/* Top Right Circle */}
      <motion.div
        className={`size-48 rounded-full bg-[#4AB0F5] absolute top-0  ${topRightCircleClassName}`}
        // animate={{
        //   x: [0, 150, 0],
        //   y: [0, -150, 0],
        //   scale: [1, 1.1, 1],
        // }}
        // transition={{
        //   duration: 6,
        //   repeat: Infinity,
        //   ease: 'easeInOut',
        // }}
      />

      {/* Bottom Left Circle */}
      <motion.div
        className={`size-48 rounded-full bg-[#FFE500] absolute bottom-0  ${bottomLeftCircleClassName}`}
        // animate={{
        //   x: [0, -150, 0],
        //   y: [0, 150, 0],
        //   scale: [1, 1.1, 1],
        // }}
        // transition={{
        //   duration: 6,
        //   repeat: Infinity,
        //   ease: 'easeInOut',
        //   delay: 1.5,
        // }}
      />
    </div>
  );
};

export default AnimatedCard;
