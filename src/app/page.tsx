"use client"

import {Stack} from "@ui/layouts/Stack/Stack";
import {ButtonIcon} from "@ui/atoms/ButtonIcon/ButtonIcon";
import {PlusIcon, SearchIcon, TrashIcon, XIcon} from "lucide-react";
import {Heading} from "@ui/atoms/Heading/Heading";
import {Text} from "@ui/atoms/Text/Text";
import {Search} from "@ui/atoms/Inputs/Search/Search";
import {ScrollView} from "@ui/layouts/View/View";
import {Card} from "@ui/molecules/Card/Card";
import React from "react";
import {AppContext} from "@/context/context";
import * as Dialog from "@radix-ui/react-dialog"
import {DialogOverlay} from "@radix-ui/react-dialog";
import * as Alert from "@ui/organisims/Alert/Alert"
import * as Toast from "@ui/atoms/Toast/Toast"

export default function Home() {
  const [showSearch, setShowSearch] = React.useState(true);
  const {deleteAll, add, tasks} = React.useContext(AppContext);
  const [t, setT] = React.useState(tasks);
  const [desc, setDesc] = React.useState("");
  const [filterText, setFilterText]= React.useState("")
  const scrollViewRef = React.useRef<HTMLElement>()

  React.useEffect(() => {
    setT(tasks)
  }, [tasks])

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.currentTarget.value);
  }

  const handleDeleteAll = () => {
    Alert.open({
      title: "Tous supprimer ?",
      content: "Vous allez supprimer toutes les tâches. Cette action est irréversible.",
      action: (dismiss,id,) => {
        deleteAll()
        dismiss(id)
        Toast.open({
          position: "top-right",
          description: "Toutes les tâches ont été supprimées",
          style: "success",
          title: "Success"
        })
      }
    })
  }

  return (
    <main className={"w-full h-full"}>
      <div className={"flex flex-col h-full px-6 pt-6 mx-auto space-y-6 md:w-[42.5rem]"}>

        <Stack direction={"row"} className={"pb-4 border-solid border-b-[1px] border-gray-200"} align={"center"}
               justify={"space-between"}>
          <Stack direction={"col"}>
            <Heading level={3} className={"text-left font-medium"} size={"md"}>Bienvenu</Heading>
            <Text className={"text-left"}>Votre liste de tâches</Text>
          </Stack>

          <Stack direction={"row"} gapx={8} align={"center"}>
            <ButtonIcon icon={<SearchIcon/>} size={"md"} variant={"ghost"}
                        onClick={() => setShowSearch(prev => !prev)}/>
            <ButtonIcon icon={<TrashIcon/>} size={"md"} variant={"ghost"} onClick={() => handleDeleteAll()}/>
          </Stack>

        </Stack>

        {showSearch && <Search onChange={onSearch}/>}


        <ScrollView className={"w-full"} ref={scrollViewRef}>
          <Stack direction={"col"} gapy={14} className={"w-full"}>
            {t && t.length !== 0 && t.map((task, index) => {
              if(task.description.toLowerCase().indexOf(filterText.toLowerCase()) === - 1) {
                return;
              }
              return <Card task={task} key={index}/>
            })}
          </Stack>
        </ScrollView>

        <div className={"w-full flex items-center justify-center py-4"}>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className={"rounded-full h-16 w-16 bg-blue-600 text-white flex items-center justify-center"}>
                <PlusIcon size={20}/>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <DialogOverlay
                className={"w-full h-full absolute left-0 top-0 bottom-0 right-0 backdrop-blur-sm transparent-overlay"}/>

              <Dialog.Content
                className={"bg-white fixed rounded-xl top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[28rem]"}>

                <Stack direction={"row"} align={"center"} justify={"space-between"} className={"p-4 text-gray-700"}>
                  <Dialog.Title className={"text-sm text-gray-700"}>Ajouter une tâche</Dialog.Title>
                  <Dialog.Close>
                    <XIcon size={18}/>
                  </Dialog.Close>
                </Stack>

                <div className={"p-6 border-solid border-b-[1px] border-t-[1px] border-gray-200"}>
                  <input
                    type={"text"}
                    className={"w-full px-4 py-4 rounded-xl bg-gray-100 text-sm"}
                    placeholder={"Go to grocery..."}
                    onChange={(e) => setDesc(e.currentTarget.value)}
                  />
                </div>


                <Stack direction={"row"} className={"flex items-center"}>
                  <Dialog.Close asChild>
                    <button
                      type={"button"}
                      onClick={() => {
                      }}
                      className={"p-4 text-sm flex items-center justify-center w-full h-14 border-solid border-r-[.25px] border-gray-200"}
                    >Annuler
                    </button>
                  </Dialog.Close>

                  <Dialog.Close asChild>
                    <button
                      type={"button"}
                      className={"h-full w-full p-4 text-sm flex items-center text-blue-600 justify-center w-full h-12 border-solid border-l-[.25px] border-gray-200"}
                      onClick={() => add({
                        id: Date.now(),
                        description: desc,
                        createAt: Date.now(),
                        completed: false
                      })}
                    >Ajouter
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
