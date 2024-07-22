import React from "react";
import classNames from "classnames";
import {Text} from "@ui/atoms/Text/Text";
import {Stack} from "@ui/layouts/Stack/Stack";
import {Checkbox} from "@ui/atoms/Inputs/Checkbox/Checkbox";
import {AppContext} from "@/context/context";

interface CardProps extends React.ComponentProps<"div"> {
  task: Task
}

export function Card(props: CardProps) {
  const {setCompleted} = React.useContext(AppContext)
  const {task, className, ...rest} = props;
  const [checked, setChecked] = React.useState(task.completed)
  const cn = classNames("rounded-xl bg-white mr-2 shadow-sm border-solid border-[1px] border-gray-200",
    className);

  const date = new Date(task.createAt);
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div
      className={cn}
      {...rest}
      style={{opacity: `${checked ? .5 : 1}`}}
    >

      <Stack direction={"row"} gapy={12} align={"center"} className={"p-4 select-none"}>
        <Checkbox defaultChecked={task.completed} onChange={(e) => {
          const val = e.currentTarget.checked
          setChecked(val);
          setCompleted(task.id, val);
        }}/>
        <Text className={"max-w-[360px] grow-1 text-left select-none"}
              style={{textDecorationLine: `${checked ? "line-through" : ""}`}}>{task.description}</Text>


        <Text className={"hidden text-gray-400 px-4 py-1 rounded-[4px] bg-gray-100 ml-auto sm:inline-block"} size={"xs"}>
          {date.toLocaleDateString(undefined, dateOptions).toLowerCase().capitalizeFirstLetter()}
        </Text>

      </Stack>

      <div className={" sm:hidden flex justify-end p-2 border-solid border-gray-200 border-t-[1px]"}>
        <Text className={"text-gray-400 px-4 py-1 rounded-[4px] bg-gray-100"} size={"xs"}>
          {date.toLocaleDateString(undefined, dateOptions).toLowerCase().capitalizeFirstLetter()}
        </Text>
      </div>
    </div>
  );
}