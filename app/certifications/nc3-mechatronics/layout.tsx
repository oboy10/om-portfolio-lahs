import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC3 — Mechatronics — Om Anand Khaunte',
  description:
    'NC3 Mechatronics certification — FluidSIM, electro-pneumatic systems, automation, and hands-on station projects.',
};

export default function Nc3Layout({ children }: { children: React.ReactNode }) {
  return children;
}
