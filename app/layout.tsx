import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Om Anand Khaunte — Design Portfolio",
  description:
    "Om's Design Portfolio — Robotics 1 projects and certifications at Los Altos High School (Class of 2029).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=SN+Pro:wght@300;400;700;900&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
