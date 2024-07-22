import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";


const meta = {
  title: "Stack",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Row = () => {
  return (
    <Stack
      direction={"row"}
      align={"center"}
      justify={"space-between"}
      className={"w-96 border-solid border-[1px] p-4 rounded-2xl"}>
      <p>Historique de contact</p>
      <ChevronRightIcon size={20} />
    </Stack>
  );
};

export const Column = () => {
  return (
    <Stack
      direction={"col"}
      align={"center"}
      justify={"space-between"}
      gapy={16}
      className={"w-96 border-solid border-[1px] p-4 rounded-2xl"}>
      <p>Historique de contact</p>
      <button>Clicked me</button>
    </Stack>
  );
};
