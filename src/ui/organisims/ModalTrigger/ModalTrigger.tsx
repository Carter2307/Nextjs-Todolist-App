import React from "react";
import classNames from "classnames";
import * as RadixDialog from "@radix-ui/react-dialog";
import {Overlay} from "@ui/atoms/Overlay/Overlay";
import {ModalBody, ModalFooter, ModalHeader} from "@ui/organisims/Modal/Modal";
import {PlusIcon} from "lucide-react";

interface ModalTriggerProps extends React.ComponentProps<"button"> {
  title: string
  onOk: CallableFunction
}

export function ModalTrigger(props: ModalTriggerProps) {
  const {children, title, onOk, className, ...rest} = props;
  const cn = classNames(className);
  const [open, setOpen] = React.useState(false)

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>

      <RadixDialog.Trigger asChild>
        <button
          className={classNames("rounded-full h-16 w-16 bg-blue-600 text-white flex items-center justify-center", className)}
          {...rest}>
          <PlusIcon size={20}/>
        </button>
      </RadixDialog.Trigger>

      <RadixDialog.Portal>
        <Overlay/>
        <RadixDialog.Content>
          <RadixDialog.Title>Ajouter une tâche</RadixDialog.Title>
          <div
            className={
              "w-full max-w-[30rem] border-solid border-[1px] border-gray-200 bg-white z-10 rounded-2xl shadow-modal"
            }>

            <ModalHeader title={title} onClose={() => setOpen(false)}/>

            <ModalBody>{children}</ModalBody>

            <ModalFooter>
              <button
                type={"button"}
                onClick={() => setOpen(false)}
                className={"p-4 flex items-center justify-center w-full h-14 border-solid border-r-[.25px] border-gray-200"}
              >{"Annuler"}</button>

              <RadixDialog.Close
                type={"button"}
                className={"p-4 flex items-center text-blue-600 justify-center w-full h-12 border-solid border-l-[.25px] border-gray-200"}
                onClick={() => onOk()}
              >Ajouter</RadixDialog.Close>

            </ModalFooter>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}