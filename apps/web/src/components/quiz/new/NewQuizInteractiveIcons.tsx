'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { FaHeart, FaLightbulb } from "react-icons/fa6";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";

const icons = [
  { id: 'heart', Component: FaHeart },
  { id: 'dollar', Component: PiCurrencyCircleDollarFill },
  { id: 'lightbulb', Component: FaLightbulb },
  { id: 'thumbs', Component: BsFillHandThumbsUpFill },
  { id: 'smile', Component: MdEmojiEmotions },
];

interface AnimationIcon {
  id: number;
  Icon: any;
  containerIndex: number;
}

export default function NewQuizInteractiveIcons({ color }: { color: `#${string}` | undefined }) {
  const [animatingIcons, setAnimatingIcons] = useState<AnimationIcon[]>([]);

  function createAnimation(Icon: any, containerIndex: number) {
    const newIcon = {
      id: Date.now() + Math.random(),
      Icon,
      containerIndex,
    };
    setAnimatingIcons(prev => [...prev, newIcon]);

    setTimeout(() => {
      setAnimatingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
    }, 2200);
  }

  return (
    <div className="flex items-center justify-end gap-x-4">
      {icons.map(({ id, Component }, index) => (
        <div key={id} className="relative w-fit h-fit overflow-visible">
          <Component
            onClick={() => createAnimation(Component, index)}
            style={{ backgroundColor: `${color}FF` }}
            size={30}
            className="border-[1px] dark:border-neutral-600 border-neutral-300 p-2 rounded-full transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md cursor-pointer"
          />

          {/* AnimatePresence per icon container */}
          <AnimatePresence>
            {animatingIcons
              .filter(icon => icon.containerIndex === index)
              .map(({ id, Icon }) => (
                <motion.div
                  key={id}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  initial={{ opacity: 1, y: 0, x: "-50%", scale: 1, rotate: 0 }}
                  animate={{
                    opacity: 0,
                    y: -160 - Math.random() * 200,
                    x: "-50%",
                    scale: 1 + Math.random(),
                    rotate: Math.random() * 30 - 15,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2.2,
                    ease: [0.23, 1, 0.32, 1],
                    opacity: { duration: 2.2, ease: "easeOut" },
                    rotate: {
                      duration: 0.3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                >
                  <Icon size={22} className="text-[#ff0033] drop-shadow-lg" />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
