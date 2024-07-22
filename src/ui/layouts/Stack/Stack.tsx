import React from "react";

type StackAlignValue =
  | "top-left"
  | "center-left"
  | "bottom-left"
  | "top-center"
  | "center"
  | "bottom-center"
  | "right-top"
  | "right-center"
  | "right-bottom";

interface StackProps {
  direction: "col" | "row" | "auto";
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end" | "space-between" | "space-arround" | "space-evenly";
  gapx?: number;
  gapy?: number;
  px?: number;
  py?: number;
  children?: React.ReactNode | React.ReactNode[];
}

const AlignTailWindStyle = {
  col: {
    "top-left": { alignItems: "start", justifyContent: "start" },
    "center-left": { alignItems: "start", justifyContent: "center" },
    "bottom-left": { alignItems: "start", justifyContent: "end" },
    "top-center": { alignItems: "center", justifyContent: "start" },
    center: { alignItems: "center", justifyContent: "center" },
    "bottom-center": { alignItems: "center", justifyContent: "end" },
    "right-top": { alignItems: "start", justifyContent: "start" },
    "right-center": { alignItems: "end", justifyContent: "center" },
    "right-bottom": { alignItems: "end", justifyContent: "end" },
  },
  row: {
    "top-left": { alignItems: "start", justifyContent: "start" },
    "center-left": { alignItems: "center", justifyContent: "start" },
    "bottom-left": { alignItems: "end", justifyContent: "start" },
    "top-center": { alignItems: "start", justifyContent: "center" },
    center: { alignItems: "center", justifyContent: "center" },
    "bottom-center": { alignItems: "end", justifyContent: "center" },
    "right-top": { alignItems: "start", justifyContent: "end" },
    "right-center": { alignItems: "center", justifyContent: "end" },
    "right-bottom": { alignItems: "end", justifyContent: "end" },
  },

  auto: {
    wrap: { flexWrap: "wrap" },
  },
};

export const Stack: React.FC<StackProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, ...rest } = props;

  switch (props.direction) {
    case "col":
      return <VerticalStack props={props} />;
    case "row":
      return <HorizontalStack props={props} />;
    default:
      return <div className={`flex ${className ?? className}`} {...rest}></div>;
  }
};

const VerticalStack: React.FC<{
  props: StackProps & React.HTMLAttributes<HTMLDivElement>;
}> = ({ props }) => {
  let style: React.CSSProperties = {};
  const { className, ...rest } = props;

  if (props.align) {
    style.alignItems = props.align;
  }

  if (props.justify) {
    style.justifyContent = props.justify;
  }

  style.rowGap = props.gapy || 0;
  style.columnGap = props.gapx || 0;

  return (
    <div className={`flex flex-col ${className ?? className}`} style={{ ...style }} {...rest}>
      {props.children}
    </div>
  );
};

const HorizontalStack: React.FC<{
  props: StackProps & React.HTMLAttributes<HTMLDivElement>;
}> = ({ props }) => {
  let style: React.CSSProperties = {};
  const { className, ...rest } = props;

  if (props.align) {
    style.alignItems = props.align;
  }

  if (props.justify) {
    style.justifyContent = props.justify;
  }

  style.rowGap = props.gapx || 0;
  style.columnGap = props.gapy || 0;

  return (
    <div className={`flex flex-row ${className ?? className}`} style={{ ...style }} {...rest}>
      {props.children}
    </div>
  );
};
