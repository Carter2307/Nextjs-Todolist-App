import React from "react";
import classNames from "classnames";
import {SearchIcon} from "lucide-react";

interface SearchProps extends React.ComponentProps<"input"> {}

export function Search(props: SearchProps) {
  const { children, className, ...rest } = props;
  const cn = classNames("flex flex-row items-center h-10 min-h-10  rounded-xl bg-gray-100 ring-blue-600 ring-offset-2",
    "focus-within:ring-2",
    className);

  return (
    <div
      className={cn}>
      <label htmlFor={"search"} className={"h-full text-gray-500 w-10 flex items-center justify-center"}>
        <SearchIcon size={18}/>
      </label>
      <input type={"text"} placeholder={"Rechercher..."} id={"search"} className={"h-full bg-transparent text-sm grow"}  {...rest}/>
    </div>
  );
}