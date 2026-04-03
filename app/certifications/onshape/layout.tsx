import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onshape — Om Anand Khaunte',
  description:
    'Onshape CAD Basics certification — assemblies, drawings, sketching, parametric modeling, and hands-on exercises.',
};

export default function OnshapeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
