import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta = {
  title: "Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const h1: Story = {
  args: {
    size: "lg",
    level: 1,
    children: "Heading 1",
  },
};
export const h2: Story = {
  args: {
    size: "2xl",
    level: 2,
    children: "Heading 2",
  },
};
export const h3: Story = {
  args: {
    size: "xl",
    level: 3,
    children: "Heading 3",
  },
};
export const h4: Story = {
  args: {
    size: "md",
    level: 4,
    children: "Heading 4",
  },
};
export const h5: Story = {
  args: {
    size: "sm",
    level: 5,
    children: "Heading 5",
  },
};
