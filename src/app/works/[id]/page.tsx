import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Work from '@/views/Work';
import data from '@/data';
import { localize } from '@/i18n/translate';
import { withDescription } from '@/lib/metadata';

type Props = { params: Promise<{ id: string }> };

// Every work page is pre-rendered; unknown ids 404 (which renders Home, like the old catch-all route).
export const dynamicParams = false;

export function generateStaticParams() {
  return data.works.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const work = data.works.find((w) => w.id === id);
  if (!work) return {};
  const w = localize(work, 'en');
  return withDescription(w.t, w.d);
}

export default async function WorkPage({ params }: Props) {
  const { id } = await params;
  if (!data.works.some((w) => w.id === id)) notFound();
  return <Work id={id} />;
}
