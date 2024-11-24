"use client";
// import { LayoutProps } from "@/.next/types/app/layout";
import React, { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <div>{children}</div>;
}
