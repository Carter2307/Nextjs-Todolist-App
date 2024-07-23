"use client"

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import * as Modal from "@ui/organisims/Modal/Modal";
import {Toast} from "@ui/atoms/Toast/Toast";
import {AppProvider} from "@/context/context";
import classNames from "classnames";
import * as Alert from "@ui/organisims/Alert/Alert"

/*export const metadata = {
  title: "Todolist App",
  description: "Powered by Next js And Typescript",
};*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames("fixed h-dvh w-dvw top-0 left-0 bottom-0 right-0 overflow-hidden",  GeistSans.className)}>
      <AppProvider>
        {children}
        <Modal.Root/>
        <Alert.Root/>
        <Toast/>
      </AppProvider>
      </body>
    </html>
  );
}
