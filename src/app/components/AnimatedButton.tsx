"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./AnimatedButton.module.css";

interface AnimatedButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function AnimatedButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  fullWidth = false,
  icon,
  iconPosition = "left",
}: AnimatedButtonProps) {
  const buttonClasses = `
    ${styles.button} 
    ${styles[variant]} 
    ${styles[size]} 
    ${fullWidth ? styles.fullWidth : ""} 
    ${className}
  `;

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </>
  );

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.03 },
    whileTap: disabled ? {} : { scale: 0.97 },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <motion.div className={styles.buttonContainer} {...motionProps}>
        <Link
          href={href}
          className={buttonClasses}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
