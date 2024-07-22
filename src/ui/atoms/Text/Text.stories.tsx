import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta = {
  title: "Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Text content",
  },
};

export const XS: Story = {
  args: {
    children: "Text content",
    size: 'xs'
  },
};

export const Big: Story = {
  args: {
    children: "Text content",
    size: '2xl'
  },
};
