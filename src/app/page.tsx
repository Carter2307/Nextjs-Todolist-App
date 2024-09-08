"use client";

import { Stack } from "@ui/layouts/Stack/Stack";
import { ButtonIcon } from "@ui/atoms/ButtonIcon/ButtonIcon";
import { PlusIcon, SearchIcon, TrashIcon, XIcon } from "lucide-react";
import { Heading } from "@ui/atoms/Heading/Heading";
import { Text } from "@ui/atoms/Text/Text";
import { Search } from "@ui/atoms/Inputs/Search/Search";
import { ScrollView } from "@ui/layouts/View/View";
import { Card } from "@ui/molecules/Card/Card";
import React from "react";
import { AppContext } from "@/context/context";
import * as Dialog from "@radix-ui/react-dialog";
import { DialogOverlay } from "@radix-ui/react-dialog";
import * as Alert from "@ui/organisims/Alert/Alert";
import * as Toast from "@ui/atoms/Toast/Toast";

export default function Home() {
  const [showSearch, setShowSearch] = React.useState(true);
  const { deleteAll, add, tasks } = React.useContext(AppContext);
  const [t, setT] = React.useState(tasks);
  const [desc, setDesc] = React.useState("");
  const [filterText, setFilterText] = React.useState("");
  const scrollViewRef = React.useRef<HTMLElement>();

  React.useEffect(() => {
    setT(tasks);
  }, [tasks]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.currentTarget.value);
  };

  const handleDeleteAll = () => {
    Alert.open({
      title: "Tous supprimer ?",
      content:
        "Vous allez supprimer toutes les tâches. Cette action est irréversible.",
      action: (dismiss, id) => {
        deleteAll();
        dismiss(id);
        Toast.open({
          position: "top-right",
          description: "Toutes les tâches ont été supprimées",
          style: "success",
          title: "Success",
        });
      },
    });
  };

  return (
    <main className={"w-full h-full"}>
      <div
        className={
          "flex flex-col h-full px-6 pt-6 mx-auto space-y-6 md:w-[42.5rem]"
        }
      >
        <Stack
          direction={"row"}
          className={"pb-4 border-solid border-b-[1px] border-gray-200"}
          align={"center"}
          justify={"space-between"}
        >
          <Stack direction={"col"}>
            <Heading level={3} className={"text-left font-medium"} size={"md"}>
              Bienvenue
            </Heading>
            <Text className={"text-left"}>Votre liste de tâches</Text>
          </Stack>

          <Stack direction={"row"} gapx={8} align={"center"}>
            <ButtonIcon
              icon={<SearchIcon />}
              size={"md"}
              variant={"ghost"}
              onClick={() => setShowSearch((prev) => !prev)}
            />
            <ButtonIcon
              icon={<TrashIcon />}
              size={"md"}
              variant={"ghost"}
              onClick={() => handleDeleteAll()}
            />
          </Stack>
        </Stack>

        {showSearch && <Search onChange={onSearch} />}

        <ScrollView className={"w-full"} ref={scrollViewRef}>
          <Stack direction={"col"} gapy={14} className={"w-full"}>
            {t &&
              t.length !== 0 &&
              t.map((task, index) => {
                if (
                  task.description
                    .toLowerCase()
                    .indexOf(filterText.toLowerCase()) === -1
                ) {
                  return;
                }
                return <Card task={task} key={index} />;
              })}
          </Stack>

          {t && t.length === 0 && (
            <Stack direction="col" align="center" justify="center" gapy={8}>
              <IconBox />
              <p className="text-sm text-gray-500">
                Oops vous n'avez pas de tâches.
              </p>
            </Stack>
          )}
        </ScrollView>

        <div className={"w-full flex items-center justify-center py-4"}>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                className={
                  "rounded-full h-16 w-16 bg-blue-600 text-white flex items-center justify-center"
                }
              >
                <PlusIcon size={20} />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <DialogOverlay
                className={
                  "w-full h-full absolute left-0 top-0 bottom-0 right-0 backdrop-blur-sm transparent-overlay"
                }
              />

              <Dialog.Content
                className={
                  "bg-white fixed rounded-xl top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[28rem]"
                }
              >
                <Stack
                  direction={"row"}
                  align={"center"}
                  justify={"space-between"}
                  className={"p-4 text-gray-700"}
                >
                  <Dialog.Title className={"text-sm text-gray-700"}>
                    Ajouter une tâche
                  </Dialog.Title>
                  <Dialog.Close>
                    <XIcon size={18} />
                  </Dialog.Close>
                </Stack>

                <div
                  className={
                    "p-6 border-solid border-b-[1px] border-t-[1px] border-gray-200"
                  }
                >
                  <input
                    type={"text"}
                    className={
                      "w-full px-4 py-4 rounded-xl bg-gray-100 text-sm"
                    }
                    placeholder={"Go to grocery..."}
                    onChange={(e) => setDesc(e.currentTarget.value)}
                  />
                </div>

                <Stack direction={"row"} className={"flex items-center"}>
                  <Dialog.Close asChild>
                    <button
                      type={"button"}
                      onClick={() => {}}
                      className={
                        "p-4 text-sm flex items-center justify-center w-full h-14 border-solid border-r-[.25px] border-gray-200"
                      }
                    >
                      Annuler
                    </button>
                  </Dialog.Close>

                  <Dialog.Close asChild>
                    <button
                      type={"button"}
                      className={
                        "h-full w-full p-4 text-sm flex items-center text-blue-600 justify-center w-full h-12 border-solid border-l-[.25px] border-gray-200"
                      }
                      onClick={() =>
                        add({
                          id: Date.now(),
                          description: desc,
                          createAt: Date.now(),
                          completed: false,
                        })
                      }
                    >
                      Ajouter
                    </button>
                  </Dialog.Close>
                </Stack>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </main>
  );
}

