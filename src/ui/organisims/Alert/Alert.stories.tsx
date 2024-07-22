import type { Meta, StoryObj } from "@storybook/react";
import * as Alert from "./Alert";

const meta = {
  title: "Alert",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = () => {
  return (
    <>
      <Alert.Root />
      <button
        type={"button"}
        onClick={() => {
          Alert.open({
            title: "Tous supprimer ?",
            content: "Vous allez supprimer toutes les tâches. Cette action est irréversible",
            action: () => {
              console.log("Action button cliked");
              //dismiss(id);
            },
          });
        }}
      >Open Alert</button>
    </>
  );
};
