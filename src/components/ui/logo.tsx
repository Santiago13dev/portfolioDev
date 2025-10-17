"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string;
}

export function Logo({ className = "w-16", href }: LogoProps) {
  return href ? (
    <Link href={href}>
      <div className={cn("font-incognito text-2xl font-bold", className)}>
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-primary"
        >
          K
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          R
        </motion.span>
      </div>
    </Link>
  ) : (
    <div className={cn("font-incognito text-2xl font-bold", className)}>
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-primary"
      >
        K
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        R
      </motion.span>
    </div>
  );
}
