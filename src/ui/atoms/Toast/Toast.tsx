import React, { ReactElement, ReactNode, useRef } from "react";
import { X } from "lucide-react";
import * as ToastIcons from "./assets";
import classNames from "classnames";
import "./Toast.css";

//TYPE
type toastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
type toastContent = string | ReactNode;

type toastStyle = "info" | "warning" | "error" | "success";

interface ToastProps {
  onAction?: () => void;
  onClose?: () => void;
  closeAction?: boolean;
  style?: toastStyle; // Default info
  sideOffset?: number; // Default 32px
  duration?: number; // Default: 3000
  position: toastPosition; // Default "top-right"
  dismissible?: boolean; // Default true
  id?: number;
  title?: string;
  description: string;
}

//STATE
class Observer {
  subscriber: CallableFunction[];
  toast: ToastProps[];

  constructor() {
    this.subscriber = [];
    this.toast = [];
  }

  subscribe = (subscriber: CallableFunction) => {
    this.subscriber.push(subscriber);
  };

  publish = (data: ToastProps) => {
    this.toast.push(data);
    this.subscriber.forEach((subscriber) => subscriber(data));
  };
}

//FUNCTIONS
const toastState = new Observer();

export function Toast() {
  const [toast, setToast] = React.useState<ToastProps[]>([]);
  const [toastId, setToastId] = React.useState(0);
  const [currentToast, setCurrentToast] = React.useState<ToastProps>();
  const currentToastRef = useRef<HTMLLIElement>(null);
  const [toastPosition, setToastPosition] = React.useState<{
    x: string;
    y: string;
  }>();
  const toastIcon = ToastIcons.ToastIconInfo;

  React.useEffect(() => {
    toastState.subscribe((data: ToastProps) => {
      data.id = toastId;
      const arr = [...toast, data];
      setToast(arr);
      setToastId(arr.length - 1);
      setCurrentToast(data);
    });
  }, [toastState.toast, toast, toastState.subscribe]);

  React.useEffect(() => {
    if (!currentToast || !currentToastRef.current) return;

    const toast = currentToastRef.current;
    let [x, y] = currentToast.position.split("-");
    let leftOrCenterDist = currentToast.sideOffset + "px";
    setToastPosition({ x, y });

    if (y === "center") {
      y = "left";
      leftOrCenterDist = `calc(50% - ${toast.getBoundingClientRect().width / 2}px)`;
    }

    toast.style[x] = currentToast.sideOffset + "px";
    toast.style.setProperty("--toast-delay", (0.4).toString() + "s");

    if (currentToast.sideOffset) {
      toast.style.setProperty(
        "--toast-sideOffset",
        currentToast.sideOffset.toString() + "px",
      );
    }

    toast.style[y] = leftOrCenterDist;
  }, [currentToast]);

  React.useEffect(() => {
    if (!currentToast || !toast) return;
    if (!currentToast.dismissible) return;

    const timeoutId = setTimeout(
      () => {
        console.log(`hide toast n°${toastId}`);
        setToast(toast.filter((e) => e.id !== toastId));
      },
      currentToast.duration * (toastId + 1),
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentToast, toastId]);

  return (
    <>
      {toast && toast.length !== 0 && (
        <section>
          <ol>
            {toast.map((t: ToastProps, index: number) => {
              return (
                <li
                  className={`toast flex flex-row items-center border-solid border-[1px] border-gray-200 justify-center fixed p-3 shadow-lg rounded-xl max-w-[26.25rem] ${style[t.style].container}`}
                  ref={currentToastRef}
                  data-id={index}
                  data-x-position={toastPosition?.x}
                  data-y-position={toastPosition?.y}
                  key={index}>
                  <div
                    className={
                      "flex flex-row gap-x-4 items-center justify-center pr-3"
                    }>
                    {t.style === "info" && (
                      <span>{ToastIcons.ToastIconInfo}</span>
                    )}
                    {t.style === "success" && (
                      <span>{ToastIcons.ToastIconSucess}</span>
                    )}
                    {t.style === "error" && (
                      <span>{ToastIcons.ToastIconError}</span>
                    )}
                    {t.style === "warning" && (
                      <span>{ToastIcons.ToastIconWarning}</span>
                    )}
                    <div className={"flex flex-col"}>
                      <h4
                        className={`text-sm font-semibold text-gray-800 w-full ${style[t.style].title}`}>
                        {t.title}
                      </h4>
                      <p className={"w-full text-gray-700 text-sm"}>
                        {t.description}
                      </p>
                    </div>
                  </div>
                  <button
                    type={"button"}
                    className={"text-slate-700"}
                    onClick={() => {
                      setToast(toast.filter((e) => e.id !== t.id));
                    }}>
                    <X size={20} />
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      )}
    </>
  );
}

export function open(options?: ToastProps) {
  const mergedOptions: ToastProps = Object.assign(
    {
      closeAction: false,
      sideOffset: 32,
      duration: 5000,
      position: "top-right", // Default "top-right"
      dismissible: true, // Default true
      style: "info",
      title: "Info",
      description: "Description of wat happen",
    },
    options,
  );

  toastState.publish(mergedOptions);
}
const style = {
  info: {
    container: classNames("bg-white"),
    title: classNames(""),
  },
  warning: {
    container: classNames("bg-amber-50"),
    title: classNames("text-amber-700"),
  },
  error: {
    container: classNames("bg-red-50"),
    title: classNames("text-red-700"),
  },
  success: {
    container: classNames("bg-green-50"),
    title: classNames("text-green-700"),
  },
};
