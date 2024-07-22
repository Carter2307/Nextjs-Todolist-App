import React, {forwardRef, ReactElement, ReactNode} from "react";
import classNames from "classnames";
import {Stack} from "@ui/layouts/Stack/Stack";
import {Text} from "@ui/atoms/Text/Text";
import {Overlay} from "@ui/atoms/Overlay/Overlay";
import {Heading} from "@ui/atoms/Heading/Heading";

type ObserverEvent = { data: any; name: "CREATE" | "UPDATE" };

//State
class Observer {
  subscriber: CallableFunction[] = [];
  alertdata: AlertOptions[] = [];

  constructor() {
    this.subscriber = [];
    this.alertdata = [];
  }

  subscribe = (sub: CallableFunction) => {
    this.subscriber.push(sub);
  };

  unsubscribe = (subscriber: any) => {
    this.subscriber = this.subscriber.filter((item) => item !== subscriber);
  };

  notify = (event: ObserverEvent) => {
    if (event.name === "CREATE") {
      const modifyData = {
        ...event.data,
        id: Date.now(),
      };
      this.alertdata = [...this.alertdata, modifyData];
      this.subscriber.forEach((sub: CallableFunction) => sub({data: modifyData, name: event.name}));
    } else {
      this.subscriber.forEach((sub: CallableFunction) => sub({data: null, name: event.name}));
    }
  };

  delete = (id: number) => {
    this.alertdata = this.alertdata.filter((item) => item.id !== id);
    this.notify({data: null, name: "UPDATE"});
  };
}

const observer = new Observer();

interface AlertRootProps {
}

const AlertContext = React.createContext({
  dismiss: (id: number) => {
  },
  update: () => {
  },
});

export function Root(props: AlertRootProps) {
  const {...rest} = props;
  const store = observer.alertdata;
  const [alertOptions, setAlertOptions] = React.useState<AlertOptions[]>(store);

  function dismiss(id: number) {
    if (id) observer.delete(id);
  }

  React.useEffect(() => {
    const subscription = (event: ObserverEvent) => {
      if (event.name === "CREATE" || event.name == "UPDATE") {
        const arr = [...observer.alertdata];
        console.log(arr);
        setAlertOptions(arr);
      }
    };
    observer.subscribe(subscription);

    return () => {
      observer.unsubscribe(subscription);
    };
  }, []);

  return (
    <AlertContext.Provider
      value={{
        update: () => {
        },
        dismiss,
      }}>
      <ul {...rest}>
        {alertOptions &&
          alertOptions.map((item, index) => {
            return (
              <AlertElement
                key={item.id}
                alertContent={item.content}
                action={item?.action}
                index={index}
                id={item.id?.toString()}
                title={item.title}
              />
            );
          })}
      </ul>
    </AlertContext.Provider>
  );
}

interface AlertOptions {
  title?: string
  content: string | React.ReactElement;
  action?: (dismiss: CallableFunction, id: number, e: MouseEvent) => void | ReactElement;
  id?: number;
}

interface AlertElementProps extends React.ComponentProps<"li"> {
  alertContent: string | React.ReactElement;
  action?: (dismiss: CallableFunction, id: number, e: MouseEvent) => void | ReactElement;
  index: number;
  id?: string;
}

const AlertElement = (props: AlertElementProps) => {
  const {alertContent, title, action, index, id, ...rest} = props;
  const {dismiss} = React.useContext(AlertContext);
  const identifier = parseInt(id ? id : "");
  const [ActionButton, setActionButton] = React.useState(
    <button className={"p-4 flex items-center text-red-600 justify-center w-full h-12 border-solid border-l-[.25px] border-gray-200"}
            onClick={() => dismiss(identifier)}>Confirmer</button>,
  );

  /*React.useEffect(() => {
    const intervalId = window.setTimeout(() => dismiss(identifier), 8000 + index * 1000);

    return () => {
      window.clearTimeout(intervalId);
    };
  }, []);*/

  React.useEffect(() => {
    if (React.isValidElement(action)) {
      setActionButton(action);
    } else {
      setActionButton(
        React.cloneElement(ActionButton, {
          onClick: (e: MouseEvent) => {
            if (action) action(dismiss, identifier, e);
          },
        }),
      );
    }
  }, []);

  return (
    <li className={"absolute left-0 top-0 bottom-0 right-0 flex items-center justify-center"} {...rest}>
      <Overlay className={"z-10"} onClick={() => dismiss(identifier)}/>
      <div className={"w-full max-w-96 rounded-2xl backdrop-blur-sm z-20"} style={{backgroundColor: "rgba(255, 255, 255, .8)"}}>
        {/*ALERT BODY*/}
        <div className={"p-6 text-gray-800 space-y-2 flex flex-col items-center justify-center text-center"}>
          {title && <Heading level={3} size={"sm"}>{title}</Heading>}
          <Text size={"sm"}>{alertContent}</Text>
        </div>

        {/*ALERT FOOTER*/}
        <div className={"flex items-center border-solid border-gray-200 border-t-[1px]"}>
          <button
            className={"p-4 flex items-center justify-center w-full h-14 border-solid border-r-[.25px] border-gray-200"}
            onClick={() => dismiss(identifier)}>Annuler
          </button>
          {ActionButton}
        </div>
      </div>
    </li>
  );
};

export function open(options: AlertOptions) {
  const data = Object.assign(
    {
      content: "Alert content",
    },
    options,
  );

  observer.notify({name: "CREATE", data: data});
}

