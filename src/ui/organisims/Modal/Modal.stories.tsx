import type { Meta, StoryObj } from "@storybook/react";
import * as Modal from "./Modal";
import type { ModalProps } from "./Modal";

const meta = {
  title: "Modal",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<ModalProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = () => {
  return (
    <>
      <Modal.Root />
      <button
        onClick={() => {
          Modal.openModal({
            title: "Modal title",
            content: <p>Modal content</p>,
            okAction: {
              label: "Confirm action",
              handler: () => window.alert("Clicked on Confirmation action button"),
            },
            /*cancelAction: {
              label: "Annuler",
              handler: (close) => {
                window.alert("Clicked on Cancel action button. The modal will dismiss after this alert");
                close();
              },
            },*/
          });
        }}
      >Open Modal</button>
    </>
  );
};
