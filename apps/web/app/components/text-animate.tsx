"use client";

import { motion, Variants, HTMLMotionProps } from "motion/react";
import React from "react";

type AnimationType =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

type AnimationBy = "text" | "word" | "character" | "line";

interface TextAnimateProps extends Omit<HTMLMotionProps<"span">, "children"> {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: React.ElementType;
  by?: AnimationBy;
  startOnView?: boolean;
  once?: boolean;
  animation?: AnimationType;
}

const defaultVariants: Record<AnimationType, { container: Variants; item: Variants }> = {
  fadeIn: {
    container: {
      hidden: { opacity: 0 },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.3 } },
    },
  },
  blurIn: {
    container: {
      hidden: { opacity: 0 },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.3 } },
    },
  },
  blurInUp: {
    container: {
      hidden: { opacity: 0 },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
    },
  },
  blurInDown: {
    container: {
      hidden: { opacity: 0 },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, y: -20, filter: "blur(10px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
    },
  },
  slideUp: {
    container: {
      hidden: { opacity: 0 },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    },
  },
  slideDown: {
    container: {
      hidden: { opacity: 0 },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, y: -20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    },
  },
  slideLeft: {
    container: {
      hidden: { opacity: 0 },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, x: 20 },
      show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    },
  },
  slideRight: {
    container: {
      hidden: { opacity: 0 },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, x: -20 },
      show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    },
  },
  scaleUp: {
    container: {
      hidden: { opacity: 0 },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, scale: 0.8 },
      show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    },
  },
  scaleDown: {
    container: {
      hidden: { opacity: 0 },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, scale: 1.2 },
      show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    },
  },
};

export function TextAnimate({
  children,
  className,
  delay = 0,
  duration,
  as: Component = "span",
  by = "word",
  startOnView = true,
  once = true,
  animation = "fadeIn",
  ...props
}: TextAnimateProps) {
  const selectedVariants = defaultVariants[animation] || defaultVariants.fadeIn;

  let segments: string[] = [];
  if (by === "word") {
    segments = children.split(" ");
  } else if (by === "character") {
    segments = children.split("");
  } else if (by === "line") {
    segments = children.split("\n");
  } else {
    segments = [children];
  }

  const MotionComponent = motion.create(Component as keyof React.JSX.IntrinsicElements);

  return (
    <MotionComponent
      initial="hidden"
      whileInView={startOnView ? "show" : undefined}
      animate={!startOnView ? "show" : undefined}
      viewport={{ once }}
      className={className}
      variants={{
        hidden: selectedVariants.container.hidden,
        show: {
          opacity: 1,
          transition: {
            staggerChildren: duration ? duration / segments.length : 0.03,
            delayChildren: delay,
          },
        },
      }}
      {...props}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          variants={selectedVariants.item}
          style={{ display: "inline-block", whitespace: "pre" }}
        >
          {segment}
          {by === "word" && index < segments.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
