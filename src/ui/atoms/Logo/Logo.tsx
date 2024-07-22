import React from "react";
import classNames from "classnames";

interface LogoProps extends React.ComponentProps<"div"> {}

export function Logo(props: LogoProps) {
  const { children, className, ...rest } = props;
  const cn = classNames(className);

  return (
    <div
      className={cn}
      {...rest}
    >
      {children}
    </div>
  );
}