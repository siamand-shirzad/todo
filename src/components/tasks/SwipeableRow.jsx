import * as React from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Edit, Trash } from 'lucide-react';

export function SwipeableRow({ children, onSwipeLeft, onSwipeRight }) {
  const controls = useAnimation();
  const x = useMotionValue(0);

  const bgStyle = useTransform(
    x,
    [-100, 0, 100],
    ['rgba(239, 68, 68, 1)', 'rgba(255,255,255,0)', 'rgba(59, 130, 246, 1)']
  );

  const handleDragEnd = async (event, info) => {
    const offset = info.offset.x;
    const threshold = 100;

    if (offset > threshold) {
      await controls.start({ x: 0 });
      onSwipeRight();
    } else if (offset < -threshold) {
      await controls.start({ x: -500, transition: { duration: 0.2 } });
      onSwipeLeft();
      await controls.start({ x: 0 });
    }else{
      await controls.start({ x: 0 });
    } 
  };

  return (
    <div className="relative w-full mb-3 group/swipe">
      {/* Background Layer: Action Icons */}
      <motion.div
        style={{ backgroundColor: bgStyle }}
        className="absolute inset-0 rounded-xl flex items-center justify-between px-6 z-0">
        {/* Left Icon (Visible when swiping right) */}
        <div className="flex items-center gap-2 text-white font-bold">
          <Edit className="w-6 h-6" />
          <span className="text-sm">Edit</span>
        </div>

        {/* Right Icon (Visible when swiping left) */}
        <div className="flex items-center gap-2 text-white font-bold">
          <span className="text-sm">Delete</span>
          <Trash className="w-6 h-6" />
        </div>
      </motion.div>

      {/* Foreground Layer: Draggable Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        className="relative z-10 bg-card rounded-xl">
        {children}
      </motion.div>
    </div>
  );
}
