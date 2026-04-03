import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSHA 10 — Om Anand Khaunte',
  description:
    'OSHA 10-hour General Industry certification — shop safety, hazards, and workplace safety protocols.',
};

export default function Osha10Layout({ children }: { children: React.ReactNode }) {
  return children;
}
