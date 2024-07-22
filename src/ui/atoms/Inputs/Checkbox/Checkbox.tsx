import React from "react";
import classNames from "classnames";
import { genUniqueNumber } from "../../../../../helpers";

interface CheckboxProps extends React.ComponentProps<"input"> {}

export function Checkbox(props: CheckboxProps) {
  const { children, disabled = false, id = genUniqueNumber(4), className, ...rest } = props;

  const containerStyle = classNames(
    "flex  min-h-[1.5rem] min-w-[1.5rem] h-[1.5rem] w-[1.5rem] border-solid border-[2px] border-gray-200 rounded-full overflow-hidden",
    "has-[:checked]:border-blue-600",
    {
      "has-[:checked]:border-blue-200  pointer-events-none bg-blue-50": disabled,
    },
  );

  const labelStyle = classNames(
    "flex items-center justify-center h-full w-full has-[:checked]:bg-blue-600 text-white",
    { "has-[:checked]:bg-blue-200 bg-blue-50": disabled },
  );

  return (
    <div className={containerStyle}>
      <label htmlFor={id} className={labelStyle}>
        <input type={"checkbox"} className={"hidden group peer"} id={id} disabled={disabled} {...rest} />
        <svg
          width="13"
          height="9"
          viewBox="0 0 13 9"
          fill="none"
          className={"hidden peer-checked:flex"}
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.64282 4.28571L5.2864 7.92929C5.32545 7.96834 5.38877 7.96834 5.42782 7.92929L11.8571 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </label>
    </div>
  );
}
