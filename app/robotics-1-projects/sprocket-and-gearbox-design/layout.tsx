import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sprocket and Gearbox Design — Om Anand Khaunte",
  description:
    "Robotics 1 project: REV motors, gearbox, hex shafts, Onshape CAD, technical drawings, and shop work at Los Altos High School.",
};

export default function SprocketLayout({ children }: { children: React.ReactNode }) {
  return children;
}