function IconBox({ size }: { size?: number }) {
  const stroke = "#A2A2A2";
  const color = "";
  return (
    <svg
      width={size || 148}
      height={size || 148}
      viewBox="0 0 257 257"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M208.076 215.242v-51.054" stroke="#BABABA" strokeWidth={1.5} />
      <path d="M208.076 98.545l-80-29.174v58.348l80-29.174z" fill="#E0F1FF" />
      <path
        d="M128.076 244.414V127.719m0 116.695l-80-29.174v-51.054m80 80.228l80-29.174m-80-87.521l-80-29.174m80 29.174l-20 58.347c-31.303-11.404-48.697-17.769-80-29.174l20-58.347m80 29.174l20 58.347 80-29.174-20-58.347m-80 29.174l80-29.174m-80 29.174V69.371m-80 29.174l80-29.174m80 29.174l-80-29.174M161.026 30.699c-.236.938-1.014 1.723-2.384 1.982-1.336.253-3.065-.045-4.853-1.003-1.789-.958-3.239-2.363-4.146-3.817-.93-1.49-1.174-2.823-.938-3.762.237-.938 1.014-1.723 2.384-1.982 1.336-.253 3.066.045 4.854 1.003 1.788.958 3.239 2.363 4.145 3.817.929 1.491 1.174 2.824.938 3.762zM156.841 17.69c.018 1.355-.219 2.547-.583 3.378-.367.838-.816 1.22-1.232 1.23-.416.013-.875-.344-1.263-1.16-.386-.81-.653-1.99-.672-3.344-.017-1.356.22-2.549.584-3.38.367-.837.815-1.219 1.232-1.23.416-.012.874.345 1.263 1.161.386.81.653 1.989.671 3.344zM160.784 21.033c-.475 1.165-1.108 1.997-1.717 2.422-.615.43-1.134.408-1.492.098-.358-.31-.618-.966-.653-1.959-.035-.984.164-2.192.639-3.357s1.108-1.996 1.718-2.422c.614-.429 1.133-.408 1.491-.098.358.31.618.966.653 1.959.035.985-.164 2.192-.639 3.357z"
        stroke={stroke}
        strokeWidth={1.5}
      />
      <path
        d="M121.98 122.249c-13.904-34.188 18.935-53.241 35.471-57.436 17.801-4.777 25.625-28.718 5.313-34.188"
        stroke={stroke}
        strokeWidth={1.5}
        strokeDasharray="8.07 8.07"
      />
    </svg>
  );
}
