import type { Meta, StoryObj } from "@storybook/react";
import { ScrollView } from "./View";

const meta = {
  title: "View",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};