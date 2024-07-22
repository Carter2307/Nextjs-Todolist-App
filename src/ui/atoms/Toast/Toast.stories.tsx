import type {Meta, StoryObj} from "@storybook/react";
import {Toast, open} from "./Toast";

const meta = {
  title: "Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info = () => {
  return (
    <>
      <button
        onClick={() => {
          open({
            title: "Info",
            style: "info",
            duration: 50000,
            description: "Description of what happen",
            position: "top-right",
          });
        }}
      >Open Toast</button>
      <Toast/>
    </>
  );
};

export const Success = () => {
  return (
    <>
      <button
        onClick={() => {
          open({
            title: "Info",
            style: "success",
            duration: 50000,
            description: "Description of what happen",
            position: "top-right",
          });
        }}
      >Open Toast</button>
      <Toast/>
    </>
  );
};

export const Warning = () => {
  return (
    <>
      <button
        onClick={() => {
          open({
            title: "Info",
            style: "warning",
            duration: 50000,
            description: "Description of what happen",
            position: "top-right",
          });
        }}
      >Open Toast
      </button>
      <Toast/>
    </>
  );
};

export const Error = () => {
  return (
    <>
      <button
        onClick={() => {
          open({
            title: "Info",
            style: "error",
            duration: 50000,
            description: "Description of what happen",
            position: "top-right",
          });
        }}
      >Open Toast</button>
      <Toast/>
    </>
  );
};
