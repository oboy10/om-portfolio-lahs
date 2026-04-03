import type { Metadata } from 'next';

export function generateStaticParams() {
  return [{ slug: 'minibot-prototype' }, { slug: 'obstacle-course-challenge' }];
}

const COMING_SOON: Record<string, { title: string }> = {
  'minibot-prototype': { title: 'Minibot Prototype' },
  'obstacle-course-challenge': { title: 'Obstacle Course Challenge' },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = COMING_SOON[slug];
  if (!p) return { title: 'Project' };
  return {
    title: `${p.title} — Coming Soon — Om Anand Khaunte`,
    description: `${p.title} project page is on the way.`,
  };
}

export default function ComingSoonSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
