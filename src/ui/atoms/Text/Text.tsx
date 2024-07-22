import React from "react";
import classNames from "classnames";

interface TextProps extends React.ComponentProps<"p"> {
  size?: "xs" | "sm" | "md" | "xl" | "2xl" | "lg";
}

export function Text(props: TextProps) {
  const { children, className,size="sm", ...rest } = props;
  const cn = classNames("text-gray-600",
    { "text-xs": size === "xs" },
    { "text-sm": size === "sm" },
    { "text-base": size === "md" },
    { "text-lg": size === "xl" },
    { "text-xl": size === "2xl" },
    { "text-2xl": size === "lg" },
    className);

  return (
    <p className={cn} {...rest}>
      {children}
    </p>
  );
}
