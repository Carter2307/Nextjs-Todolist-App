import type { Meta, StoryObj } from "@storybook/react";
import { Overlay } from "./Overlay";

const meta = {
  title: "Overlay",
  component: Overlay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Overlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
