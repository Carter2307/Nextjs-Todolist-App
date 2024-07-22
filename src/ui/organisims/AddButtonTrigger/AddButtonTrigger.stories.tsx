import type { Meta, StoryObj } from "@storybook/react";
import { AddButtonTrigger } from "./AddButtonTrigger";
import * as Modal from "@ui/organisims/Modal/Modal";

const meta = {
  title: "AddButtonTrigger",
  component: AddButtonTrigger,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AddButtonTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = () => {
  return <>
    <Modal.Root/>
    <AddButtonTrigger/>
  </>
};