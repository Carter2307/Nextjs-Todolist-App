import React from "react";
import classNames from "classnames";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: number;
  size?: "xs" | "sm" | "md" | "xl" | "2xl" | "lg";
}

export function Heading(props: HeadingProps) {
  const { children, level = 3, size = "xs", className, ...rest } = props;
  const cn = classNames(
    "text-gray-900",
    className,
    { "text-base": size === "xs" },
    { "text-lg": size === "sm" },
    { "text-2xl": size === "md" },
    { "text-4xl": size === "xl" },
    { "text-5xl": size === "2xl" },
    { "text-6xl": size === "lg" },
  );

  switch (level) {
    case 1:
      return (
        <h1 className={cn} {...rest}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={cn} {...rest}>
          {children}
        </h2>
      );
    case 4:
      return (
        <h4 className={cn} {...rest}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={cn} {...rest}>
          {children}
        </h5>
      );
    default:
      return (
        <h3 className={cn} {...rest}>
          {children}
        </h3>
      );
  }
}
