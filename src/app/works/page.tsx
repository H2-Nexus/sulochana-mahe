import Works from '@/views/Works';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('works', 'works.intro');

export default function WorksPage() {
  return <Works />;
}
