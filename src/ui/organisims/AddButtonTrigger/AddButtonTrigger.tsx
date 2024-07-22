import React from "react";
import {PlusIcon} from "lucide-react";
import classNames from "classnames";
import * as Modal from "@ui/organisims/Modal/Modal";
import {Stack} from "@ui/layouts/Stack/Stack";

interface AddButtonTriggerProps extends React.ComponentProps<"button"> {
}

export const ModalContent = () => {
  const [desc, setDesc] = React.useState('');

  return <Stack direction={"col"} gapy={4}>
   {/* <label className={"text-sm text-gray-700"}>Tâche</label>*/}
    <input
      type={"text"}
      className={"px-4 py-4 rounded-xl bg-gray-100 text-sm"}
      placeholder={"Go to grocery..."}
      onChange={(e) => setDesc(e.currentTarget.value)}
    />
  </Stack>
};

export function AddButtonTrigger(props: AddButtonTriggerProps) {
  const {className, ...rest} = props;

  const openModal = () => {
    Modal.openModal({
      title: "Ajouter une tâche",
      content: <ModalContent />,
      okAction: {
        label: "Ajouter",
        handler: function (dismiss) {
          console.log();
          //dismiss();
        },
      },
    });
  };

  return (
    <button
      className={classNames("rounded-full h-16 w-16 bg-blue-600 text-white flex items-center justify-center", className)}
      {...rest}
      onClick={openModal}>
      <PlusIcon size={20}/>
    </button>
  );
}