import type { Meta, StoryObj } from "@storybook/react";
import { ModalTrigger } from "./ModalTrigger";

const meta = {
  title: "ModalTrigger",
  component: ModalTrigger,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ModalTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};