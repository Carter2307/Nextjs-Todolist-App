import type { Meta, StoryObj } from "@storybook/react";
import { ButtonIcon } from "./ButtonIcon";

const meta = {
  title: "ButtonIcon",
  component: ButtonIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    size: "lg",
    variant: "ghost",
  },
};

export const Rounded: Story = {
  args: {
    size: "lg",
    variant: "primary",
    rounded: true,
  },
};
