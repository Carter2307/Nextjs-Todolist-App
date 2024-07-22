import React, { ReactElement } from "react";
import classNames from "classnames";
import { Overlay } from "@ui/atoms/Overlay/Overlay";
import { ButtonIcon } from "@ui/atoms/ButtonIcon/ButtonIcon";
import { XIcon } from "lucide-react";

class ModalObserver {
  subscribers: CallableFunction[] = [];

  constructor() {
    this.subscribers = [];
  }

  notify = (props: ModalProps) => {
    this.subscribers.forEach((sub) => sub(props));
  };

  subscribe = (sub: CallableFunction) => {
    this.subscribers.push(sub);
  };

  unsubscribe = (sub: CallableFunction) => {
    this.subscribers = this.subscribers.filter((s) => s !== sub);
  };
}

const modalObserver = new ModalObserver();

type ModalContextProps = {
  close: () => void;
  onAction: () => void;
};
export const Context = React.createContext<ModalContextProps>({
  close: () => {},
  onAction: () => {},
});

export function Root(props: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [option, setOption] = React.useState<ModalProps>({
    title: "Modal title",
    content: "Modal content",
    okAction: {
      label: "Confirm action",
      handler: () => window.alert("Clicked on Confirmation action button"),
    },
    cancelAction: {
      label: "Cancel",
      handler: () => window.alert("Clicked on Cancel action button"),
    },
  });

  const close = () => setOpen(false);
  const onOk = () => {};

  React.useEffect(() => {
    const subscriber = (o: ModalProps) => {
      console.log(o)
      setOption(o);
      setOpen(true);
    };

    modalObserver.subscribe(subscriber);
    return () => {
      modalObserver.unsubscribe(subscriber);
    };
  }, []);

  return (
    <Context.Provider value={{ close, onAction: onOk }}>
      {open && (
        <div className={"absolute left-0 top-0 bottom-0 right-0 flex items-center justify-center"}>
          <Overlay className={"z-0"} />
          <ModalElement
            title={option.title}
            content={option.content}
            okAction={option.okAction}
            cancelAction={option?.cancelAction}
          />
        </div>
      )}
    </Context.Provider>
  );
}

function ModalElement(props: ModalProps) {
  const { close } = React.useContext(Context);

  return (
    <div
      className={
        "w-full max-w-[30rem] border-solid border-[1px] border-gray-200 bg-white z-10 rounded-2xl shadow-modal"
      }>
      <ModalHeader title={props.title}/>
      <ModalBody>{props.content}</ModalBody>
      <ModalFooter>
        <button
          type={"button"}
          onClick={() => {
            if (props.cancelAction?.handler) {
              props.cancelAction.handler(close);
            } else {
              close();
            }
          }}
          className={"p-4 flex items-center justify-center w-full h-14 border-solid border-r-[.25px] border-gray-200"}
        >{props.cancelAction?.label || "Annuler"}</button>
        <button
          type={"button"}
          className={"p-4 flex items-center text-blue-600 justify-center w-full h-12 border-solid border-l-[.25px] border-gray-200"}
          onClick={() => {
            props.okAction.handler?.(close);
          }}
        >{props.okAction?.label || "Ajouter"}</button>
      </ModalFooter>
    </div>
  );
}

export function ModalHeader(props: {title: string, onClose: CallableFunction}) {
  return (
    <header className={"h-12 flex items-center justify-between px-4"}>
      <h3 className={"text-sm font-medium text-gray-800"}>{props.title}</h3>
      <ButtonIcon onClick={() => onclose} icon={<XIcon />} variant={"ghost"} size={"md"} />
    </header>
  );
}

export function ModalBody(props: React.ComponentProps<"div">) {
  return <div className={"p-6 border-solid border-t-[1px] border-b-[1px] border-gray-200"}>{props.children}</div>;
}

export function ModalFooter(props: React.ComponentProps<"footer">) {
  return <footer className={"flex items-center"}>{props.children}</footer>;
}

type ModalActionProps = {
  label: string;
  handler?: (close: CallableFunction) => void;
};

export interface ModalProps {
  title: string;
  content: string | ReactElement;
  cancelAction?: ModalActionProps;
  okAction: ModalActionProps;
}

export function openModal(props: ModalProps) {
  const m: ModalProps = Object.assign(
    {
      title: "Modal title",
      content: "Modal content",
      okAction: {
        label: "Confirm action",
        handler: () => window.alert("Clicked on Confirmation action button"),
      },
    },
    props,
  );
  modalObserver.notify(m);
}
